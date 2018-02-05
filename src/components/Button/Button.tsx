import * as React from 'react';
import * as classNames from 'classnames';
import {DEFAULT_TYPE, ERROR_TYPE, REMARK_TYPE, CORRECT_TYPE} from './constants';

import * as styles from './Button.scss';

type ButtonType =
  typeof DEFAULT_TYPE |
  typeof ERROR_TYPE |
  typeof REMARK_TYPE |
  typeof CORRECT_TYPE;
/**
 * props
 */
export interface ButtonProps {
  id?: string;
  clickable?: boolean;
  type?: ButtonType;
  stretch?: boolean;
  onSelect?: () => void;
}

/**
 * The `Button` is a component for the formula gizmo group
 *
 * ### Process State
 *
 * - Visuals: Working Image tests
 * - Behaviour: Draft from DEV
 *
 * ### Properties
 | Name              | Type      | Default   | Description                    |
 |---                |---        |---        |---                             |
 | `clickable`       | boolean   | Required  | If true, button is enabled else disabled |
 | `type`            | string    | Optional  | A predefined style, one of [error, remark, correct] |
 | `stretch`         | boolean   | Optional  | When set the button uses full available width |
 */
const Button: React.SFC<ButtonProps> = ({clickable, onSelect, id, children, type, stretch}) => {
  const buttonStyle = classNames(
    styles.btn,
    clickable ? styles.enabled : styles.disabled,
    type ? styles[type] : styles.default,
    {
      [styles.stretch]: stretch
    }
  );

  const clickAreaStyle = classNames(
    styles.btnClickableArea,
    clickable ? styles.enabled : ''
  );

  const wrapperStyle = classNames(
    styles.btnWrapper,
    {
      [styles.stretch]: stretch
    }
  );

  const clickBtn = clickable ? onSelect : undefined;

  return(
    <div className={wrapperStyle}>
      <div id={id} className={clickAreaStyle}
      role='button'
      onClick={clickBtn} />
      <button className={buttonStyle}>
          {children}
      </button>
    </div>
  );
};

export default Button;
