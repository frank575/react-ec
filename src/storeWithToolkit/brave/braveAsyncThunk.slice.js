import { BraveHelper } from "@/storeWithToolkit/brave/helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getListSync = createAsyncThunk(
  'brave/getListSync',
  async (_) => {
    return await fetch('http://localhost:3000/brave').then(
      async res => await res.json(),
    )
  }
)

const createBraveSync = createAsyncThunk(
  'brave/createBraveSync',
  async (brave) => {
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
      return { ...brave, id }
    } catch (e) {
      alert(e.message)
      return false
    }
  }
)

export const braveSlice = createSlice({
  name: 'brave',
  initialState: {
    list: []
  },
  reducers: {
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
  },
  extraReducers: {
    [getListSync.fulfilled](state, { payload }) {
      state.list = payload
    },
    [createBraveSync.fulfilled](state, { payload }) {
      if (payload) {
        state.list = [...state.list, payload]
      }
    }
  }
})

const { upgradeJob } = braveSlice.actions

export const BraveActions = {
  getListSync,
  createBraveSync,
  upgradeJob,
}
