/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPushMessage } from 'src/models/IPushMessage'

interface IInitialState {
  message: null | IPushMessage[]
}

const initialState: IInitialState = {
  message: null,
}

const setMessage = (state: IInitialState, { payload }: PayloadAction<{ message: IPushMessage[] }>) => {
  state.message = payload.message
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage,
  },
})

export const messageActions = messageSlice.actions
export default messageSlice.reducer
