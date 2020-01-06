import {History} from 'history';
import {routerMiddleware} from 'react-router-redux';
import {createStore as initialCreateStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';

import {initialApplicationState} from './constants';
import * as AppReducer from './reducer';
import rootSaga from './sagas';

/**
 * allows usage of ReduxDevTools only in dev environment, not in production
 * @see https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm */ // tslint:disable-line:max-line-length
const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});


/**
 * Create the redux store
 */
export const createStore = (history: History) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = initialCreateStore(
    AppReducer.combineAppReducer,
    initialApplicationState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
      )
    )
);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const appReducer = require('./reducer') as typeof AppReducer;
      store.replaceReducer(appReducer.combineAppReducer);
    });
  }
  sagaMiddleware.run(rootSaga);
  return store;
};
