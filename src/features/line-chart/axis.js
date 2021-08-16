import React, { useEffect, useRef } from 'react';
import {
  axisBottom,
  axisLeft,
  select
} from 'd3';

const Axis = ({
  type,
  scale,
  ticks,
  tickFormat,
  tickSizeOuter,
  transform,
  textAnchor,
  ...props
}) => {
  const gRef = useRef(null);

  useEffect(() => {
    const axisGenerator = type === 'left' ? axisLeft : axisBottom;
    const axis = axisGenerator(scale)
      .ticks(ticks)
      .tickFormat(tickFormat)
      .tickSizeOuter(tickSizeOuter);
    const axisGroup = select(gRef.current);

    axisGroup.call(axis);
    
    axisGroup.select('.domain').remove();
    axisGroup.select('line').remove();
    axisGroup.selectAll('text')
      .attr('opacity', .5)
      .attr('color', 'black')
      .attr('font-size', '0.75rem')
      .attr('text-anchor', textAnchor);
    console.log('axisGroup: ', axisGroup);
  }, [scale, ticks, tickFormat]);
    
  return <g ref={gRef} transform={transform} {...props} />
};

export default Axis;