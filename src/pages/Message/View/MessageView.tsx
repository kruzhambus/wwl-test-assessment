import { IPushMessage } from 'src/models/IPushMessage'
import Button from 'src/ui/Button'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import { useHistory } from 'react-router-dom'
import routes from 'src/routes'
import _replace from 'lodash/replace'

interface IProps {
  messages: IPushMessage[] | null
}


const MessageView = ({ messages }: IProps) => {
  const history = useHistory()

  return (
    <div className='px-[20px] py-[12px]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-white'>Message</h1>
        <Button
          className='bg-custom-500 hover:bg-custom-600'
          onClick={() => {
            history.push(routes.message_create)
          }}
        >
          Create
        </Button>
      </div>
      {!_isEmpty(messages) ? (
        <table className='w-full mt-4'>
          <thead>
            <tr>
              <th className='text-left text-white'>Title</th>
              <th className='text-left text-white'>Message</th>
              <th className='text-left text-white'>Тип рассылки</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {_map(messages, (item, index) => (
              <tr key={index}>
                <td className='text-white'>{item.title}</td>
                <td className='text-white'>{item.name}</td>
                <td className='text-white'>{item.typeMessage}</td>
                <td className='text-right'>
                  <Button
                    className='bg-custom-500 hover:bg-custom-600'
                    onClick={() => {
                      history.push(_replace(routes.message_settings, ':id', item.id))
                    }}
                  >
                    Settings
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='text-white flex justify-center'>No messages</div>
      )}
    </div>
  )
}

export default MessageView