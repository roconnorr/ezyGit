import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
// import App from '../old_components/App';
import * as serviceWorker from './serviceWorker';
import { store } from './store/store';
import GitGraphContainer from './components/GitGraph/GitGraphContainer';

ReactDOM.render(
  <Provider store={store}>
    <div>new component</div>
    <GitGraphContainer />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
