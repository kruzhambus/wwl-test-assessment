import { connect } from 'react-redux'
import { StateType } from 'src/redux/store'
import MessageView from './MessageView'

const mapStateToProps = (state: StateType) => ({
  messages: state.message.message,
})

const container = connect(mapStateToProps, null)(MessageView)

export default container
