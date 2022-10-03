import { Factory } from 'fishery' // eslint-disable-line import/no-extraneous-dependencies

export const exomeReadApiOutputFactory = Factory.define(({ sequence }) => ({
  category: 'hom',
  bamPath: `dummy_bampath_${sequence}`,
  indexPath: `dummy_indexpath_${sequence}`,
  readGroup: `dummy_readgroup_${sequence}`,
}))

export const readsApiOutputFactory = Factory.define(({ params, sequence }) => {
  const { variantId } = params as any
  return {
    variant_0: {
      variantId: variantId || `123-${45 + sequence}-A-C`,
      exome: [],
      genome: [],
    },
  }
})
