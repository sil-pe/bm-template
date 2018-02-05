import * as React from 'react';
import * as icons from '../icons';
import * as styles from './IconShowcase.scss';

export type IconShowcaseProps = {};

/**
 * The `IconShowcase` just shows available icons in the styleguide
 */
const IconShowcase: React.SFC<IconShowcaseProps> = () => {
  const iconMap: any = icons;
  return (
    <div id='icon-showcase'>
      {
        Object.keys(iconMap).map(key => {
          const Component = iconMap[key];
          return (
            <div key={key} className={styles.box}>
              <p>{key}</p>
              <Component className={styles.icon} />
            </div>
          );
        })
      }
    </div>
  );
};

export default IconShowcase;
