import * as React from 'react';
import classNames from 'classnames';
import {StylingProps} from './types';
import * as styles from './Layout.scss';

export type DirectedProps = StylingProps & {
  children: React.ReactNode;
};
export type DirectionProps = DirectedProps & {
  vertical?: true;
};

const Direction: React.SFC<DirectionProps> = ({children, className, vertical}: DirectionProps) => {
  if (!children) {
    return null;
  }
  return (
    <div className={classNames(vertical ? styles.vLayout : styles.hLayout, className)}>
      {children}
    </div>
  );
};
export const HLayout = (props: DirectedProps) => <Direction {...props}/>;
export const VLayout = (props: DirectedProps) => <Direction vertical {...props}/>;
export default Direction;
