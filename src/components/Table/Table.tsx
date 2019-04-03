import * as React from 'react';
import * as styles from './Table.scss';

export interface Value {
  x: number;
  y: string;
}

export interface Props {
  data: Value[];
  sortX: () => void;
  sortY: () => void;
}

export const Table: React.FC<Props> = (props) => {
  return (
    <table className={styles.table}>
      <thead>
        <th className={`sort-x ${styles.col}`} onClick={props.sortX}>x</th>
        <th className={`sort-y ${styles.col}`} onClick={props.sortY}>y</th>
      </thead>
      <tbody>
      {
        props.data.map((value, index) => (
          <tr key={index}>
            <td className={styles.col}>{ value.x }</td>
            <td className={styles.col}>{ value.y }</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}

