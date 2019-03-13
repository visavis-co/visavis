import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {checkLogin} from './actions/actions';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.dispatch(checkLogin());
console.log('in the store');
export default store;