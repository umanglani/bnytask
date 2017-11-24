import React from 'react'
import Legend from '../components/legend'
import renderer from 'react-test-renderer'
import { sectors } from '../dataGenerator'

describe('The legend component is rendered correctly', () => {
  it('renders correctly', () => {
    
    const rendered = renderer.create(
      <Legend sectors={sectors}></Legend>
    )

    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
