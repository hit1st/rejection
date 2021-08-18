import React from 'react';
import { timeParse, timeFormat } from 'd3';

import { getXScale, getYScale } from './chart-utils.js';
import { BottomAxis, LeftAxis } from './axis.js';
import { BottomAxisLabel, LeftAxisLabel } from './axis-label.js';
import Line from './line.js';

const dateConverter = timeParse("%Y-%m-%d");

const LineChart = ({ rawData = [], dimensions = {} }) => {
  const data = rawData.map(({ date, score }) => ({ date: dateConverter(date), score }));
  // increasing margin.bottom pushes bottom of chart up to move it away from chart label
  const {
    width = 480,
    height = 250,
    margin = {top: 20, right: 60, bottom: 65, left: 40}
  } = dimensions;

  const xValue = d => d.date;
  const yValue = d => d.score;
  const yValueIsaN = d => !isNaN(d.score);

  const xScale = getXScale(data, width, margin, xValue);
  const yScale = getYScale(data, height, margin, yValue);

  return (
    <svg  width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <BottomAxis
          scale={xScale}
          width={width}
          height={height}
          margin={margin}
          ticks={6}
          tickFormat={timeFormat("%b %d")}
        />
        <LeftAxis 
          scale={yScale}
          margin={margin}
        />
        <BottomAxisLabel
          width={width}
          height={height}
          text={'Days of the Week'}
        />
        <LeftAxisLabel
          height={height}
          text={'Score'}
        />
        <Line
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          yValueIsaN={yValueIsaN}
          color='steelblue'
        />
      </g>
    </svg>
  )
};

export default LineChart;
