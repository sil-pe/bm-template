declare module 'react-measure' {
  import * as React from 'react';

  export type MeasureFuncParams = {
    measureRef: React.Ref<any>;
    measure: () => void;
    contentRect: any;
  };

  export type MeasureContentRect = Partial<{
    client: any;
    offset: any;
    scroll: any;
    bounds: any;
    margin: any;
  }>;

  export type MeasureProps = {
    client?: boolean;
    offset?: boolean;
    scroll?: boolean;
    bounds?: boolean;
    margin?: boolean;
    innerRef?: React.Ref<any>;
    onResize?: (contentRect: MeasureContentRect) => void;
    children: (params: MeasureFuncParams) => JSX.Element;
  };

  const Measure: React.ComponentClass<MeasureProps>;

  export default Measure;
}
