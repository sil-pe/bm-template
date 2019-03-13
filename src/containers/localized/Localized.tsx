import * as React from 'react';
import {connect} from 'react-redux';
import {ApplicationState} from '../../store/types';
import {i18n} from 'src/i18n';
import {I18nextProvider} from 'react-i18next';

type LocalizedProps = {
  locale: string;
};

const mapStateToProps = (state: ApplicationState): LocalizedProps => {
  return {
    locale: state.localization.locale
  };
};

const LocaleProvider: React.FC<LocalizedProps> = ({children, locale}) => (
  <I18nextProvider i18n={i18n(locale)}>{children}</I18nextProvider>
);

export const Localized = connect(mapStateToProps)(LocaleProvider);
