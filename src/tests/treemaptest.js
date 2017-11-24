import React from 'react'
import Treemap from '../components/treemap'
import renderer from 'react-test-renderer'
import { sectors } from '../dataGenerator'

const selectedDate = '2017-05-29'

describe('The treemap component is rendered correctly', () => {
  it('renders correctly', () => {
    
    const rendered = renderer.create(
      <Treemap selectedDate={selectedDate} ></Treemap>
    )

    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
