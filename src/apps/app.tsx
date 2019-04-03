import { createHashHistory } from 'history';
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import {Localized} from 'src/containers/localized/Localized';
import {DashboardContainer} from '../containers/dashboard';
import {TableContainer} from '../containers/table'
import {createStore} from '../store';

const history = createHashHistory();
const store = createStore(history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Localized>
        <Switch>
          <Route path='/' component={DashboardContainer} exact={true} />
          <Route path='/table' component={TableContainer} />
        </Switch>
      </Localized>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
