import React, { PropTypes } from 'react'

import GenePageHOC from '../../../containers/GenePage'

import GeneSettings from '../AppGeneSettings'
import GeneRegion from '../AppRegionViewer'

import css from './styles.css'

const AppGenePage = ({
  currentGene,
  setCurrentGene,
  gene,
  isFetching,
}) => {
  if (isFetching || !gene) {
    return <div>Loading...!</div>
  }
  return (
    <div className={css.browser}>
      <GeneSettings
        currentGene={currentGene}
        setCurrentGene={setCurrentGene}
      />
      <h1>{currentGene}</h1>
      {gene.gene_id}
      <GeneRegion
        gene={gene}
      />
    </div>
  )
}

AppGenePage.propTypes = {
  currentGene: PropTypes.string.isRequired,
  gene: PropTypes.object,
}

export default GenePageHOC(AppGenePage)
