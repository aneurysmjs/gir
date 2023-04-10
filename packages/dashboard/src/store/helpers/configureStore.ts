import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from '@redux-devtools/extension';

import middlewares from '@/store/middlewares';

import { apiReducer as api } from './reducers';

export const rootReducer = combineReducers({
  api,
});

export default function configureStore() {
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
