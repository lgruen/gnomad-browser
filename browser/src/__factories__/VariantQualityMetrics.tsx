import { Factory } from 'fishery'
import { VariantQualityMetrics } from '../types'
import histogramFactory from './Histogram'

const variantQualityMetricsFactory = Factory.define<VariantQualityMetrics>(({ associations }) => {
  const site_quality_metrics = associations.site_quality_metrics || [
    { metric: 'SiteQuality', value: 0.78 },
  ]

  const allele_balance = associations.allele_balance || { alt: histogramFactory.build() }
  const genotype_depth = associations.genotype_depth || {
    alt: histogramFactory.build(),
    all: histogramFactory.build(),
  }
  const genotype_quality = associations.genotype_quality || {
    alt: histogramFactory.build(),
    all: histogramFactory.build(),
  }

  return { allele_balance, genotype_depth, genotype_quality, site_quality_metrics }
})

export default variantQualityMetricsFactory
