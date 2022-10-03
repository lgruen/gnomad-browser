import { stubQueries, MockEndpoints } from '../../../tests/__helpers__/apiCall'
import { readsApiOutputFactory, exomeReadApiOutputFactory } from '../__factories__/ReadData'
import { jest, expect, test } from '@jest/globals'
import 'jest-styled-components'

import React from 'react'
import renderer from 'react-test-renderer'

import { forAllDatasets } from '../../../tests/__helpers__/datasets'
import { withDummyRouter } from '../../../tests/__helpers__/router'

const mockEndpoints: MockEndpoints = [
  [
    /./,
    readsApiOutputFactory.params({
      variant_0: { exome: exomeReadApiOutputFactory.buildList(1) },
    }),
  ],
]

stubQueries(mockEndpoints)

import ReadDataContainer from './ReadData'

const variantId = '123-45-A-G'

jest.mock('../../../graphql-api/src/cache', () => ({
  withCache: (wrappedFunction: any) => wrappedFunction,
}))

jest.mock('./IGVBrowser', () => () => null)

forAllDatasets('ReadData with "%s" dataset selected', (datasetId) => {
  test('has no unexpected changes', () => {
    const tree = renderer.create(
      withDummyRouter(<ReadDataContainer datasetId={datasetId} variantIds={[variantId]} />)
    )
    expect(tree).toMatchSnapshot()
  })
})
