import React from 'react'
import ReactDOM from 'react-dom/client'
import CrashHandler from './pages/CrashHandler/index.tsx'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CrashHandler>
      <BrowserRouter>
        <Provider store={store}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </Provider>
      </BrowserRouter>
    </CrashHandler>
  </React.StrictMode>,
)
