import React from 'react'
import renderer from 'react-test-renderer'
import HelpPage from './HelpPage'

test('has no unexpected changes', () => {
  const tree = renderer.create(<HelpPage />)
  expect(tree).toMatchSnapshot()
})
