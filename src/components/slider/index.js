import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border:1px solid black;
  padding: 10px;
  margin-bottom: 3px;
`
const DateBox = styled.div`
  width: 90%;
  border:1px solid black;
  font-size: 16px;
  padding: 3px;
  margin-bottom: 5px;
`
const SliderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const ArrowButton = styled.div`
  font-size: 25px;
  font-weight: bold;
  font-family: monospace;
  width: 12%;
  height: 25px;
  border: 1px solid black;
  margin: 0 3px;
  background: darkgray;


  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`

const SliderControl = styled.input`
  width: 60%;
  margin: 5px 5px 0 0;
`

export default class Slider extends Component {
  constructor() {
    super()
    this.state = {
      selectedDate: '',
      rangeValue: 1
    }
    this.handleArrowClick = this.handleArrowClick.bind(this)
  }

  handleRangeChange = (e) => {
    if (e.target) {
      this.setDate(parseInt(e.target.value, 10))
    }
  }

  handleArrowClick = (e) => {
    let newRangeVal = this.state.rangeValue
    if (e.target.id === 'back' && this.state.rangeValue > 1) {
      newRangeVal -= 1
    } else if (e.target.id === 'forward' && this.state.rangeValue < this.props.dateRange.length - 1) {
      newRangeVal += 1
    }
    newRangeVal !== this.state.rangeValue && this.setDate(newRangeVal)
  }

  componentDidMount() {
    this.setDate(this.state.rangeValue)
  }

  setDate(rangeVal) {
    const { dateRange } = this.props
    const date = dateRange[rangeVal-1]
    this.setState({rangeValue: rangeVal, selectedDate: date})
    this.props.onSliderDateChange && this.props.onSliderDateChange(date)
  }

  render() {
    const { dateRange } = this.props
    const max = dateRange.length-1
    return (
      <Wrapper>
        <div>Date</div>
        <DateBox ref='selectedDate'>{this.state.selectedDate}</DateBox>

        <SliderBox>
          <SliderControl type='range' min='1' max={max} step='1' value={this.state.rangeValue} onChange={this.handleRangeChange}/>
          <ArrowButton id='back' onClick={this.handleArrowClick}>&lt;</ArrowButton>
          <ArrowButton id='forward' onClick={this.handleArrowClick}>&gt;</ArrowButton>
        </SliderBox>

      </Wrapper>
    )
  }
}


