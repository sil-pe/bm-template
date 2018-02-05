import * as React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Switch, Route} from 'react-router';
import {render} from 'react-dom';
import * as qs from 'query-string';
import {I18nextProvider} from 'react-i18next';
import createHistory from 'history/createHashHistory';
import {createStore} from './store';
import {i18n} from './i18n';
import {DashboardContainer} from './containers/dashboard';

const history = createHistory();
const store = createStore(history);

const {locale} = qs.parse(location.hash);

// tslint:disable:jsx-boolean-value
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <I18nextProvider i18n={i18n(locale)}>
        <Switch>
          <Route path='/' component={DashboardContainer}/>
        </Switch>
      </I18nextProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
