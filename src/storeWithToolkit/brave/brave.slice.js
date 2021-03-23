import { BraveHelper } from "@/storeWithToolkit/brave/helper";
import { createSlice } from "@reduxjs/toolkit";


export const braveSlice = createSlice({
  name: 'brave',
  initialState: {
    list: []
  },
  reducers: {
    setList(state, { payload }) {
      state.list = payload
    },
    createBrave(state, { payload }) {
      state.list.push(payload)
    },
    upgradeJob(state, { payload }) {
      const { list } = state
      const newJob = BraveHelper.checkUpgradeJob(payload.job)
      if (!newJob) {
        return alert('轉職已到極限')
      }
      const equalsBraveId = e => e.id === payload.id
      const braveIndex = list.findIndex(equalsBraveId)
      if (braveIndex === -1) {
        return alert('無此用者')
      }
      state.list[braveIndex].job = newJob
    },
  }
})

const { setList, createBrave, upgradeJob } = braveSlice.actions

const getListSync = () => async dispatch => {
  const list = await fetch('http://localhost:3000/brave').then(
    async res => await res.json(),
  )
  dispatch(setList(list))
}

const createBraveSync = brave => async dispatch => {
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
        'content-type': 'application/json',
      },
      body: JSON.stringify(brave),
    }).then(async res => await res.json())

    dispatch(createBrave({ ...brave, id }))
  } catch (e) {
    return alert(e.message)
  }
}

export const BraveActions = {
  getListSync,
  createBraveSync,
  upgradeJob,
}
