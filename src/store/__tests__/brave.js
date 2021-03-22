import { createStore } from "redux";
import { BraveTypes } from "@/store/Brave/Brave.types";
import { BraveReducers } from "@/store/Brave/Brave.reducers";

test("[Brave] dispatch Create", () => {
  const store = createStore(BraveReducers)
  const brave = {
    id: 9,
    name: 'frank',
    job: 1,
  }
  store.dispatch({
    type: BraveTypes.CREATE,
    payload: brave,
  })
  const braveList = store.getState().list
  expect(braveList.length).toBe(1)
  expect(JSON.stringify(braveList[0])).toBe(JSON.stringify(brave))
})
