import * as React from 'react';
import {pairWise} from './arrayUtils';

export type Point = {
  x: number;
  y: number;
};

export const calligraphyPath = (points: Point[], angle: number, width: number): JSX.Element[] =>
  pairWise(
    points.map((p) => [p, {x: p.x + Math.cos(angle) * width, y: p.y - Math.sin(angle) * width}])
  )
  .map(([[a, b], [c, d]]) => [a, c, d, b])
  .map((quad, i) => (
    <path key={i} d={
      quad
        .map(({x, y}, i) => `${i === 0 ? 'M' : 'L'}${x} ${y}${i === 3 ? 'Z' : ''}`)
        .join(' ')
    }/>
  ));
