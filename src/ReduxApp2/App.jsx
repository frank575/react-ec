import { Provider, useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux'
import { useMemo } from 'react'

const INCREASE = 'INCREASE'
const MINUS = 'MINUS'

const initialState = {
	count: 0,
}

const counterReducer = (state = initialState, action) => {
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

const store = createStore(counterReducer)

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
		() => <button onClick={() => dispatch({ type: MINUS })}>-</button>,
		[],
	)
}

const CounterIncreaseBtn = () => {
	const dispatch = useDispatch()
	console.log('CounterIncreaseBtn')
	return useMemo(
		() => <button onClick={() => dispatch({ type: INCREASE })}>+</button>,
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
