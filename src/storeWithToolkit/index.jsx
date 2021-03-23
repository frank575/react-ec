import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { braveSlice } from "@/storeWithToolkit/brave/braveAsyncThunk.slice";

export const store = configureStore({
  reducer: {
    brave: braveSlice.reducer
  }
})

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

