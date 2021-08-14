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
  const xScale = scaleTime()
    .domain(extent(data, d => d.date))
    .range([margin.left, width - margin.right]);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.score)]).nice()
    .range([height - margin.bottom, margin.top]);

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
  svg.append('g').call(xAxis);
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - 25)
    .style('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .text('Days of the Week');

  svg.append('g').call(yAxis);
  svg.append('text')
    .attr('transform', `rotate(-90,15,${height / 2})`)
    .attr('x', 15)
    .attr('y', height / 2)
    .style('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .text('Score');

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
