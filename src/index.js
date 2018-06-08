import './index.scss'

import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'

import App from "app"
import store from "store"

ReactDOM.render((
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
), document.querySelector("#app-starter"))
