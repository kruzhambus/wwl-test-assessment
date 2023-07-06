/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppearanceTypes } from 'react-toast-notifications'

interface IInitialState {
  message: null | string
  type: AppearanceTypes
}

const initialState: IInitialState = {
  message: null,
  type: 'info',
}

const alertsCreate = (state: IInitialState, { payload }: PayloadAction<{ message: string, type?: AppearanceTypes }>) => {
  state.message = payload.message
  state.type = payload.type || 'info'
}

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlert: alertsCreate,
    clearAlerts: (state) => {
      state.message = null
      state.type = 'info'
    },
  },
})

export const alertsActions = alertsSlice.actions
export default alertsSlice.reducer
