import * as React from 'react';

import * as styles from './body.scss';


export const Body: React.SFC<{}> =
  ({children}) => {
    return (
      <div className={styles.container}>
        {children}
      </div>
    );
  };

