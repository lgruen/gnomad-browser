const { fetchGenesByRegion } = require('../../queries/gene-queries')
const { fetchNonCodingConstraintsByRegion } = require('../../queries/non-coding-constraint-queries')

const resolveGenesInRegion = (obj, args, ctx) => {
  return fetchGenesByRegion(ctx.esClient, obj)
}

const resolveNCCsInRegion = (obj, args, ctx) => {
  return fetchNonCodingConstraintsByRegion(ctx.esClientLocal, obj)
}

module.exports = {
  Region: {
    genes: resolveGenesInRegion,
    non_coding_constraints: resolveNCCsInRegion,
  },
}
