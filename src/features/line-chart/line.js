import React, { useRef } from 'react';
import { line } from 'd3';

const Line = ({
  data,
  xScale,
  yScale,
  color,
  ...props
}) => {
  const ref = useRef(null);
  const linePath = line()
    .defined(d => !isNaN(d.score))
    .x(d => xScale(d.date))
    .y(d => yScale(d.score));
  
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