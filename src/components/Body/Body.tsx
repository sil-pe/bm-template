import React from 'react';

import styles from './body.scss';


export const Body: React.FC = ({children}) => (
  <div className={styles.container}>
    {children}
  </div>
);

