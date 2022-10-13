import hail as hl

# TODO:(rgrant) this is now outdated - delete this fail and do a squash to remove this from history before pull requesting


def prepare_gnomad_v3_non_coding_constraint(path_gene, path_tissue):
    ds_gene = hl.import_table(path_gene, force=True)

    ds_gene = ds_gene.select_globals()

    ds_gene = ds_gene.select(
        symbol=hl.str(ds_gene.gene),
        ncc_enhancer=hl.str(ds_gene.enhancer),
        ncc_enhancer_constraint_z=hl.float(ds_gene.enhancer_constraint_Z),
    )

    ds_gene = ds_gene.key_by("symbol")

    ds_tissue = hl.import_table(path_tissue, force=True)
    ds_tissue = ds_tissue.select_globals()
    ds_tissue = ds_gene.select(symbol=hl.str())

    return ds_gene


# TODO:(rgrant) REMOVE ME LATER start
# path = "/Users/rgrant/Downloads/constraint_z_genome_1kb_filtered.ft17-4-9.copy.2.txt"
# path = "/Users/rgrant/Downloads/enh_gene_roadmaplinks.short.txt"
# my_ds = prepare_gnomad_v3_non_coding_constraint(path)
# print(my_ds.summarize())
# print(my_ds.row)
# print(my_ds.row_value)
# TODO:(rgrant) REMOVE ME LATER end
