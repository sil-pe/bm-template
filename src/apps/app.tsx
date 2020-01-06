import createHistory from 'history/createHashHistory';
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Localized} from 'src/containers/localized/Localized';
import {DashboardContainer} from '../containers/dashboard';
import {createStore} from '../store';

const history = createHistory();
const store = createStore(history);

render(
  <Provider store={store}>
    <Localized>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={DashboardContainer} />
        </Switch>
      </BrowserRouter>
    </Localized>
  </Provider>,
  document.getElementById('root')
);
