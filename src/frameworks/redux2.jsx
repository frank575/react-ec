import { applyMiddleware, combineReducers, createStore } from 'redux'
import { useDispatch as useReactReduxDispatch } from 'react-redux'
import thunk from 'redux-thunk'
import { useCallback } from 'react'

// dispatch(increase())
// dispatch(fetchCount())
// dispatch

// const increase = state => state + 1
// const fetchCountSync = async state => await .... return 10
// const reducer = createReducer(state, { increase(state, payload) {}, async fetchCountSync(state, payload) {} })
// dispatch(increase())
// dispatch(fetchCount())

/**
 * TODO ???
 * @template T, A
 * @param {string} reducerName
 * @param {T} initialState
 * @param {A} actions
 * @returns {{name: string, reducer: function(state: T, action: { payload: T }): T, actions: A}}
 */
const createReducer = (reducerName, initialState = null, actions = {}) => {
	const newActions = Object.entries(actions).reduce((p, [k, fun]) => {
		if (k.substr(-4) === 'Sync') {
			p[k] = payload => async (dispatch, getState) => {
				const rootState = getState()
				const _payload = await fun(
					{ state: rootState[reducerName], rootState },
					payload,
				)
				dispatch({ type: reducerName, payload: _payload })
			}
		} else {
			p[k] = payload => (dispatch, getState) => {
				const rootState = getState()
				return dispatch({
					type: reducerName,
					payload: fun({ state: rootState[reducerName], rootState }, payload),
				})
			}
		}
		return p
	}, {})
	return {
		name: reducerName,
		actions: newActions,
		reducer: (state = initialState, { payload }) => payload || initialState,
	}
}

const counterReducer = createReducer('count', 0, {
	async increaseSync({ state }) {
		const sum = await new Promise(res =>
			setTimeout(() => {
				res(10)
			}, 1000),
		)
		return state + sum
	},
	minus({ state }) {
		return state - 1
	},
})

const textReducer = createReducer('text', 'hello world!', {
	increase({ state }) {
		return state + '!'
	},
})

const reducers = combineReducers({
	[textReducer.name]: textReducer.reducer,
	[counterReducer.name]: counterReducer.reducer,
})
export const store = createStore(reducers, applyMiddleware(thunk))
export const counterActions = counterReducer.actions
