import { BraveReducers } from '@/store/Brave/Brave.reducers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const reducers = combineReducers({
	brave: BraveReducers,
})

const store = createStore(reducers, applyMiddleware(thunk))

export const ReduxProvider = ({ children }) => {
	return <Provider store={store}>{children}</Provider>
}
