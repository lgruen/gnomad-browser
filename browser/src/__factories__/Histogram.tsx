import { Factory } from 'fishery'
import { Histogram } from '../types'

const histogramFactory = Factory.define<Histogram>(({ params }) => {
  const {
    bin_edges = [10, 20, 30],
    bin_freq = [5, 6, 7],
    n_smaller = null,
    n_larger = null,
  } = params
  return { bin_edges, bin_freq, n_smaller, n_larger }
})

export default histogramFactory
