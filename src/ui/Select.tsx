import cx from 'clsx'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import SelectIcon from 'src/assets/SelectIcon.svg'
import './Select.css'

interface ISelect {
  label: string | JSX.Element;
  options: Array<{ value: string | number, label: string | JSX.Element }>;
  id?: string;
  name?: string;
  className?: string;
  register?: any;
  onSelect?: (value: string | number) => void;
  error?: string;
}

const Select = ({
  label, options, id, name, className, register, onSelect, error,
}: ISelect): JSX.Element => {
  const identifier = id || name || '';
  const isError = !_isEmpty(register?.errors?.[identifier]) || !_isEmpty(error);

  return (
    <div className={className}>
      <div
        className={cx({
          'flex justify-between': label,
        })}
      >
        <label htmlFor={identifier} className='flex text-white w-max'>
          {label}
        </label>
      </div>
      <div className='mt-2'>
        <div className='relative'>
          <select
            name={name}
            id={identifier}
            data-testid={identifier}
            onChange={(e) => {
              if (onSelect) {
                onSelect(e.target.value)
              }
            }}
            {...(register && register(identifier, {
              required: `${identifier} is required`,
            }))}
            className={cx('flex w-full h-[46px] py-[12px] px-[20px] items-start gap-[10px] flex-[1_0_0] self-stretch border rounded text-white bg-custom-bg border-custom-600 focus:outline-none placeholder:text-custom-400 focus:ring-0 cursor-pointer', {
              '!border-custom-red !text-custom-red !placeholder-custom-red': isError,
            })}
            aria-describedby={`${identifier}-optional`}
          >
            {_map(options, option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <img src={SelectIcon} alt="Dropdown Icon" />
          </div>
        </div>
      </div>
      {isError && (
        <p className='mt-1 text-sm text-custom-red' id='error'>
          {register?.errors?.[identifier]?.message || error}
        </p>
      )}
    </div>
  );
};

Select.defaultProps = {
  value: null,
  label: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  id: '',
  className: '',
  name: '',
};

export default Select
