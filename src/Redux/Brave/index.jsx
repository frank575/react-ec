import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BraveTypes } from "@/store/Brave/Brave.types";
import { BraveActions } from "@/store/Brave/Brave.actions";
import { ReduxProvider } from "@/store";
import { BraveHelper } from "@/store/Brave/Brave.helper";
import { EBraveJob } from "@/enums/EBraveJob";

const BraveList = () => {
	const dispatch = useDispatch()
	const braveList = useSelector(state => state.brave.list)
	useEffect(() => {
		dispatch(BraveActions.getListSync())
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
						<span>({BraveHelper.jobText[e.job]}) </span>
						<span>
							<img
								style={{ width: 80, height: 80 }}
								src={BraveHelper.jobUrl[e.job]}
								alt=""
							/>
						</span>
					</div>
					<div>
						<button onClick={() => dispatch({ type: BraveTypes.TRANSFER, payload: e })}>
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
					dispatch({ type: BraveTypes.CREATE, payload: getBrave() })
				}
			/>
			<select defaultValue={EBraveJob.C} ref={braveJobRef}>
				{Object.values(EBraveJob).map(e => (
					<option key={e} value={e}>
						{BraveHelper.jobText[e]}
					</option>
				))}
			</select>
			<button
				onClick={() => dispatch(BraveActions.createSync(getBrave()))}
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
		<ReduxProvider>
			<Brave />
		</ReduxProvider>
	)
}
