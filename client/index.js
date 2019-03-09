import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/reducer'
import App from './containers/App'
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
  // other store enhancers if any
));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('home')
)
