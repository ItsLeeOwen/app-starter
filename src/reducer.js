const DEFAULT_STATE = {
  cats: [],
  catsLoading: true,
  catsSelected: {},
  catsUnselectedHidden: false,
}

export default function reducers(state = {
  ...DEFAULT_STATE,
}, action) {

  switch (action.type) {
    case "CATS_HIDE_UNSELECTED":
      return {
        ...state,
        catsUnselectedHidden: action.catsUnselectedHidden,
      }
    case "CATS_REQUEST_STARTED":
      return {
        ...state,
        cats: [],
        catsLoading: true,
      }
    case "CATS_REQUEST_ERROR":
      return {
        ...state,
        catsErr: action.err,
        catsLoading: false,
      }
    case "CATS_REQUEST_SUCCESS":
      return {
        ...state,
        cats: action.cats,
        catsLoading: false,
      }
    case "CAT_SELECTED":
      return {
        ...state,
        catsSelected: {
          ...state.catsSelected,
          [action.cat.id]: action.cat,
        }
      }
    case "CAT_DESELECTED":
      delete state.catsSelected[action.cat.id]
      return {
        ...state,
        catsSelected: {
          ...state.catsSelected,
        }
      }
  }
  return state
}