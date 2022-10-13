import hail as hl


def prepare_gnomad_v3_region_non_coding_constraint(path):
    """
    Yeh
    """

    ds = hl.import_table(path, force=True)

    ds = ds.select_globals()

    # ds = ds.select(
    # 	chrom=hl.str(ds.chrom),
    # 	start=hl.int(ds.start),
    # 	stop=hl.int(ds.end),
    # 	element_id=hl.str(ds.element_id),
    # 	possible=hl.float(ds.possible),
    #   observed=hl.float(ds.observed),
    #   expected=hl.float(ds.expected),
    #   oe=hl.float(ds.oe),
    # 	z=hl.float(ds.z),
    # 	coding_prop=hl.float(ds.coding_prop),
    # )

    # ds = ds.annotate(
    # 	region_id=(
    # 		hl.struct(
    # 			chrom=hl.str(ds.chrom),
    # 			start=hl.int(ds.start),
    # 			stop=hl.int(ds.end),
    # 		)
    # 	)
    # )

    ds = ds.select(
        # region_id=ds.region_id,
        chrom=hl.str(ds.chrom),
        start=hl.int(ds.start),
        stop=hl.int(ds.end),
        element_id=hl.str(ds.element_id),
        possible=hl.float(ds.possible),
        observed=hl.float(ds.observed),
        expected=hl.float(ds.expected),
        oe=hl.float(ds.oe),
        z=hl.float(ds.z),
        coding_prop=hl.float(ds.coding_prop),
    )

    # ds = ds.key_by("element_id")
    # ds = ds.key_by("chrom", "start")
    # ds = ds.key_by("region_id")
    ds = ds.key_by("element_id")
    # ds = ds.key_by("chrom", "start", "stop")

    print("Displaying region table")
    print(ds.describe())
    print(ds.show(10))

    return ds


# path = "/Users/rgrant/Downloads/oct14_ncc-files/constraint_z_genome_1kb_filtered.browser.txt"
# prepare_gnomad_v3_region_non_coding_constraint(path)
