import {
  scaleTime,
  scaleLinear,
  extent,
  max,
} from 'd3';

const getXScale = (data, width, margin, xValue) => scaleTime()
  .domain(extent(data, xValue))
  .range([margin.left, width - margin.right]);

const getYScale = (data, height, margin, yValue) => scaleLinear()
  .domain([0, max(data, yValue)]).nice()
  .range([height - margin.bottom, margin.top]);

export { getXScale, getYScale }