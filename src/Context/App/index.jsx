import { useMemo, createContext, useContext, useReducer } from "react";

const INCREASE = 'INCREASE'
const MINUS = 'MINUS'

const initialState = {
  count: 0,
}

const counterReducer = (state , action) => {
  switch (action.type) {
    case INCREASE: {
      return {
        count: state.count + 1,
      }
    }
    case MINUS: {
      return {
        count: state.count - 1,
      }
    }
    default:
      return state
  }
}


const Context = createContext(null)

const CounterProvider = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Counter />
    </Context.Provider>
  )
}

const CounterMinusBtn = () => {
  const { dispatch } = useContext(Context)
  console.log('CounterMinusBtn')
  return useMemo(
    () => <button onClick={() => dispatch({ type: MINUS })}>-</button>,
    [],
  )
}

const CounterIncreaseBtn = () => {
  const { dispatch } = useContext(Context)
  console.log('CounterIncreaseBtn')
  return useMemo(
    () => <button onClick={() => dispatch({ type: INCREASE })}>+</button>,
    [],
  )
}

const CounterCount = () => {
  const { state } = useContext(Context)
  const { count } = state
  console.log('CounterCount')
  return <span style={{ margin: '0 10px' }}>{count}</span>
}

const Counter = () => {
  console.log('Counter')
  return (
    <div>
      <h1>Context Counter</h1>
      <CounterMinusBtn />
      <CounterCount />
      <CounterIncreaseBtn />
    </div>
  )
}

export const App = () => {
  return (
    <div className="App">
      <CounterProvider />
    </div>
  )
}
