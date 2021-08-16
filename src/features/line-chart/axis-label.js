import React, { useEffect, useRef } from 'react';
import { select } from 'd3';

const AxisLabel = ({
  transform,
  x,
  y,
  text,
  ...props
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const axisLabel = select(textRef.current);

    axisLabel
      .attr('x', x)
      .attr('y', y)
      .attr('opacity', .5)
      .attr('color', 'black')
      .attr('font-size', '1rem')
      .style('text-anchor', 'middle')
      .attr('font-family', 'sans-serif');
  }, []);
    
  return <text ref={textRef} transform={transform} {...props}>{text}</text>
};

export default AxisLabel;