import {
  scaleTime,
  scaleLinear,
  extent,
  max,
  axisBottom,
  axisLeft,
  line,
} from 'd3';

const getXScale = (data, width, margin) => scaleTime()
  .domain(extent(data, d => d.date))
  .range([margin.left, width - margin.right]);

const getYScale = (data, height, margin) => scaleLinear()
  .domain([0, max(data, (d) => d.score)]).nice()
  .range([height - margin.bottom, margin.top]);

const createAxisLabel = ({ container, transform, x, y, text }) => () => container.append('text')
  .attr('transform', transform)
  .attr('x', x)
  .attr('y', y)
  .style('text-anchor', 'middle')
  .attr('font-family', 'sans-serif')
  .text(text);

const createAxis = ({
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
  return () => container.append('g').call(axis)
};


const createLine = ({
  container,
  data,
  xScale,
  yScale
}) => {
  // Define the line function.
  const linePath = line()
  .defined(d => !isNaN(d.score))
  .x(d => xScale(d.date))
  .y(d => yScale(d.score));

  // Draw the line.
  return () => container.append('path')
    .datum(data)
    .attr('d', linePath)
    .style('fill', 'none')
    .style('stroke', 'steelblue')
    .style('stroke-width', 1.50)
    .style('stroke-linejoin', 'round')
    .style('stroke-linecap', 'round');
};

export {
  getXScale,
  getYScale,
  createAxisLabel,
  createAxis,
  createLine
}