import { connect } from 'react-redux'
import { alertsActions } from 'src/redux/reducers/alerts'
import { messageActions } from 'src/redux/reducers/message'
import { IPushMessage } from 'src/models/IPushMessage'
import { StateType, AppDispatch } from 'src/redux/store'
import MessageSettings from './MessageSettings'
import { AppearanceTypes } from 'react-toast-notifications'

const mapStateToProps = (state: StateType) => ({
  messages: state.message.message,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setAlert: (message: string, type: AppearanceTypes) => {
    dispatch(alertsActions.setAlert({
      message,
      type,
    }))
  },
  setMessage: (message: IPushMessage[]) => {
    dispatch(messageActions.setMessage({
      message,
    }))
  }
})

const container = connect(mapStateToProps, mapDispatchToProps)(MessageSettings)

export default container
