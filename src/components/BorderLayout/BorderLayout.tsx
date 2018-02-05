import * as React from 'react';
import Box from './Box';
import {HLayout, VLayout} from './Direction';
import {StylingProps} from './types';

export type BorderLayoutProps = StylingProps & {
  children: React.ReactNode;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  scroll?: true;
};

const BorderLayout: React.SFC<BorderLayoutProps> =
  ({children, className, bottom, left, right, top, scroll}) => (
  <VLayout className={className}>
    {top}
    <HLayout>
      {left}
      {children && <Box stretch scrollable={scroll}>{children}</Box>}
      {right}
    </HLayout>
    {bottom}
  </VLayout>
);

export default BorderLayout;
