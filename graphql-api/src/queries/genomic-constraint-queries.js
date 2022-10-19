const fetchGenomicConstraintRegionById = async (esClient, nccId) => {
  try {
    const response = await esClient.get({
      index: 'gnomad_v3_genomic_constraint_regions',
      type: '_doc',
      id: nccId,
    })
    return response.body._source
  } catch (err) {
    return null
  }
}

const fetchGenomicConstraintsByRegion = async (esClient, region) => {
  const { reference_genome: referenceGenome, chrom, start, stop } = region

  // This data is only relevant on closer levels of zoom, at 200,000 there will be 200 segments
  if (stop - start > 200000) return null

  let curr = Math.floor(start / 1000) * 1000
  const allIds = []
  while (curr < stop - 1000) {
    const currVariantNCCId = `chr${chrom}-${curr}-${curr + 1000}`
    allIds.push(currVariantNCCId)
    curr += 1000
  }

  try {
    const response = await esClient.mget({
      index: 'gnomad_v3_genomic_constraint_regions',
      body: {
        ids: allIds,
      },
    })
    const toReturn = response.body.docs.filter((doc) => doc.found).map((doc) => doc._source)
    return toReturn
  } catch (err) {
    return null
  }
}

module.exports = {
  fetchGenomicConstraintRegionById,
  fetchGenomicConstraintsByRegion,
}
