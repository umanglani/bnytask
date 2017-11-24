import React, { Component } from 'react'
import { render } from 'react-dom'
import styles from './style.css'

import { DateRange, sectors } from './dataGenerator.js'
import Slider from './components/slider'
import Legend from './components/legend'
import Treemap from './components/treemap'

import cn from 'classnames'

const cx = cn.bind(styles)

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: ''
    }
    this.handleSliderDateChange = this.handleSliderDateChange.bind(this)
  }

  handleSliderDateChange = (date) => {
    this.setState({selectedDate: date})
  }

  render() {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('leftPanel')}>
          <Slider onSliderDateChange={this.handleSliderDateChange} dateRange={DateRange}></Slider>
          <Legend sectors={sectors}></Legend>
        </div>

        <div className={cx('treeMap')}>
          <Treemap selectedDate={this.state.selectedDate} ></Treemap>
        </div>
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
