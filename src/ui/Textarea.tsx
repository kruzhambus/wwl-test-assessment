import cx from 'clsx'
import _isEmpty from 'lodash/isEmpty'

interface ITextarea {
  label: string | JSX.Element,
  placeholder?: string,
  id?: string,
  name?: string,
  className?: string,
  register?: any,
  maxLength?: number,
  error?: string,
}

const Textarea = ({
  label, placeholder, id, name, className, maxLength, register, error,
}: ITextarea): JSX.Element => {
  const identifier = id || name || ''
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
        <textarea
          name={name}
          id={identifier}
          data-testid={identifier}
          maxLength={maxLength}
          {...(register && register(identifier, {
            required: `${identifier} is required`,
          }))}
          className={cx('flex w-full resize-none min-h-[110px] py-[12px] px-[20px] items-start gap-[10px] flex-[1_0_0] self-stretch border rounded border-custom-600 text-white bg-custom-bg bo focus:outline-none placeholder:text-custom-400 focus:ring-0', {
            '!border-custom-red !text-custom-red !placeholder-custom-red': isError,
          })}
          placeholder={placeholder}
          aria-describedby={`${identifier}-optional`}
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

Textarea.defaultProps = {
  label: '',
  placeholder: '',
  maxLength: 500,
  id: '',
  className: '',
  name: '',
}

export default Textarea
