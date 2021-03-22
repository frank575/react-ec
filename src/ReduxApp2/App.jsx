import { Provider, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import { BraveCore } from '@/ReduxApp2/core'
import { useEffect, useRef } from 'react'

const initialState = {
	braveList: [],
}

const SET_LIST = 'SET_LIST'
const TRANSFER = 'TRANSFER'
const CREATE = 'CREATE'

// actions start
const getBraveList = () => {
	return async dispatch => {
		const braveList = await BraveCore.getList()
		dispatch({ type: SET_LIST, payload: braveList })
	}
}

const createBraveSync = (brave) => {
	return async dispatch => {
		try {
			const res = await BraveCore.create(brave)
			dispatch({ type: CREATE, payload: { ...brave, id: res.id } })
		} catch (e) {
			return alert(e.message)
		}
	}
}

const setList = (state, braveList) => {
	return {
		...state,
		braveList,
	}
}

const createBrave = (state, brave = {}) => {
	const { braveList } = state
	return {
		...state,
		braveList: [...braveList, brave],
	}
}

const upgradeJob = (state, brave = {}) => {
	const { braveList } = state
	const newJob = BraveCore.upgradeJob(brave.job)
	if (!newJob) {
		alert('轉職已到極限')
		return state
	}
	const equalsBraveId = e => e.id === brave.id
	const braveIndex = braveList.findIndex(equalsBraveId)
	if (braveIndex === -1) {
		alert('無此用者')
		return state
	}
	return {
		...state,
		braveList: [
			...braveList.slice(0, braveIndex),
			{ ...brave, job: newJob },
			...braveList.slice(braveIndex + 1, braveList.length),
		],
	}
}
// actions end

// reducer start
const braveReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_LIST:
			return setList(state, payload)
		case CREATE:
			return createBrave(state, payload)
		case TRANSFER:
			return upgradeJob(state, payload)
		default:
			return state
	}
}
// reducer end

const store = createStore(braveReducer, applyMiddleware(thunk))

// view start
const BraveList = () => {
	const dispatch = useDispatch()
	const braveList = useSelector(state => state.braveList)
	useEffect(() => {
		dispatch(getBraveList())
	}, [])
	return (
		<ul>
			{braveList.map(e => (
				<li key={e.id}>
					<div>
						<span>ID：</span>
						<span>{e.id}</span>
					</div>
					<div>
						<span>名字：</span>
						<span>{e.name}</span>
					</div>
					<div>
						<span>職業：</span>
						<span>({BraveCore.jobText[e.job]}) </span>
						<span>
							<img
								style={{ width: 80, height: 80 }}
								src={BraveCore.jobUrl[e.job]}
								alt=""
							/>
						</span>
					</div>
					<div>
						<button onClick={() => dispatch({ type: TRANSFER, payload: e })}>
							升階
						</button>
						{/*<button onClick={() => dispatch({ type: TRANSFER, payload: e })}>*/}
						{/*	轉職*/}
						{/*</button>*/}
						{/*<button onClick={() => dispatch({ type: TRANSFER, payload: e })}>*/}
						{/*	刪除*/}
						{/*</button>*/}
					</div>
					<hr />
				</li>
			))}
		</ul>
	)
}

const BravePanel = () => {
	const dispatch = useDispatch()
	const braveNameRef = useRef(null)
	const braveJobRef = useRef(null)
	const getBrave = () => {
		const name = braveNameRef.current.value
		const job = +braveJobRef.current.value
		braveNameRef.current.value = ''
		braveNameRef.current.focus()
		return {
			name: name,
			job: job,
		}
	}
	useEffect(() => {
		braveNameRef.current.focus()
	}, [])

	return (
		<div>
			<span>創建勇者：</span>
			<input
				type="text"
				ref={braveNameRef}
				onKeyDown={ev =>
					ev.key === 'Enter' &&
					dispatch({ type: CREATE, payload: getBrave() })
				}
			/>
			<select defaultValue={BraveCore.EJob.C} ref={braveJobRef}>
				{Object.values(BraveCore.EJob).map(e => (
					<option key={e} value={e}>
						{BraveCore.jobText[e]}
					</option>
				))}
			</select>
			<button
				onClick={() => dispatch(createBraveSync(getBrave()))}
			>
				創建
			</button>
		</div>
	)
}

const Brave = () => {
	return (
		<div>
			<h1>Brave</h1>
			<BravePanel />
			<BraveList />
		</div>
	)
}

export const App = () => {
	return (
		<Provider store={store}>
			<Brave />
		</Provider>
	)
}
// view end
