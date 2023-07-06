import { render, fireEvent } from '@testing-library/react'
import { expect } from 'chai'
import chaiDom from 'chai-dom'
import sinon from 'sinon'
import Button from '../Button'

chai.use(chaiDom)

describe('Button component', () => {
  it('renders button text correctly', () => {
    const buttonText = 'Click me'
    const { getByText } = render(<Button text={buttonText} />)
    const buttonElement = getByText(buttonText)
    expect(buttonElement).to.exist
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = sinon.stub()
    const { getByText } = render(<Button text="Click me" onClick={handleClick} />)
    const buttonElement = getByText('Click me')
    fireEvent.click(buttonElement)
    expect(handleClick.calledOnce).to.be.true
  })

  it('applies danger styles when danger prop is true', () => {
    const { container } = render(<Button text="Danger" danger />)
    const buttonElement = container.firstChild
    if (buttonElement) {
      expect(buttonElement).to.have.class('bg-custom-red')
      expect(buttonElement).to.have.class('text-white')
    }
  })

  it('applies semiDanger styles when semiDanger prop is true', () => {
    const { container } = render(<Button text="Semi Danger" semiDanger />)
    const buttonElement = container.firstChild
    if (buttonElement) {
      expect(buttonElement).to.have.class('border-custom-red')
      expect(buttonElement).to.have.class('border')
      expect(buttonElement).to.have.class('text-custom-red')
      expect(buttonElement).to.have.class('bg-transparent')
    }
  })

  it('does not apply border styles when noBorder prop is true', () => {
    const { container } = render(<Button text="No Border" noBorder />)
    const buttonElement = container.firstChild
    if (buttonElement) {
      expect(buttonElement).to.have.class('focus:border-none')
      expect(buttonElement).to.have.class('!border-none')
      expect(buttonElement).to.have.class('focus:ring-0')
      expect(buttonElement).to.have.class('focus:ring-offset-0')
    }
  })
})
