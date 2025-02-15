export const GNOMAD_POPULATION_NAMES = {
  afr: 'African/African American',
  ami: 'Amish',
  amr: 'Latino/Admixed American',
  asj: 'Ashkenazi Jewish',
  eas: 'East Asian',
  fin: 'European (Finnish)',
  mid: 'Middle Eastern',
  nfe: 'European (non-Finnish)',
  oth: 'Other',
  sas: 'South Asian',

  // EAS subpopulations
  eas_jpn: 'Japanese',
  eas_kor: 'Korean',
  eas_oea: 'Other East Asian',

  // NFE subpopulations
  nfe_bgr: 'Bulgarian',
  nfe_est: 'Estonian',
  nfe_nwe: 'North-western European',
  nfe_onf: 'Other non-Finnish European',
  nfe_seu: 'Southern European',
  nfe_swe: 'Swedish',
} as const

export type PopulationId = keyof typeof GNOMAD_POPULATION_NAMES
