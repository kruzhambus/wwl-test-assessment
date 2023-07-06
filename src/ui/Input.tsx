import React from 'react'
import cx from 'clsx'
import _isEmpty from 'lodash/isEmpty'

interface IInput {
  label: string | JSX.Element,
  placeholder?: string,
  type?: string,
  id?: string,
  name?: string,
  className?: string,
  register?: any,
  error?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Input = ({
  label, placeholder, type, id, name, className, register, onChange, error,
}: IInput): JSX.Element => {
  const identifier = id || name || type || ''
  const isError = !_isEmpty(register?.errors?.[identifier]) || !_isEmpty(error)

  return (
    <div className={className}>
      <div
        className={cx({
          'flex justify-between': label,
        })}
      >
        <label htmlFor={identifier} className='flex text-white'>
          {label}
        </label>
      </div>
      <div className='mt-2'>
        <input
          type={type}
          name={name}
          id={identifier}
          data-testid={identifier}
          onChange={onChange}
          className={cx('w-full flex h-[46px] py-[12px] px-[20px] items-start gap-[10px] flex-[1_0_0] self-stretch border rounded text-white bg-custom-bg border-custom-600 focus:outline-none placeholder:text-custom-400 focus:ring-0', {
            '!border-custom-red !text-custom-red !placeholder-custom-red': isError,
          })}
          placeholder={placeholder}
          aria-describedby={`${identifier}-optional`}
          {...(register && register(identifier, {
            required: `${identifier} is required`,
          }))}
        />
      </div>
      {isError && (
        <p className='mt-1 text-sm text-custom-red' id='error'>
          {register?.errors?.[identifier]?.message || error}
        </p>
      )}
    </div>
  )
}

Input.defaultProps = {
  value: null,
  label: '',
  placeholder: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  id: '',
  type: '',
  className: '',
  error: null,
  name: '',
}

export default Input
