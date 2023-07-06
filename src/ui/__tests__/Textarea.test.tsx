/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render } from '@testing-library/react'
import { expect } from 'chai'
import sinon from 'sinon'
import Textarea from '../Textarea'

describe('Textarea component', () => {
  it('should render textarea element with correct props', () => {
    const label = 'Description'
    const placeholder = 'Enter your description'
    const id = 'description'
    const name = 'description'
    const className = 'custom-textarea'
    const maxLength = 200
    const register = sinon.spy()
    const error = 'Description is required'

    const { getByTestId } = render(
      <Textarea
        label={label}
        placeholder={placeholder}
        id={id}
        name={name}
        className={className}
        maxLength={maxLength}
        register={register}
        error={error}
      />
    )

    const textarea = getByTestId(id)

    expect(textarea).to.exist
    expect(textarea.nodeName).to.equal('TEXTAREA')
    // @ts-ignore
    expect(textarea.name).to.equal(name)
    expect(textarea.id).to.equal(id)
    // @ts-ignore
    expect(textarea.placeholder).to.equal(placeholder)
    // @ts-ignore
    expect(textarea.maxLength).to.equal(maxLength)

    expect(register.calledWith(name, { required: `${name} is required` })).to.be.true
  })

  it('should call register with correct validation options', () => {
    const label = 'Description'
    const name = 'description'
    const register = sinon.spy()

    render(
      <Textarea
        label={label}
        name={name}
        register={register}
      />
    )

    expect(register.calledWith(name, { required: `${name} is required` })).to.be.true
  })

  it('should display error message when there is an error', () => {
    const label = 'Description'
    const error = 'Description is required'

    const { getByText } = render(<Textarea label={label} error={error} />)

    const errorMessage = getByText(error)

    expect(errorMessage).to.exist
  })
})
