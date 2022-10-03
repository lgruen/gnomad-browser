import {
  DatasetId,
  ReferenceGenome,
  v2SiteQualityMetricName,
  v3SiteQualityMetricName,
  exacSiteQualityMetricName,
  SiteQualityMetricName,
} from '@gnomad/dataset-metadata/metadata'

export {
  DatasetId,
  ReferenceGenome,
  v2SiteQualityMetricName,
  v3SiteQualityMetricName,
  exacSiteQualityMetricName,
  SiteQualityMetricName,
}

export type GeneMetadata = {
  gene_id: string
  gene_version: string
  symbol: string
  mane_select_transcript?: {
    ensembl_id: string
    ensembl_version: string
    refseq_id: string
    refseq_version: string
  }
  canonical_transcript_id: string | null
  flags: string[] | null
}

export type ExacConstraint = {
  exp_syn: number
  obs_syn: number
  syn_z: number
  exp_mis: number
  obs_mis: number
  mis_z: number
  exp_lof: number
  obs_lof: number
  pLI: number
}

export type GnomadConstraint = {
  exp_lof: number
  exp_mis: number
  exp_syn: number
  obs_lof?: number
  obs_mis?: number
  obs_syn?: number
  oe_lof: number
  oe_lof_lower: number
  oe_lof_upper: number
  oe_mis: number
  oe_mis_lower: number
  oe_mis_upper: number
  oe_syn: number
  oe_syn_lower: number
  oe_syn_upper: number
  lof_z?: number
  mis_z: number
  syn_z: number
  pLI: number
  flags?: string[]
}

export type Gene = GeneMetadata & {
  reference_genome: ReferenceGenome
  name?: string
  chrom: string
  strand: Strand
  start: number
  stop: number
  exons: {
    feature_type: string
    start: number
    stop: number
  }[]
  transcripts: {
    transcript_id: string
    transcript_version: string
    exons: {
      feature_type: string
      start: number
      stop: number
    }[]
  }[]
  flags: string[]
  gnomad_constraint?: GnomadConstraint
  exac_constraint?: ExacConstraint
  pext?: {
    regions: {
      start: number
      stop: number
      mean: number
      tissues: {
        [key: string]: number
      }
    }[]
    flags: string[]
  }
  short_tandem_repeats?: {
    id: string
  }[]
  exac_regional_missense_constraint_regions?: any
}

export type Transcript = {
  transcript_id: string
  transcript_version: string
  reference_genome: ReferenceGenome
  chrom: string
  strand: Strand
  start: number
  stop: number
  exons: {
    feature_type: string
    start: number
    stop: number
  }[]
  gnomad_constraint?: GnomadConstraint
  exac_constraint?: ExacConstraint
  gene: GeneMetadata
}

export type Strand = '+' | '-'

export type ClinvarVariant = {
  clinical_significance: string
  clinvar_variation_id: string
  gold_stars: number
  last_evaluated?: string
  release_date: string
  review_status: string
  submissions: {
    clinical_significance: string
    conditions?: {
      medgen_id?: string
      name: string
    }[]
    last_evaluated?: string
    review_status: string
    submitter_name: string
  }[]
}

export type Histogram = {
  bin_edges: number[]
  bin_freq: number[]
  n_smaller: number | null
  n_larger: number | null
}

export type Population = {
  id: string
  ac: number
  an: number
  ac_hemi: number | null
  ac_hom: number
}

export type LocalAncestryPopulation = {
  id: string
  ac: number
  an: number
}

export type AgeDistribution = {
  het: Histogram
  hom: Histogram
}

export type SiteQualityMetric = {
  metric: SiteQualityMetricName
  value: number | null
}

export type VariantQualityMetrics = {
  allele_balance: {
    alt: Histogram
  }
  genotype_depth: {
    all: Histogram
    alt: Histogram
  }
  genotype_quality: {
    all: Histogram
    alt: Histogram
  }
  site_quality_metrics: SiteQualityMetric[]
}

export type Faf95 = {
  popmax: number
  popmax_population: string
}

export type SequencingType = {
  ac: number
  an: number
  ac_hemi: number | null
  ac_hom: number
  faf95: Faf95
  filters: string[]
  populations: Population[]
  local_ancestry_populations: LocalAncestryPopulation[]
  age_distribution: AgeDistribution | null
  quality_metrics: VariantQualityMetrics
}

export type LofCuration = {
  gene_id: string
  gene_version: string
  gene_symbol: string | null
  verdict: string
  flags: string[]
  project: string
}

export type InSilicoPredictor = {
  id: string
  value: string
  flags: string[]
}

export type TranscriptConsequence = {
  consequence_terms: string[]
  domains: string[]
  gene_id: string
  gene_version: string | null
  gene_symbol: string | null
  hgvs: string | null
  hgvsc: string | null
  hgvsp: string | null
  is_canonical: boolean | null
  is_mane_select: boolean | null
  is_mane_select_version: boolean | null
  lof: string | null
  lof_flags: string | null
  lof_filter: string | null
  major_consequence: string | null
  polyphen_prediction: string | null
  refseq_id: string | null
  refseq_version: string | null
  sift_prediction: string | null
  transcript_id: string
  transcript_version: string

  canonical: boolean | null
}

export type Variant = {
  variant_id: string
  reference_genome: ReferenceGenome
  colocated_variants: string[] | null
  chrom: string
  pos: number
  ref: string
  alt: string
  flags: string[] | null
  clinvar: ClinvarVariant | null
  exome: SequencingType | null
  genome: SequencingType | null
  lof_curations: LofCuration[] | null
  in_silico_predictors: InSilicoPredictor[] | null
  transcript_consequences: TranscriptConsequence[] | null
  liftover: any[] | null
  liftover_sources: any[] | null
  multi_nucleotide_variants?: any[]
  caid: string | null
  rsids: string[] | null
  coverage: {
    exome: { mean: number | null } | null
    genome: { mean: number | null } | null
  }
}
