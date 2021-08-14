import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  timeParse,
  scaleTime,
  scaleLinear,
  extent,
  max,
  axisBottom,
  axisLeft,
  timeFormat,
  line,
  select
} from 'd3';

import {
  getXScale,
  getYScale,
  applyAxisLabelStyles,
  drawAxis
} from './chart-utils.js';


const dateConverter = timeParse("%Y-%m-%d");

const LineChart = ({ rawData = [], dimensions = {} }) => {
  const svgRef = useRef(null);
  const data = rawData.map(({ date, score }) => ({ date: dateConverter(date), score }));
  // increasing margin.right fits the end of x axis to the chart
  // increasing margin.bottom pushes bottom of chart up to move it away from chart label
  const {
    width = 960,
    height = 500,
    margin = {top: 20, right: 60, bottom: 60, left: 40}
  } = dimensions;

  console.log('data: ', data);
  // Step 3. Create x and y axes.
  const xScale = getXScale(data, width, margin);

  const yScale = getYScale(data, height, margin);

  // Create root container where we will append all other chart elements
  const svgEl = select(svgRef.current);
  // Clear svg content before adding new elements
  svgEl.selectAll('*').remove();
  const svg = svgEl
    .append('g')
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xAxis = (g) => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(axisBottom(xScale).tickFormat(timeFormat("%b %d")).ticks(width / 115).tickSizeOuter(0));

  const yAxis = (g) => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(axisLeft(yScale));


    // Step 4. Define the line function.
  const linePath = line()
    .defined(d => !isNaN(d.score))
    .x(d => xScale(d.date))
    .y(d => yScale(d.score));

  // increasing subtraction from height moves text up to view in display
  drawAxis({
    container: svg,
    xScale,
    ticks: width / 115,
    tickFormat: timeFormat("%b %d"),
    tickSizeOuter: 0,
    transform: `translate(0,${height - margin.bottom})`
  });
  // svg.append('g').call(xAxis);
  applyAxisLabelStyles({
    container: svg,
    x: width / 2,
    y: height - 25, 
    text: 'Days of the Week'
  });

  drawAxis({
    container: svg,
    yScale,
    transform: `translate(${margin.left},0)`
  });
  // svg.append('g').call(yAxis);
  applyAxisLabelStyles({
    container: svg,
    transform: `rotate(-90,15,${height / 2})`,
    x: 15,
    y: height / 2,
    text: 'Score'
  });

  // Draw the line.
  svg.append('path')
    .datum(data)
    .attr('d', linePath)
    .style('fill', 'none')
    .style('stroke', 'steelblue')
    .style('stroke-width', 1.50)
    .style('stroke-linejoin', 'round')
    .style('stroke-linecap', 'round');

  return (
    <svg ref={svgRef} width={width} height={height} /> 
  )
};

export default LineChart;
