import React, { Component } from 'react'
import styled from 'styled-components'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border:1px solid black;
  margin: 5px 0;
`
const Heading = styled.div`
  margin: 5px;
  font-size: 16px;
`

const LegendItem = styled.div`
  display: flex;
  flex-direction: row ;
  justify-content: flex-start;
  align-items: center;
  margin:9px 5px;
`
const LegendColor = styled.div`
  width: 35px;
  height: 35px;
  background: ${props => props.color};
`
const LegendText = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
`

export default class Legend extends Component {
  render() {
    const { sectors } = this.props
    return (
      <MainWrapper>
         <Heading>Sector Value</Heading>
      {
        sectors.map( (sector) => {
          return <LegendItem key={sector.name}>
            <LegendColor color={sector.color}></LegendColor>
            <LegendText>{sector.name}</LegendText>
          </LegendItem>
        })
      }
      </MainWrapper>
    )
  }
}


