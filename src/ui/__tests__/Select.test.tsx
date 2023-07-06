import { render, fireEvent } from '@testing-library/react'
import { expect } from 'chai'
import sinon from 'sinon'
import Select from '../Select'

describe('Select component', () => {
  it('should render select element with correct options', () => {
    const label = 'Select an option'
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]
    const id = 'selectId'
    const className = 'custom-select'
    const register = sinon.spy()
    const onSelect = sinon.spy()

    const { getByTestId, getByLabelText } = render(
      <Select
        label={label}
        options={options}
        id={id}
        className={className}
        register={register}
        onSelect={onSelect}
      />
    )

    const select = getByTestId(id)
    const selectLabel = getByLabelText(label)

    expect(select).to.exist
    expect(select.nodeName).to.equal('SELECT')
    expect(select.childNodes.length).to.equal(options.length)

    options.forEach((option, index) => {
      const selectOption = select.childNodes[index]
      expect(selectOption.nodeName).to.equal('OPTION')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(selectOption.value).to.equal(option.value)
      expect(selectOption.textContent).to.equal(option.label)
    })

    expect(selectLabel).to.exist
  })

  it('should call onSelect when an option is selected', () => {
    const label = 'Select an option'
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]
    const onSelect = sinon.spy()

    const { getByTestId } = render(
      <Select label={label} options={options} onSelect={onSelect} />
    )

    const select = getByTestId('')
    const optionIndex = 1 // Index of the option to select

    fireEvent.change(select, { target: { value: options[optionIndex].value } })

    expect(onSelect.calledWith(options[optionIndex].value)).to.be.true
  })

  it('should display error message when there is an error', () => {
    const label = 'Select an option'
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]
    const id = 'selectId'
    const name = 'selectName'
    const className = 'custom-select'
    const register = sinon.spy()
    const error = 'Please select an option'

    const { getByText } = render(
      <Select
        label={label}
        options={options}
        id={id}
        name={name}
        className={className}
        register={register}
        error={error}
      />
    )

    const errorMessage = getByText(error)

    expect(errorMessage).to.exist
  })

})
