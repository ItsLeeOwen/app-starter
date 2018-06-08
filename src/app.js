import React from "react"
import {
  Link,
  Route,
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import Cats from "./cats"

class App extends React.Component {

  render() {
    let {
      catsUnselectedHidden,
      toggleHideUnselectedCats,
    } = this.props

    return (
      <div className="as-appstarter">
        <CssBaseline />
        <nav>
          <div>
            <Link to="/">App Starter</Link>
            <span> - </span>
            <Link to="/cats">Cats</Link>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={event => toggleHideUnselectedCats(!catsUnselectedHidden)}>
              {catsUnselectedHidden
                ? "Show Unselected Cats"
                : "Hide Unselected Cats"}
            </Button>
          </div>
        </nav>

        <Route
          path="/cats"
          component={Cats} />
      </div>
    )
  }
}

export default withRouter(connect(
  state => state, {
    toggleHideUnselectedCats: catsUnselectedHidden => dispatch => {
      dispatch({
        type: "CATS_HIDE_UNSELECTED",
        catsUnselectedHidden,
      })
    },
  }
)(App))