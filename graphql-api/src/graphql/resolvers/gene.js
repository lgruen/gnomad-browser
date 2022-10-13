const { UserVisibleError } = require('../../errors')
const {
  fetchGeneById,
  fetchGeneBySymbol,
  fetchGenesMatchingText,
  fetchGeneNCCById,
} = require('../../queries/gene-queries')

const resolveGene = async (_, args, ctx) => {
  if (args.gene_id) {
    const gene = await fetchGeneById(ctx.esClient, args.gene_id, args.reference_genome)
    // TODO:(rgrant) REMOVE ME BEFORE PR - start
    const geneNCC = await fetchGeneNCCById(ctx.esClientLocal, args.gene_id, args.reference_genome)
    gene.non_coding_constraint = geneNCC
    // TODO:(rgrant) REMOVE ME BEFORE PR - end
    if (!gene) {
      throw new UserVisibleError('Gene not found')
    }
    return gene
  }

  if (args.gene_symbol) {
    const gene = await fetchGeneBySymbol(ctx.esClient, args.gene_symbol, args.reference_genome)
    // TODO:(rgrant) REMOVE ME BEFORE PR - start
    const geneNCC = await fetchGeneNCCById(ctx.esClientLocal, gene.gene_id, args.reference_genome)
    gene.non_coding_constraint = geneNCC
    // TODO:(rgrant) REMOVE ME BEFORE PR - end
    if (!gene) {
      throw new UserVisibleError('Gene not found')
    }
    return gene
  }

  throw new UserVisibleError("One of 'gene_id' or 'gene_symbol' is required")
}

const resolveGeneSearch = (_, args, ctx) => {
  return fetchGenesMatchingText(ctx.esClient, args.query, args.reference_genome)
}

module.exports = {
  Query: {
    gene: resolveGene,
    gene_search: resolveGeneSearch,
  },
}
