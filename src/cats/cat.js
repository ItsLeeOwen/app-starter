import React from "react"
import PropTypes from "prop-types"
import { connect } from 'react-redux'

class Cat extends React.Component {

  static propTypes = {
    cat: PropTypes.object.isRequired,
    catsSelected: PropTypes.object.isRequired,
    toggleSelection: PropTypes.func.isRequired,
  }

  render() {
    let {
      cat,
      catsSelected,
      toggleSelection,
    } = this.props

    let style = {
      "backgroundImage": `url(${cat.photos[0]})`,
      "opacity": !catsSelected[cat.id]
        ? 0.5
        : 1,
    }

    return (
      <div
        className="as-cat"
        style={style}
        onClick={event => toggleSelection(cat)}>
        {cat.name}
      </div>
    )
  }
}

export default connect(
  state => state, {
    toggleSelection: cat => (dispatch, getState) => {
      let {
        catsSelected,
      } = getState()
      dispatch({
        type: catsSelected.hasOwnProperty(cat.id)
          ? "CAT_DESELECTED"
          : "CAT_SELECTED",
        cat,
      })
    },
  }
)(Cat)