import {
  scaleTime,
  scaleLinear,
  extent,
  max,
} from 'd3';

const getXScale = (data, width, margin) => scaleTime()
  .domain(extent(data, d => d.date))
  .range([margin.left, width - margin.right]);

const getYScale = (data, height, margin) => scaleLinear()
  .domain([0, max(data, (d) => d.score)]).nice()
  .range([height - margin.bottom, margin.top]);

export { getXScale, getYScale }