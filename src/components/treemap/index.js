import React, { Component } from 'react'
import cn from 'classnames'
import styles from './index.css'

import { BuildTree } from './logic.js'

const cx = cn.bind(styles)

export default class Treemap extends Component {

  componentDidMount () {
    // builds tree first time
    BuildTree(this.refs['main'], this.props.selectedDate)
  }

  componentWillReceiveProps (nextProps) {
    // check for date change via slider, if date is changed, build the tree again
    if (this.props.selectedDate !== nextProps.selectedDate) {
      this.GetDataForDate(nextProps.selectedDate)
    }
  }

  GetDataForDate = (date) => {
    BuildTree(this.refs['main'], date)
  }

  render() {
    return (
      <div className={cx('treeContainer')} ref='main'>
        <div  className={cx('heading')}>Country/Sector Flow</div>
      </div>
    )
  }
}


