import { createStore } from "redux";


// TODO
const initialState = 0

const INCREASE = 'INCREASE'
const MINUS = 'MINUS'

const counterReducer = (count = initialState, action) => {
  switch (action.type) {
    case INCREASE: {
      return count + 1
    }
    case MINUS: {
      return count - 1
    }
    default:
      return count
  }
}

const store = createStore(counterReducer)

// dispatch({ type: INCREASE })
// dispatch
