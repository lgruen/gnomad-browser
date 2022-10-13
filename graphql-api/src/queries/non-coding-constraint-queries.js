const logger = require('../logger')

const fetchNonCodingConstraintRegionbyId = async (esClient, nccId) => {
  logger.info(nccId)
  logger.info('testing!')
  try {
    const response = await esClient.get({
      index: 'ncc_region_level_v1',
      type: '_doc',
      id: nccId,
    })

    logger.info(response)
    return response.body._source
  } catch (err) {
    return null
  }
}

const fetchNonCodingConstraintsByRegion = async (esClient, region) => {
  const { reference_genome: referenceGenome, chrom, start, stop } = region

  // This data is only relevant on closer levels of zoom, at 100,000 there will be 100 segments
  // if (stop - start > 100000) return null
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
      index: 'ncc_region_level_v1',
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
  fetchNonCodingConstraintRegionbyId,
  fetchNonCodingConstraintsByRegion,
}
