import React from 'react'
import { describe, expect, test } from '@jest/globals'

import renderer from 'react-test-renderer'
import { Variant, ClinvarVariant } from '../types'
import { DatasetId, v2DatasetIds, v3DatasetIds } from '@gnomad/dataset-metadata/metadata'
import { stubQueries, staticResponse } from '../../../tests/__helpers__/apiCall'
const router = stubQueries([])

import VariantPage from './VariantPage'
import { withDummyRouter } from '../../../tests/__helpers__/router'
import { readsApiOutputFactory } from '../__factories__/ReadData'
import variantFactory, {
  exacVariantFactory,
  lofCurationFactory,
  inSilicoPredictorFactory,
} from '../__factories__/Variant'

const datasetsStillToFix: DatasetId[] = [
  'gnomad_sv_r2_1',
  'gnomad_sv_r2_1_controls',
  'gnomad_sv_r2_1_non_neuro',
]

const extractClinvarData = (
  clinvar: ClinvarVariant | null
):
  | {
      clinvar_variant: Omit<ClinvarVariant, 'release_date'>
      release_date: string
    }
  | { clinvar_variant: null; release_date: null } => {
  if (clinvar === null) {
    return { clinvar_variant: null, release_date: null }
  }

  const { release_date, ...clinvar_variant } = clinvar
  return { release_date, clinvar_variant }
}

const stubVariantFetch = (variant: Variant) => {
  // The data returned by the variant Query is not used as-is, but rather is
  // massaged into a different shape first. Here we do that process backwards,
  // starting with the Variant and reverse-engineering the data as it would
  // have been returned from the API.
  const { clinvar, liftover, liftover_sources, ...mainVariantData } = variant
  const { clinvar_variant, release_date } = extractClinvarData(clinvar)
  const apiResponse = staticResponse({
    variant: mainVariantData,
    clinvar_variant,
    meta: { clinvar_release_date: release_date },
    liftover,
    liftover_sources,
  })
  router.reroute([
    [/GnomadVariant/, apiResponse],
    [/variantReads/, readsApiOutputFactory.params({ variantId: variant.variant_id })],
  ])
}

describe.each(['exac', ...v2DatasetIds, ...v3DatasetIds] as DatasetId[])(
  'VariantPage with %s dataset',
  (datasetId) => {
    const variantFactoryForDataset = datasetId === 'exac' ? exacVariantFactory : variantFactory

    test('has no unexpected changes', () => {
      const variant = variantFactoryForDataset.build()
      stubVariantFetch(variant)
      const tree = renderer.create(
        withDummyRouter(<VariantPage datasetId={datasetId} variantId={variant.variant_id} />)
      )
      expect(tree).toMatchSnapshot()
    })

    test('contains badges for flags of interest', () => {
      const variant = variantFactoryForDataset.build({ flags: ['par', 'lcr'] })
      stubVariantFetch(variant)
      const tree = renderer.create(
        withDummyRouter(<VariantPage datasetId={datasetId} variantId={variant.variant_id} />)
      )
      expect(tree).toMatchSnapshot()
    })

    test('displays LoF curations when available', () => {
      const variant = variantFactoryForDataset.build({
        lof_curations: lofCurationFactory.buildList(2),
      })
      stubVariantFetch(variant)
      const tree = renderer.create(
        withDummyRouter(<VariantPage datasetId={datasetId} variantId={variant.variant_id} />)
      )
      expect(tree).toMatchSnapshot()
    })

    test('displays in silico predictors when available', () => {
      const variant = variantFactoryForDataset.build({
        in_silico_predictors: inSilicoPredictorFactory.buildList(2),
      })
      stubVariantFetch(variant)
      const tree = renderer.create(
        withDummyRouter(<VariantPage datasetId={datasetId} variantId={variant.variant_id} />)
      )
      expect(tree).toMatchSnapshot()
    })

    test.todo('displays ClinVar data when available')
    test.todo('displays the age distribution of the exome or genome')
  }
)

describe.each(v3DatasetIds as DatasetId[])('VariantPage with %s dataset', () => {
  test.todo('displays local ancestry when available')
})

datasetsStillToFix.forEach((datasetId) => test.todo(`fix ${datasetId}`))
