import { Suspense, lazy, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import { alertsActions } from './redux/reducers/alerts'
import { StateType, useAppDispatch } from './redux/store'
import routes from './routes'
import './App.css'

const NotFound = lazy(() => import('./pages/NotFound'))
const MessageSettings = lazy(() => import('./pages/Message/Settings'))
const MessageView = lazy(() => import('./pages/Message/View'))

function App() {
  const toast = useToasts()
  const dispatch = useAppDispatch()
  const { message, type } = useSelector((state: StateType) => state.alerts)

  useEffect(() => {
    if (message && type) {
      toast.addToast(message, {
        appearance: type || 'info',
        autoDismiss: true,
        autoDismissTimeout: 3000,
        onclose: () => {
          dispatch(alertsActions.clearAlerts())
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return (
    <Suspense fallback={<></>}>
      <div className='liner-gradient-background'>
        <Switch>
          <div className='flex'>
            <Sidebar />
            <div className='mt-8 bg-custom-700 w-full mr-8'>
              <Route path={routes.message_create} exact>
                <MessageSettings />
              </Route>
              <Route path={routes.message_settings} exact>
                <MessageSettings />
              </Route>
              <Route path={routes.home} exact>
                <MessageView />
              </Route>
            </div>
          </div>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Suspense>
  )
}

export default App
