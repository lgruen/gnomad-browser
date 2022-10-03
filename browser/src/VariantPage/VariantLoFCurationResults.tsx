import React from 'react'

import { Variant, LofCuration } from '../types'

import { ExternalLink } from '@gnomad/ui'

import Link from '../Link'

const PROJECT_PUBLICATIONS = {
  all_homozygous: {
    pubmed_id: '32461654',
  },
  haploinsufficient_genes: {
    pubmed_id: '32461655',
  },
}

type LoFCurationResultProps = {
  result: LofCuration
}

const LoFCurationResult = ({ result }: LoFCurationResultProps) => {
  const { verdict, flags = [], project } = result
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const publication = PROJECT_PUBLICATIONS[project]
  return (
    <>
      <Link to={`/gene/${result.gene_id}`}>{result.gene_symbol || result.gene_id}</Link>
      <div>Curated as {verdict}</div>
      {flags.length > 0 && <div>Contributing factors: {flags.join(', ')}</div>}
      {publication && (
        <div>
          For more information about this curation, see{' '}
          {/* @ts-expect-error TS(2769) FIXME: No overload matches this call. */}
          <ExternalLink href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pubmed_id}/`}>
            PMID {publication.pubmed_id}
          </ExternalLink>
        </div>
      )}
    </>
  )
}

type VariantLoFCurationResultsProps = {
  variant: Variant
}

const VariantLoFCurationResults = ({ variant }: VariantLoFCurationResultsProps) => {
  const { lof_curations: lofCurations } = variant
  if (!lofCurations) {
    return null
  }

  const numGenes = new Set(lofCurations.map((c) => c.gene_id)).size

  return (
    <div>
      This variant was manually curated in {numGenes} gene{numGenes !== 1 ? 's' : ''}.
      <ul>
        {lofCurations.map((result) => (
          <li key={result.gene_id}>
            <LoFCurationResult result={result} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VariantLoFCurationResults
