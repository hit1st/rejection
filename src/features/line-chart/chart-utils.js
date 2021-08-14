import React from 'react';
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

const getXScale = (data, width, margin) => scaleTime()
  .domain(extent(data, d => d.date))
  .range([margin.left, width - margin.right]);

const getYScale = (data, height, margin) => scaleLinear()
  .domain([0, max(data, (d) => d.score)]).nice()
  .range([height - margin.bottom, margin.top]);

const applyAxisLabelStyles = ({ container, transform, x, y, text }) => container.append('text')
  .attr('transform', transform)
  .attr('x', x)
  .attr('y', y)
  .style('text-anchor', 'middle')
  .attr('font-family', 'sans-serif')
  .text(text);

const drawAxis = ({
  container,
  xScale,
  yScale,
  ticks,
  tickFormat,
  tickSizeOuter,
  transform
}) => {
  const scale = xScale || yScale;
  const axisType = xScale ? axisBottom : axisLeft;
  const axis = g => g
    .attr('transform', transform)
    .call(axisType(scale)
      .tickFormat(tickFormat)
      .ticks(ticks)
      .tickSizeOuter(tickSizeOuter)
    );
  return container.append('g').call(axis)
};

export {
  getXScale,
  getYScale,
  applyAxisLabelStyles,
  drawAxis
}