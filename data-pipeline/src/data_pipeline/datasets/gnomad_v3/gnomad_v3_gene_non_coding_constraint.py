import hail as hl


# TODO:(rgrant) this is going to be the job given to a pipeline
#   this will stay, it takes the two files, and does relevant joins

# TODO:(rgrant) modify this to include the gene level in the same table? confusing but
#   useful, per a gene id, you have an array of all possible values


def prepare_gnomad_v3_non_coding_constraint(path_gene, path_tissue):
    """
    Stitches together info from 2 differnet files, one that contains only the field
    'merged' that is used for the base gene level info, and one that contains each
    different tissue, using the two files allows for ease of grouping-by and collecting
    all the tissue stats into on struct on ENSG, while keeping stats at gene level
    """

    # import the table with only the 'merged' (gene level) values
    ds_gene = hl.import_table(path_gene, force=True)

    ds_gene = ds_gene.select_globals()

    ds_gene = ds_gene.select(
        gene_id=hl.str(ds_gene.ENSG),
        symbol=hl.str(ds_gene.gene),
        tissue=hl.str(ds_gene.tissue),
        enhancer=hl.str(ds_gene.enhancer),
        enhancer_constraint_z=hl.float(ds_gene.enhancer_constraint_Z),
        element_id=hl.str(ds_gene.element_id),
        chrom=hl.str(ds_gene.chrom),
        start=hl.int(ds_gene.start),
        stop=hl.int(ds_gene.end),
        possible=hl.float(ds_gene.possible),
        expected=hl.float(ds_gene.expected),
        observed=hl.float(ds_gene.observed),
        oe=hl.float(ds_gene.oe),
    )

    ds_gene = ds_gene.key_by("gene_id")

    # TODO: == DEBUG
    print("step 1: raw gene table")
    print(ds_gene.show(10))
    # print(ds_gene.summarize())

    # Get the tissue table
    # ==============
    ds_tissue = hl.import_table(path_tissue, force=True)

    ds_tissue = ds_tissue.select_globals()
    # ds_tissue = ds_tissue.select(

    # )
    # ds_tissue = ds_tissue.key_by("ENSG")

    # ds_tissue_join = ds_tissue.select(
    #     symbol=hl.str(ds_tissue.gene),
    #     ENSG=hl.str(ds_tissue.ENSG),
    # )

    # ds_tissue_join = ds_tissue_join.key_by("symbol")
    # ds_tissue_join = ds_tissue_join.distinct()

    # TODO: == DEBUG
    # print("step 2: tissue join table")
    # print(ds_tissue_join.show(10))
    # print(ds_tissue_join.summarize())

    # join the gene and tissue table
    # TODO: == DEBUG
    # print("step 3: join previous two tables")
    # print(ds_tissue_join.show(10))

    # ds_gene_joined = ds_gene.annotate(ENSG=ds_tissue_join[ds_gene.symbol].ENSG)

    # TODO: == DEBUG
    # print(ds_gene_joined.show(10))
    # print(ds_gene_joined.summarize())

    # print("step 4: add array of tissues to each individual gene")
    print("step 2: add array of tissues to each individual gene")

    # ds_final_joined = ds_gene_joined.annotate(tissues=
    # 	(ds_tissue.group_by(ds_tissue.ENSG)
    # 		.aggregate(tissues = hl.agg.collect(ds_tissue.tissue)))
    # )

    # t = (ds_tissue.group_by(ds_tissue.gene)
    # 			.aggregate(tissues= hl.agg.collect(hl.struct(tissue = ds_tissue.tissue, enhancer = ds_tissue.enhancer_constraint_Z))))
    # print(t.describe())
    # print(t.show(10))

    # TODO: final stuff

    ds_joined = ds_gene.annotate(
        tissues=(
            ds_tissue.group_by(ds_tissue.ENSG).aggregate(
                tissues=hl.agg.collect(
                    hl.struct(
                        tissue=hl.str(ds_tissue.tissue),
                        enhancer=hl.str(ds_tissue.enhancer),
                        enhancer_constraint_z=hl.float(ds_tissue.enhancer_constraint_Z),
                        element_id=hl.str(ds_tissue.element_id),
                        start=hl.int(ds_tissue.start),
                        stop=hl.int(ds_tissue.end),
                        possible=hl.float(ds_tissue.possible),
                        observed=hl.float(ds_tissue.observed),
                        expected=hl.float(ds_tissue.expected),
                        oe=hl.float(ds_tissue.oe),
                    )
                )
            )
        )[ds_gene.gene_id].tissues
    )

    # ds_final_joined = ds_gene_joined.annotate(tissues = t[ds_gene_joined.symbol].tissues )

    print(ds_joined.describe())
    print(ds_joined.show(10))

    return ds_joined

    # ds_tissue = hl.import_table(path_tissue, force=True)
    # ds_tissue = ds_tissue.select_globals()
    # ds_tissue = ds_gene.select(
    # 	symbol=hl.str()
    # )

    # return ds_gene


# def prepare_tissue_join_table(path_tissue):
#     """
#     get only relevant data - here, that's basically the ENSG
#     """

#     ds_tissue_join = hl.import_table(path_tissue, force=True)

#     ds_tissue_join = ds_tissue_join.select_globals()

#     ds_tissue_join = ds_tissue_join.select(
#         symbol=hl.str(ds_tissue_join.gene),
#         ENSG=hl.str(ds_tissue_join.ENSG),
#     )

#     ds_tissue_join = ds_tissue_join.key_by("symbol")

#     return ds_tissue_join


# def prepare_tissue_table(path_tissue):
#     ds_tissue = hl.import_table(path_tissue, force=True)
#     ds_tissue = ds_tissue.select_globals()

#     # it doesn't matter how inefficient this thing is, really
#     # there are a few things I want to do

#     # 1: join on the gene id field, and add in the ENSG id
#     #   then I can key by this
#     #   as I do this: keep the GENE level

#     return ds_tissue


# gene_path = "/Users/rgrant/Documents/non-coding-constraint-data/enh_gene_roadmaplinks.short.txt"
# tissue_path = "/Users/rgrant/Documents/non-coding-constraint-data/enh_gene_roadmaplinks.short.by_tissue.annot.txt"
# my_tissue_ds = prepare_tissue_join_table(tissue_path)
# print(my_tissue_ds.summarize())
# print(my_tissue_ds.row)
# print(my_tissue_ds.row_value)
# print(my_tissue_ds.describe())
# print(my_tissue_ds.show(10))
# my_tissue_ds_2 = my_tissue_ds.distinct()
# print(my_tissue_ds_2.summarize())
# print(my_tissue_ds_2.show(10))
# print(my_ds.head(20))


# prepare_gnomad_v3_non_coding_constraint(gene_path, tissue_path)
