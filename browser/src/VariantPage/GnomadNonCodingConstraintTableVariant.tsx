import React from 'react'
import styled from 'styled-components'

import { BaseTable, TooltipAnchor, TooltipHint } from '@gnomad/ui'

import Link from '../Link'

import { renderRoundedNumber } from '../ConstraintTable/constraintMetrics'

const Table = styled(BaseTable)`
  width: 100%;
  margin-top: 1rem;
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

const ViewSurroundingRegion = styled.div`
  margin-top: 1rem;
`

type NonCodingConstraint = {
  // enhancer: string
  // enhancer_constraint_z: number
  start: number
  stop: number
  possible: number
  observed: number
  expected: number
  oe: number
  z: number
}

type Props = {
  variantId: string
  chrom: string
  nonCodingConstraint: NonCodingConstraint
}

const GnomadNonCodingConstraintTableVariant = ({
  variantId,
  chrom,
  nonCodingConstraint,
}: Props) => {
  if (nonCodingConstraint == null) {
    return <>This variant does not have non coding constraint data for the surrounding region.</>
  }

  const variantLocation = parseInt(variantId.split('-')[1], 10)
  // TODO:(rgrant) do some checks if this goes over the max region, or under
  const surroundingLocation = `${chrom}-${variantLocation - 20000}-${variantLocation + 20000}`

  return (
    <>
      <div>
        {`Genomic constraint values displayed are for the region: ${chrom}-${nonCodingConstraint.start}-${nonCodingConstraint.stop}`}
      </div>
      <Table>
        <thead>
          <tr>
            {/* <th scope="col">Enhancer</th> */}
            <th scope="col">Expected</th>
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
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>Overall</td> */}
            <td>{renderRoundedNumber(nonCodingConstraint.expected)}</td>
            <td>{nonCodingConstraint.observed}</td>
            <td>
              Z ={' '}
              {renderRoundedNumber(nonCodingConstraint.z, {
                precision: 2,
                tooltipPrecision: 3,
                highlightColor: null,
              })}
              <br />
              o/e ={' '}
              {renderRoundedNumber(nonCodingConstraint.oe, {
                precision: 2,
                tooltipPrecision: 3,
                highlightColor: null,
              })}
            </td>
          </tr>
        </tbody>
      </Table>
      <ViewSurroundingRegion>
        <p>View the genomic constraint values for the 40kb region surrounding this variant</p>
        <p>
          <Link to={`/region/${surroundingLocation}`}>{surroundingLocation}</Link>
        </p>
      </ViewSurroundingRegion>
    </>
  )
}

export default GnomadNonCodingConstraintTableVariant
