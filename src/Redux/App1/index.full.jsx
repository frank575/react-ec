import { Provider, useDispatch, useSelector } from 'react-redux'
import { combineReducers, createStore } from "redux";

const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })

const counterReducer = (state = 0, actions) => {
  switch (actions.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state
  }
}

const surprise = () => ({ type: 'SURPRISE' })
const helloReducer = (state = 'hello world', actions) => {
  switch (actions.type) {
    case 'SURPRISE':
      return state + '!'
    default:
      return state
  }
}

const reducers = combineReducers({
  counter: counterReducer,
  hello: helloReducer,
})

const store = createStore(reducers)

const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state.counter)
  return (
    <div>
      <h1>Redux Counter {Math.random()}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span style={{ margin: '0 10px' }}>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  )
}

const Hello = () => {
  const dispatch = useDispatch()
  const hello = useSelector(state => state.hello)
  return (
    <div>
      <h1>redux Hello {Math.random()}</h1>
      <button onClick={() => dispatch(surprise())}>!</button>
      <span style={{ marginLeft: 10 }}>{hello}</span>
    </div>
  )
}

export const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Counter />
        <Hello />
      </Provider>
    </div>
  )
}
