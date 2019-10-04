import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App';
import * as serviceWorker from './serviceWorker';

import reducer from './reducers';

// const middleware = [];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }

const store = createStore(
  reducer
  // applyMiddleware(...middleware)
)

// TODO: Change this to get git log
// store.dispatch(getAllProducts())


ReactDOM.render(<Provider store={store}><App /></Provider >, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
