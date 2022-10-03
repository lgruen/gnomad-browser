import { Factory } from 'fishery'
import { SequencingType, Faf95 } from '../types'
import ageDistributionFactory from './AgeDistribution'
import variantQualityMetricsFactory from './VariantQualityMetrics'

const sequencingTypeFactory = Factory.define<SequencingType>(({ params, associations }) => {
  const {
    ac = 37,
    an = 42,
    ac_hemi = null,
    ac_hom = 0,
    filters = [],
    populations = [],
    local_ancestry_populations = [],
  } = params

  const defaultFaf95: Faf95 = { popmax: 23, popmax_population: 'South Asian' }
  const faf95: Faf95 = { ...defaultFaf95, ...(params.faf95 || {}) }

  const age_distribution = associations.age_distribution || ageDistributionFactory.build()
  const quality_metrics = associations.quality_metrics || variantQualityMetricsFactory.build()

  return {
    ac,
    an,
    ac_hemi,
    ac_hom,
    filters,
    populations,
    local_ancestry_populations,
    age_distribution,
    faf95,
    quality_metrics,
  }
})

export default sequencingTypeFactory
