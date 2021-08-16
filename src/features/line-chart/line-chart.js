import React from 'react';
import { timeParse, timeFormat } from 'd3';

import { getXScale, getYScale } from './chart-utils.js';

import Axis from './axis.js';
import AxisLabel from './axis-label.js';
import Line from './line.js';

const dateConverter = timeParse("%Y-%m-%d");

const LineChart = ({ rawData = [], dimensions = {} }) => {
  const data = rawData.map(({ date, score }) => ({ date: dateConverter(date), score }));
  // increasing margin.right fits the end of x axis to the chart
  // increasing margin.bottom pushes bottom of chart up to move it away from chart label
  const {
    width = 960,
    height = 500,
    margin = {top: 20, right: 60, bottom: 60, left: 40}
  } = dimensions;

  console.log('data: ', data);
  // Create x and y axes.
  const xScale = getXScale(data, width, margin);
  const yScale = getYScale(data, height, margin);

  return (
    <svg  width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <Axis 
          type='bottom'
          scale={xScale}
          transform={`translate(0,${height - margin.bottom})`}
          ticks={width / 115}
          tickFormat={timeFormat("%b %d")}
          tickSizeOuter={0}
          textAnchor='middle'
        />
        <Axis 
          type='left'
          scale={yScale}
          transform={`translate(${margin.left},0)`}
          textAnchor='end'
        />
        <AxisLabel
          x={width / 2}
          y={height - 25} 
          text={'Days of the Week'}
        />
        <AxisLabel
          transform={`rotate(-90,15,${height / 2})`}
          x={15}
          y={height / 2}
          text={'Score'}
        />
        <Line
          data={data}
          xScale={xScale}
          yScale={yScale}
          color='steelblue'
        />
      </g>
    </svg>
  )
};

export default LineChart;
