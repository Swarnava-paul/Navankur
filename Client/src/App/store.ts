import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './appSlice'

export const store = configureStore({
  reducer: {
    app : AppReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch