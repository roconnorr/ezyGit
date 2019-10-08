import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducers } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducers, {},
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
