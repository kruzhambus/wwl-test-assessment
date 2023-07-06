import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import alertsSlice from '../reducers/alerts'
import messageSlice from '../reducers/message'
import { isDevelopment } from '../constants'

const rootReducer = combineReducers({
  alerts: alertsSlice,
  message: messageSlice,
})


export const store = configureStore({
  reducer: rootReducer,
  devTools: isDevelopment,
})


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type StateType = ReturnType<typeof store.getState>
