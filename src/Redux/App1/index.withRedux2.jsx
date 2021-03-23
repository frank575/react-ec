import { Provider, useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { counterActions, store } from "@/frameworks/redux2";

const CounterProvider = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

const CounterMinusBtn = () => {
  const dispatch = useDispatch()
  console.log('CounterMinusBtn')
  return useMemo(
    () => <button onClick={() => console.log(dispatch(counterActions.minus()))}>-</button>,
    [],
  )
}

const CounterIncreaseBtn = () => {
  const dispatch = useDispatch()
  console.log('CounterIncreaseBtn')
  return useMemo(
    () => <button onClick={() => console.log(dispatch(counterActions.increaseSync()))}>+</button>,
    [],
  )
}

const CounterCount = () => {
  const count = useSelector(state => state.count)
  console.log('CounterCount')
  return <span style={{ margin: '0 10px' }}>{count}</span>
}

const Counter = () => {
  console.log('Counter')
  return (
    <div>
      <h1>Redux Counter</h1>
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
