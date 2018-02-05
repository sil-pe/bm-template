/*
 * Types emitted by the svg-sprite-loader
 *
 * The default export is only meant for the generated react components
 * in src/components/icons.
 * The other exports (id, viewBox, url) can be used anywhere else in the code.
 * In the CSS, SVGs can be used with url(...).
 */


declare module '*.svg' {
  import * as React from 'react';
  const SVGComponent: React.SFC<React.SVGAttributes<{}>>;
  export default SVGComponent;

  export const id: string;
  export const viewBox: string;
  export const url: string;
}
