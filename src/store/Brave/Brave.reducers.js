import { BraveTypes } from "@/store/Brave/Brave.types";
import { BraveActions } from "@/store/Brave/Brave.actions";

const initialState = {
  list: [],
}
export const BraveReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case BraveTypes.SET_LIST:
      return {
        ...state,
        list: payload,
      }
    case BraveTypes.CREATE:
      return {
        ...state,
        list: [...state.list, payload],
      }
    case BraveTypes.TRANSFER:
      return {
        ...state,
        list: payload,
      }
    default:
      return state
  }
}
