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
    axisGroup.selectAll('text')
      .attr('opacity', .5)
      .attr('color', 'black')
      .attr('font-size', '0.75rem')
      .attr('text-anchor', textAnchor);
  }, [scale, ticks, tickFormat]);
    
  return <g ref={gRef} transform={transform} {...props} />
};

const BottomAxis = ({
  height,
  width,
  margin,
  ...props
}) => (
  <Axis
    type='bottom'
    transform={`translate(0,${height - margin.bottom})`}
    textAnchor='middle'
    tickSizeOuter={0}
    {...props}
  />
);

const LeftAxis = ({ margin, ...props }) => (
  <Axis
    type='left'
    transform={`translate(${margin.left},0)`}
    textAnchor='end'
    {...props}
  />
);

export default Axis;
export { BottomAxis, LeftAxis };
