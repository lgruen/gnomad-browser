import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Badge, BaseTable, Select, TooltipAnchor, TooltipHint } from '@gnomad/ui'

import Link from '../Link'
import { renderRoundedNumber } from './constraintMetrics'

const Table = styled(BaseTable)`
  width: 100%;
  @media (max-width: 600px) {
    td,
    th {
      padding-right: 10px;

      /* Drop sparkline column */
      &:nth-child(5) {
        display: none;
      }
    }
  }
`

const TopRow = styled.div`
  margin-bottom: 1rem;
`

const Disclaimer = styled.div`
  width: 80%;
`

const TissueSelector = styled(Select)`
  margin-bottom: 0.5rem;
`

type Tissue = {
  tissue: string
  element_id: string
  enhancer: string
  enhancer_constraint_z: number
  start: number
  stop: number
  possible: number
  observed: number
  expected: number
  oe: number
}

type Constraint = {
  element_id: string
  enhancer: string
  enhancer_constraint_z: number
  start: number
  stop: number
  possible: number
  expected: number
  observed: number
  oe: number
  tissues: [Tissue]
}

type Props = {
  geneId: string
  constraint: Constraint
}

// TODO:(rgrant)
// basically I want to include a switch type thing, that can just happen up top
const GnomadNonCodingConstraintTable = ({ geneId, constraint }: Props) => {
  const [tissueSelected, setTissueSelected] = useState('Overall')
  const [tissueData, setTissueData] = useState({
    tissue: 'Test Option',
    observed: 12.5,
    expected: 25.5,
    oe: 30.2,
    enhancer: 'sample-region',
    enhancer_constraint_z: 1.432,
  })

  /**
   * Kind of Janky
   */
  useEffect(() => {
    // TODO:(rgrant) kind of janky
    if (constraint == null) return

    if (tissueSelected === 'Overall') {
      const newTissueSelected = {
        tissue: 'Overall',
        expected: constraint.expected,
        observed: constraint.observed,
        oe: constraint.oe,
        enhancer: constraint.enhancer,
        enhancer_constraint_z: constraint.enhancer_constraint_z,
      }
      console.log(newTissueSelected)
      setTissueData(newTissueSelected)
    } else {
      const newTissueSelected = constraint.tissues.filter((row: any) => {
        return row.tissue === tissueSelected
      })
      // TODO:(rgrant) this is kinda janky
      console.log(newTissueSelected[0])
      setTissueData(newTissueSelected[0])
    }
  }, [tissueSelected, constraint])

  // TODO:(rgrant) kind of janky
  if (constraint == null) {
    return <div>Non Coding Constraint is not available for this Gene.</div>
  }

  return (
    <>
      <TopRow>
        <span>Non-Coding Constraint</span>
      </TopRow>
      <>
        <Table>
          <thead>
            <tr>
              <th scope="col">
                Enhancer <br /> Enhancer Region
              </th>
              {/* <th scope="col">Enhancer Region</th> */}
              <th scope="col">
                {/* @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: string; }' is ... Remove this comment to see the full error message */}
                <TooltipAnchor tooltip="Expected variant counts were predicted using ... TODO">
                  {/* @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
                  <TooltipHint>Expected</TooltipHint>
                </TooltipAnchor>
              </th>
              <th scope="col">
                {/* @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: string; }' is ... Remove this comment to see the full error message */}
                <TooltipAnchor tooltip="... TODO">
                  {/* @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
                  <TooltipHint>Observed</TooltipHint>
                </TooltipAnchor>
              </th>
              <th scope="col">Constraint metrics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">
                {/* {tissueSelected} */}
                <TissueSelector
                  id="tissue-selected"
                  value={tissueSelected}
                  onChange={(e) => {
                    setTissueSelected(e.target.value)
                  }}
                >
                  <optgroup label="Tissue">
                    <option value="Overall" key="Overall">
                      {`Overall (${Math.round(constraint.enhancer_constraint_z * 100) / 100})`}
                    </option>
                    {constraint.tissues.map((tissue: any) => (
                      <option value={tissue.tissue} key={tissue.tissue}>
                        {`${tissue.tissue} (${
                          Math.round(tissue.enhancer_constraint_z * 100) / 100
                        })`}
                      </option>
                    ))}
                  </optgroup>
                </TissueSelector>
                <div>{tissueData.enhancer.substring(3, tissueData.enhancer.length)}</div>
              </td>
              {/* <td>{tissueData.enhancer}</td> */}
              {/* <td>{Math.round(tissueData.expected * 1000) / 1000}</td> */}
              <td>{renderRoundedNumber(tissueData.expected)}</td>
              <td>{tissueData.observed}</td>
              <td>
                Z ={' '}
                {renderRoundedNumber(tissueData.enhancer_constraint_z, {
                  precision: 2,
                  tooltipPrecision: 3,
                  highlightColor: null,
                })}
                <br />
                o/e ={' '}
                {renderRoundedNumber(tissueData.oe, {
                  precision: 2,
                  tooltipPrecision: 3,
                  highlightColor: null,
                })}
                {/* {`(${0.999} - ${0.925})`} */}
              </td>
            </tr>
          </tbody>
        </Table>
      </>

      {/* TODO: make this squish and compress as needed - give it a class and a max width */}
      <Disclaimer>
        <p>
          This is{' '}
          <b>
            <i>not</i>
          </b>{' '}
          a Gene constraint.
        </p>
        <p>
          For gene constraints such as pLI, visit the{' '}
          <Link
            to={`/gene/${geneId}?dataset=gnomad_r2_1`}
            preserveSelectedDataset={false}
          >{`corresponding Gene of build GRCh37 (gnomAD v2.1.1)`}</Link>
        </p>
      </Disclaimer>
    </>
  )
}

export default GnomadNonCodingConstraintTable
