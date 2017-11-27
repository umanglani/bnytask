/*
  The logic to build treemap is written separately JS file
  1. gets date from slider when user changes the date
  2. generates random data for given date
  3. build the tree, which is placed under the ele passed from main page
*/
import * as d3 from 'd3'
import styles from './index.css'

import { GenerateData } from '../../dataGenerator.js'

export const BuildTree = (ele, date) => {
  
  // genearte data 
  const data = GenerateData(date)
  
  const width = 1200
  const height = 600
  
  // remove the previous map
  d3.select(ele).select("svg").remove()

  const canvas = d3.select(ele)
    .append("svg")
    .attr("width",width)
    .attr("height",height)

  // tooltip generation
  const divTooltip = d3.select(ele).append("div")
  .style("position", "absolute")
  .style("width", "auto")
  .style("height", "auto")
  .style("background", "none repeat scroll 0 0 white")
  .style("border", "0 none")
  .style("border-radius", "8px 8px 8px 8px")
  .style("box-shadow", "-3px 3px 15px #888888")
  .style("color", "black")
  .style("font", "15px sans-serif")
  .style("padding", "5px")
  .style("text-align", "center")
  .style("display", "none")

  const treeMap = d3.treemap()
    .size([width, height])
    .paddingInner(1)
    .paddingOuter(2)
  
  // creating root and generating id's of each node. Sum the value for each country
  const root = d3.hierarchy(data)
    .eachBefore( (d) => { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name })
    .sum((d) => { return d.value })
    .sort( (a,b) => { return b.value - a.value })
  
  treeMap(root)
  
  const cell = canvas.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
    .attr("transform", (d) => { return "translate(" + d.x0 + "," + d.y0 + ")" })
  
  cell.append("rect")
    .attr("id", (d) => { return d.data.id })
    .attr("fill", (d) => { return d.parent.data.color })
    .attr("width", (d) => { return d.x1 - d.x0 })
    .attr("height", (d) => { return d.y1 - d.y0 })
    .attr("class", styles.rect)
    .on("mouseover", function(d) { onMouseOver(d) })
    .on("mouseout", function(d) { onMouseOut() })

  // appending country name for each node
  cell.append("text")
    .selectAll("tspan")
    .data( (d) => { 
      const w = d.x1 - d.x0
      const h = d.y1 - d.y0
      if (w > 40 && h > 25)
        return d.data.name.split(/(?=[A-Z][^A-Z])/g)
      else
        return ''
    })
    .enter().append("tspan")
    .attr("x", 5)
    .attr("y", (d, i) => { return 16 + i * 10; })
    .text( (d) => { return d })
    .on("mouseover", function(d) { onMouseOver(d) })
    .on("mouseout", function(d) { onMouseOut() })

  // appending sector value for each node
  cell.append("text")
    .selectAll("tspan")
    .data(function(d) {
      // calculating how many chars can fit into rect 
      const w = d.x1 - d.x0
      const h = d.y1 - d.y0
      if (w > 75 && h > 45) {
        const chars = w / 10
        const sectorName = d.parent.data.name.split(/(?!.)/g) 
        let returnValue = []
        returnValue.push(sectorName[0].substr(0, chars))
        return returnValue
      } else {
        return ''
      }
    })
    .enter().append("tspan")
    .attr("x", 4)
    .attr("y", function(d, i) { return 40 + i * 15 })
    .text(function(d) { return d })
    .on("mouseover", function(d) { onMouseOver(d) })
    .on("mouseout", function(d) { onMouseOut() })

  // currentNode stores the last hovered node
  let currentNode

  // mouser over event to show tooltip
  const onMouseOver = (d) => {
    if (d.data && d.parent && d.parent.data) currentNode = d 

    // avoid the ferquent mouse over event which can cause loss of data
    if (!currentNode) return

    const pageX = d3.event.pageX > 1110 ? d3.event.pageX - 370 : d3.event.pageX
    const pageY = d3.event.pageY > 640 ? d3.event.pageY - 85 : d3.event.pageY

    divTooltip.style("left", pageX + 10 + "px")
    divTooltip.style("top", pageY - 10 + "px")
    divTooltip.style("display", "inline-block")
    divTooltip.html(
      ` <div class='tooltip'>
        <div> <span>Acc CC </span> <span>:</span> <span> ${currentNode.data && currentNode.data.name} </span> </div>
        <div> <span>Sector Value </span> <span>:</span> <span> ${currentNode.parent.data && currentNode.parent.data.name} </span> </div>
        <div> <span>Sector Value (USD) </span> <span>:</span> <span> ${currentNode.data.value} </span> </div>
        </div>
      `
    )
  } 

  // mouse out event to hide tooltip
  const onMouseOut = () => {
    divTooltip.style("display", "none")
  }


}