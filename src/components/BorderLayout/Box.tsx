import * as React from 'react';
import classNames from 'classnames';
import * as styles from './Box.scss';

export type BoxProps = {
  className?: string;
  scrollable?: true;
  stretch?: true;
};

const Box: React.SFC<BoxProps> = (props) => {
  const classes = classNames(
    props.className,
    {
      [styles.stretch]: props.stretch,
      [styles.scrollWrapper]: props.scrollable
    }
  );
  return (
    <div className={classes}>
      {props.scrollable ?
        <div className={styles.scrollable}>{props.children}</div> : props.children}
    </div>
  );
};
export default Box;

