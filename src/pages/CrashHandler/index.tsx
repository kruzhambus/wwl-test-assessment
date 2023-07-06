import React from 'react'
import _toString from 'lodash/toString'

interface CrashHandlerProps {
  children: JSX.Element
}

interface CrashHandlerState {
  appCrashed: boolean
  crashStack: string
  errorMessage: string
  crashStackShown: boolean
}

class CrashHandler extends React.Component<CrashHandlerProps, CrashHandlerState> {
  constructor(props: CrashHandlerProps) {
    super(props)
    this.state = {
      appCrashed: false,
      crashStack: '',
      errorMessage: '',
      crashStackShown: false,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return {
      errorMessage: _toString(error),
      crashStack: error?.stack,
      appCrashed: true,
    }
  }

  onCrashStackClick = () => {
    this.setState((prevState) => ({
      crashStackShown: !prevState.crashStackShown,
    }))
  }

  render() {
    const {
      appCrashed, crashStack, errorMessage, crashStackShown,
    } = this.state
    const { children } = this.props

    if (appCrashed) {
      return (
        <div style={{ minHeight: '100vh' }} className='pt-16 pb-12 flex flex-col'>
          <div className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='py-8'>
              <div className='text-center'>
                <h1 className='text-4xl font-extrabold text-gray-50 tracking-tight sm:text-5xl'>Uh-oh..</h1>
                <p className='mt-2 text-base font-medium text-gray-300'>
                  The app has crashed :(
                  {' '}
                </p>
                <p className='mt-6 text-base font-medium text-gray-300'>
                  {errorMessage}
                  <br />
                  <span onClick={this.onCrashStackClick} className='flex justify-center items-center text-base text-gray-300 cursor-pointer hover:underline'>
                    {crashStackShown ? (
                      <>
                        Hide crash stack
                      </>
                    ) : (
                      <>
                        Show crash stack
                      </>
                    )}
                  </span>
                  {crashStackShown && (
                    <span className='text-sm text-gray-400 whitespace-pre-line'>
                      {crashStack}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return children
  }
}

export default CrashHandler