import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './containers/App.jsx'
import store from './store'

// Styles: css, bootstrap
import './assets/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social';

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);


render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('home')
)
