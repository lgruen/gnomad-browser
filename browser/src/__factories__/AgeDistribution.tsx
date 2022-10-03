import { Factory } from 'fishery'
import { AgeDistribution } from '../types'
import histogramFactory from './Histogram'

const ageDistributionFactory = Factory.define<AgeDistribution>(({ associations }) => {
  const { het = histogramFactory.build(), hom = histogramFactory.build() } = associations
  return { het, hom }
})

export default ageDistributionFactory
