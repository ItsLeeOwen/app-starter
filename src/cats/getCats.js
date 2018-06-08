export default () => dispatch => {
  dispatch({
    type: "CATS_REQUEST_STARTED",
  })
  fetch("https://catrescue.herokuapp.com/petfinder/stpetersburg", {
    mode: 'cors',
  })
    .then(response => {
      // check for errors and decode json
      if (!response.ok) {
        try {
          return response.json()
            .then(json => Promise.reject(json))
        } catch (err) {
          return Promise.reject({
            "message": response.statusText,
          })
        }
      }
      return response.json()
    })
    .then(cats => {
      // dispatch redux success action
      dispatch({
        type: "CATS_REQUEST_SUCCESS",
        cats,
      })
    })
    .catch(err => {
      // dispatch redux error action
      dispatch({
        type: "CATS_REQUEST_ERROR",
        err,
      })
    })
}