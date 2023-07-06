import { render, fireEvent } from '@testing-library/react'
import { expect } from 'chai'
import sinon from 'sinon'
import MultiSelect from '../MultiSelect'

describe('MultiSelect component', () => {
  it('should render selected labels correctly', () => {
    const label = ['Label 1', 'Label 2']
    const items = ['Option 1', 'Option 2', 'Option 3']
    const onRemove = sinon.spy()
    const onSelect = sinon.spy()

    const { getByText } = render(
      <MultiSelect
        label={label}
        items={items}
        onRemove={onRemove}
        onSelect={onSelect}
      />
    )

    label.forEach((labelText) => {
      const labelElement = getByText(labelText)
      expect(labelElement).to.exist
    })
  })

  it('should call onRemove when clicking remove button', () => {
    const label = ['Label 1', 'Label 2']
    const items = ['Option 1', 'Option 2', 'Option 3']
    const onRemove = sinon.spy()
    const onSelect = sinon.spy()

    const { getByTestId } = render(
      <MultiSelect
        label={label}
        items={items}
        onRemove={onRemove}
        onSelect={onSelect}
      />
    )

    label.forEach((labelText) => {
      const removeButton = getByTestId(`remove-${labelText}`)
      fireEvent.click(removeButton)
      expect(onRemove.calledWith(labelText)).to.be.true
    })
  })

  it('should open dropdown when clicking the selection area', () => {
    const label = ['Label 1', 'Label 2']
    const items = ['Option 1', 'Option 2', 'Option 3']
    const onRemove = sinon.spy()
    const onSelect = sinon.spy()

    const { getByTestId, getByText } = render(
      <MultiSelect
        label={label}
        items={items}
        onRemove={onRemove}
        onSelect={onSelect}
      />
    )

    const selectionArea = getByTestId('open')
    fireEvent.click(selectionArea)

    items.forEach((option) => {
      const optionElement = getByText(option)
      expect(optionElement).to.exist
    })
  })

  it('should call onSelect when selecting an option from the dropdown', () => {
    const label = ['Label 1', 'Label 2']
    const items = ['Option 1', 'Option 2', 'Option 3']
    const onRemove = sinon.spy()
    const onSelect = sinon.spy()

    const { getByTestId, getByText } = render(
      <MultiSelect
        label={label}
        items={items}
        onRemove={onRemove}
        onSelect={onSelect}
      />
    )

    const selectionArea = getByTestId('open')
    fireEvent.click(selectionArea)

    items.forEach((option) => {
      const optionElement = getByText(option)
      fireEvent.click(optionElement)
      expect(onSelect.calledWith(option)).to.be.true
    })
  })
})
