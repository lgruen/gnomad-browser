import json

import hail as hl

from ..parameters.types import ReferenceGenome, RegionId
from ..sources import GRCH37_GENES, GRCH38_GENES, GENE_SEARCH_TERMS


GENE_SOURCES = {
    "GRCh37": GRCH37_GENES,
    "GRCh38": GRCH38_GENES,
}


def get_gene_by_id(gene_id: str, reference_genome: ReferenceGenome):
    ds = hl.read_table(GENE_SOURCES[reference_genome])
    ds = ds.filter(ds.gene_id == gene_id)
    gene = ds.collect()

    if not gene:
        return None

    return gene[0].annotate(reference_genome=reference_genome)


def get_genes_in_region(region_id: RegionId, reference_genome: ReferenceGenome):
    ds = hl.read_table(GENE_SOURCES[reference_genome])

    region_interval = hl.locus_interval(
        region_id.chrom if reference_genome == "GRCh37" else "chr" + region_id.chrom,
        region_id.start,
        region_id.stop,
        reference_genome=reference_genome,
        includes_end=True,
    )

    # TODO: Use interval field on genes
    ds = ds.filter(
        hl.locus_interval(
            ds.chrom if reference_genome == "GRCh37" else "chr" + ds.chrom,
            ds.start,
            ds.stop,
            reference_genome=reference_genome,
            includes_end=True,
        ).overlaps(region_interval)
    )

    ds = ds.select("symbol", "start", "stop", "exons")

    genes = ds.collect()

    return genes


def get_all_gene_search_terms():
    with open(GENE_SEARCH_TERMS, "r") as search_terms_file:
        return json.load(search_terms_file)
