const NotFound = (): JSX.Element =>  (
      <div className='px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 min-h-screen'>
        <div className='max-w-max mx-auto'>
          <main className='sm:flex'>
            <p className='text-4xl font-bold text-gray-200 sm:text-5xl'>
              404
            </p>
            <div className='sm:ml-6'>
              <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
                <h1 className='text-4xl font-extrabold text-gray-50 tracking-tight sm:text-5xl'>
                  Page not found
                </h1>
                <p className='mt-1 whitespace-pre-line text-base text-gray-300'>
                  Please check the URL in the address bar and try again.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
  )

export default NotFound
