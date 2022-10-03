import { Factory } from 'fishery'
import { ReferenceGenome, Variant, LofCuration, InSilicoPredictor } from '../types'
import sequencingTypeFactory from './SequencingType'

const variantFactory = Factory.define<Variant>(({ params, associations }) => {
  const {
    exome = null,
    genome = sequencingTypeFactory.build(),
    clinvar = null,
    coverage = {
      exome: null,
      genome: null,
    },
  } = associations

  const defaults = {
    variant_id: '13-234567-A-C',
    reference_genome: 'GRCh37' as ReferenceGenome,
    chrom: '13',
    pos: 234567,
    ref: 'A',
    alt: 'C',
    flags: null,
    lof_curations: null,
    in_silico_predictors: null,
    transcript_consequences: null,
    colocated_variants: null,
    caid: null,
    rsids: null,
    liftover: null,
    liftover_sources: null,
  }
  return { ...defaults, ...params, exome, genome, clinvar, coverage }
})

export const exacVariantFactory = variantFactory.associations({
  exome: sequencingTypeFactory.build(),
  genome: null,
})

export const lofCurationFactory = Factory.define<LofCuration>(({ params, sequence }) => {
  const defaults = {
    gene_id: `LOFCURATEDGENE-ID-${sequence}`,
    gene_version: '2.3.4.5',
    gene_symbol: `LOFCURATEDGENE-SYMBOL-${sequence}`,
    verdict: 'Uncertain',
    flags: [],
    project: `dummy-lof-project-${sequence}`,
  }
  return { ...defaults, ...params }
})

export const inSilicoPredictorFactory = Factory.define<InSilicoPredictor>(
  ({ params, sequence }) => {
    const defaults = {
      id: `isp-id-${sequence}`,
      value: `isp-value-${sequence}`,
      flags: [],
    }
    return { ...defaults, ...params }
  }
)

export default variantFactory
