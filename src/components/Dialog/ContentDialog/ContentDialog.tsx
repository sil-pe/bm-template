import * as React from 'react';
import {Button} from '../../Button';
import {ContentDialogTypes} from './types';

import * as styles from './contentDialog.scss';

export type ContentDialogHeaderProps = {
  title: String;
  onClose?: () => void;
};

const ContentDialogHeader: React.SFC<ContentDialogHeaderProps> = ({title, onClose}) => (
  <div className={styles.contentDialogHeader}>
    <div className={styles.backButton}>
      <Button clickable={true} onSelect={onClose}>Back</Button>
    </div>
    <div className={styles.title}>{title}</div>
  </div>
);

export type ContentDialogProps = {
  title: String;
  onClose?: () => void;
};

export const ContentDialog: React.SFC<ContentDialogProps> = ({title, onClose, children}) => {
  return (
    <div>
      <div className={styles.contentDialog}>
        <ContentDialogHeader title={title} onClose={onClose} />
        <div className={styles.contentDialogBody}>
          {children}
        </div>
      </div>
      <div className={styles.backdrop} role='button' onClick={onClose}/>
    </div>
  );
};

export const getContentDialog = (
  type: ContentDialogTypes, numExercises: number, onCloseDialog: () => void,
  onCloseApp: () => void, switchExercise: (index: number) => void
) => {
  let children;
  let title;
  switch (type) {
    case ContentDialogTypes.closeConfirmation:
      title = 'Quit';
      children = [
        <p key='1'>Do you really want to quit now?</p>,
        (
          <p key='2'>If you close the exercise sheet now, you can continue working on it later.
          Do you want to leave the exercise sheet?</p>
        ),
        (
          <Button
            key='quit'
            clickable={true}
            onSelect={onCloseApp}
            stretch={true}>
            Quit exercise series
          </Button>
        ),
        (
          <Button
            key='unquit'
            clickable={true}
            onSelect={onCloseDialog}
            stretch={true}>
            Don't quit
          </Button>
        )
      ];
      break;
    case ContentDialogTypes.help:
      title = 'Help';
      children = 'I am for help...';
      break;
    case ContentDialogTypes.navigation:
      title = 'Switch Exercise';
      children = 'I am for report problem...';
      break;
    case ContentDialogTypes.reportProblem:
      title = 'Report a problem';
      children = 'I am for report problem...';
      break;
    default:
      return null;
  }
  return (
    <ContentDialog title={title} onClose={onCloseDialog}>
      {children}
    </ContentDialog>
  );
};
