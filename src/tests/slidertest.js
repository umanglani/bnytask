import React from 'react'
import Slider from '../components/slider'
import renderer from 'react-test-renderer'
import { DateRange } from '../dataGenerator'

describe('The slider component is rendered correctly', () => {
  it('renders correctly', () => {
    
    const rendered = renderer.create(
      <Slider dateRange={DateRange}></Slider>
    )

    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
