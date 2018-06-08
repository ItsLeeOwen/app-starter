import React from "react"
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import getCats from "cats/getCats"
import Cat from "cats/cat"

class Cats extends React.Component {

  static propTypes = {
    cats: PropTypes.array.isRequired,
    catsLoading: PropTypes.bool.isRequired,
    catsUnselectedHidden: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.getCats()
  }

  render() {
    let {
      cats,
      catsLoading,
      catsSelected,
      catsUnselectedHidden,
    } = this.props

    let spinner = catsLoading
      ? <CircularProgress />
      : undefined


    return (
      <section className="as-cats">
        {!catsLoading &&
          <div className="as-cats__cards">
            {cats.filter(cat => !catsUnselectedHidden || catsSelected[cat.id]).map(cat => <Cat key={cat.id} cat={cat} />)}
          </div>}
        {spinner}
      </section>
    )
  }
}

export default connect(
  state => state, {
    getCats,
  }
)(Cats)