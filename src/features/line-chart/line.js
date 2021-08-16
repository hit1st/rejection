import React, { useRef } from 'react';
import { line } from 'd3';

const Line = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  yValueIsaN,
  color,
  ...props
}) => {
  const ref = useRef(null);
  const linePath = line()
    .defined(yValueIsaN)
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)));
  
  return (
    <path
      ref={ref}
      d={linePath(data)}
      stroke={color}
      strokeWidth={1.5}
      fill='none'
      strokeLinejoin='round'
      strokeLinecap='round'
      {...props}
    />
  );
};

export default Line;