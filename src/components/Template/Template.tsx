import * as React from 'react';

import * as styles from './Template.scss';

/**
 * props
 */
export interface TemplateProps {
  prop1: string;
}

/**
 * The `Template` component says 'Hi' to who ever you want.
 *
 * ### Process State
 *
 * - Visuals: Draft from DEV
 * - Behaviour: none
 *
 * ### Properties
 | Name        | Type      | Default   | Description                    |
 |---          |---        |---        |---                             |
 | `prop1`     | string    | Required  | person you want to say 'Hi' to |
 */
const Template: React.SFC<TemplateProps> = ({prop1}) => {
  return (
    <h1 className={styles.hello}>
      Hi {prop1}!
    </h1>
  );
};

export default Template;
