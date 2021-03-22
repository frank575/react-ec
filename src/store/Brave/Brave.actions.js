import { BraveHelper } from '@/store/Brave/Brave.helper'
import { BraveTypes } from '@/store/Brave/Brave.types'

export const BraveActions = {
	getListSync() {
		return async dispatch => {
			const list = await fetch('http://localhost:3000/brave').then(async res => await res.json())
			dispatch({ type: BraveTypes.SET_LIST, payload: list })
		}
	},

	createSync(brave) {
		return async dispatch => {
			try {
				if (!brave.name) {
					throw new Error('勇者名稱不得為空')
				}
				if (!brave.job) {
					throw new Error('勇者職業不得為空')
				}
				const { id } = await fetch('http://localhost:3000/brave', {
					method: 'POST',
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify(brave)
				}).then(async res => await res.json())

				dispatch({ type: BraveTypes.CREATE, payload: { ...brave, id } })
			} catch (e) {
				return alert(e.message)
			}
		}
	},

	upgradeJob(state, brave = {}) {
		const { list } = state
		const newJob = BraveHelper.checkUpgradeJob(brave.job)
		if (!newJob) {
			alert('轉職已到極限')
			return state
		}
		const equalsBraveId = e => e.id === brave.id
		const braveIndex = list.findIndex(equalsBraveId)
		if (braveIndex === -1) {
			alert('無此用者')
			return state
		}
		return {
			...state,
			list: [
				...list.slice(0, braveIndex),
				{ ...brave, job: newJob },
				...list.slice(braveIndex + 1, list.length),
			],
		}
	},
}
