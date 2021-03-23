import { createStore } from "redux";

const initialState = 0

const INCREASE = 'INCREASE'
const MINUS = 'MINUS'
const SET = 'SET'

const increase = () => {
  return { type: INCREASE, payload: 1 }
}
const minus = () => {
  return { type: INCREASE, payload: -1 }
}
const fetchCount = () => {
  return dispatch => {
    return new Promise(res => {
      setTimeout(() => {
        dispatch({ type: SET, payload: 100 })
        res(10)
      }, 1000)
    })
  }
}

const counterReducer = (count = initialState, action) => {
  switch (action.type) {
    case INCREASE: {
      return count + action.payload
    }
    case MINUS: {
      return count + action.payload
    }
    case SET: {
      return action.payload
    }
    default:
      return count
  }
}

export const store = createStore(counterReducer)

export const CounterActions = {
  increase,
  minus,
  fetchCount,
}
