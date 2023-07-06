import cx from 'clsx'

interface IButton {
  text?: string,
  children?: JSX.Element | string,
  onClick?: () => void,
  primary?: boolean,
  danger?: boolean,
  regular?: boolean,
  large?: boolean,
  type?: 'button' | 'submit' | 'reset',
  className?: string,
  semiDanger?: boolean,
  noBorder?: boolean
}

const Button = ({
  text, children, danger, onClick, type, className, semiDanger, noBorder,
}: IButton): JSX.Element => (
  <button
    type={type}
    onClick={onClick}
    className={cx('flex py-[12px] px-[24px] items-center gap-[20px] rounded-lg', {
      'bg-custom-red text-white': danger,
      'border-custom-red border text-custom-red bg-transparent': semiDanger,
      'focus:border-none !border-none focus:ring-0 focus:ring-offset-0': noBorder,
    }, className)}
  >
    {text || children}
  </button>
)

Button.defaultProps = {
  text: '',
  children: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
  danger: false,
  type: 'button',
  className: '',
  semiDanger: false,
  noBorder: false,
}

export default Button
