import { useMemo, useReducer } from "react";
import { createContext, useContextSelector } from "use-context-selector";

const context = createContext(null)

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

const CounterMinusBtn = () => {
  const dispatch = useContextSelector(context, e => e.dispatch)
  console.log('CounterMinusBtn')
  return useMemo(
    () => <button onClick={() => dispatch({ type: MINUS })}>-</button>,
    [],
  )
}

const CounterIncreaseBtn = () => {
  const dispatch = useContextSelector(context, e => e.dispatch)
  console.log('CounterIncreaseBtn')
  return useMemo(
    () => <button onClick={() => dispatch({ type: INCREASE })}>+</button>,
    [],
  )
}

const CounterCount = () => {
  const count = useContextSelector(context, e => e.state.count)
  console.log('CounterCount')
  return <span style={{ margin: '0 10px' }}>{count}</span>
}

const RandomText = () => {
  return <h3>{Math.random()}</h3>
}

const CounterProvider = ({children}) => {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  )
}


const Counter = () => {
  console.log('Counter')
  return (
    <div>
      <h1>Context Counter</h1>
      <CounterMinusBtn />
      <CounterCount />
      <CounterIncreaseBtn />
      <RandomText />
    </div>
  )
}

export const App = () => {
  return (
    <div className="App">
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </div>
  )
}
