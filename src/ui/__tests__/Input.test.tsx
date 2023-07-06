/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, fireEvent, getByTestId } from '@testing-library/react'
import { expect } from 'chai'
import chaiDom from 'chai-dom'
import sinon from 'sinon'
import Input from '../Input'

chai.use(chaiDom)

describe('Input component', () => {
  it('renders input text correctly', () => {
    const { getByText } = render(<Input label="Input text" />)
    const inputElement = getByText('Input text')
    expect(inputElement).to.exist
  })

  it('calls onChange handler when changed', () => {
    const handleChange = sinon.stub()
    const { getByTestId } = render(<Input label="Input text" id='123' onChange={handleChange} />)
    const inputElement = getByTestId('123')
    fireEvent.change(inputElement, { target: { value: 'test' } })
    expect(handleChange.calledOnce).to.be.true
  })

  it('should render input element with correct props', () => {
    const label = 'Username'
    const placeholder = 'Enter your username'
    const type = 'text'
    const id = 'username'
    const name = 'username'
    const className = 'custom-input'
    const onChange = sinon.spy()
    const register = sinon.spy()
    const error = 'Username is required'

    const { getByTestId, container } = render(
      <Input
        label={label}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        className={className}
        onChange={onChange}
        register={register}
        error={error}
      />
    )

    const input = getByTestId(id)
    const wrapperDiv = container.querySelector('.custom-input')

    expect(input).to.exist
    // @ts-ignore
    expect(input.type).to.equal(type)
    // @ts-ignore
    expect(input.name).to.equal(name)
    // @ts-ignore
    expect(input.placeholder).to.equal(placeholder)
    expect(wrapperDiv).to.exist

    expect(register.calledWith(id, { required: `${id} is required` })).to.be.true
  })

  it('should display error message when there is an error', () => {
    const label = 'Username'
    const error = 'Username is required'

    const { getByText } = render(<Input label={label} error={error} />)

    const errorMessage = getByText(error)

    expect(errorMessage).to.exist
  })
})
