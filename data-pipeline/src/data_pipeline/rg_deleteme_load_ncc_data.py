# from datasets.gnomad_v3.gnomad_v3_non_coding_constraint import prepare_gnomad_v3_non_coding_constraint
from datasets.gnomad_v3.gnomad_v3_gene_non_coding_constraint import prepare_gnomad_v3_non_coding_constraint

from datasets.gnomad_v3.gnomad_v3_region_non_coding_constraint import prepare_gnomad_v3_region_non_coding_constraint

from helpers.elasticsearch_local_export import export_table_to_elasticsearch


# TODO:(rgrant) this was used to load my data into a local elasticsearch instance
#   this may or may not make it into prod


# path = "/Users/rgrant/Downloads/enh_gene_roadmaplinks.short.txt"
# my_ds = prepare_gnomad_v3_non_coding_constraint(path)
# gene_path = "/Users/rgrant/Documents/non-coding-constraint-data/enh_gene_roadmaplinks.short.txt"
# tissue_path = "/Users/rgrant/Documents/non-coding-constraint-data/enh_gene_roadmaplinks.short.by_tissue.annot.txt"

# TODO:(rgrant) uncomment me to run the genes task
# print(f"RUNNING GENES")
# print(f"starting loading of table:")
# print(f"importing table")
# gene_path = "/Users/rgrant/Downloads/oct14_ncc-files/enh_gene_roadmaplinks_merged_tissues.browser.txt"
# tissue_path = "/Users/rgrant/Downloads/oct14_ncc-files/enh_gene_roadmaplinks_by_tissue.browser.txt"
# my_ds = prepare_gnomad_v3_non_coding_constraint(gene_path, tissue_path)

# TODO:(rgrant) uncmoment me to run the regions task
print(f"RUNNING REGIONS")
print(f"starting loading of table:")
print(f"importig table")
region_path = "/Users/rgrant/Downloads/oct14_ncc-files/constraint_z_genome_1kb_filtered.browser.txt"
my_ds = prepare_gnomad_v3_region_non_coding_constraint(region_path)


# part 2 - export it to my local one
print(f"exporting table to elasticsearch")
# export_table_to_elasticsearch(table=my_ds, index="ncc_gene_level_v3", id_field="gene_id")
export_table_to_elasticsearch(table=my_ds, index="ncc_region_level_v1", id_field="element_id")


print(f"finished")
