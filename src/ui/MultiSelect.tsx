import { useState } from 'react'
import cx from 'clsx'
import _map from 'lodash/map'
import _includes from 'lodash/includes'
import _isEmpty from 'lodash/isEmpty'

const MultiSelect = ({
  onRemove, onSelect, items, labelExtractor, keyExtractor, label, placholder, className, itemExtractor,
}: {
  className?: string
  onRemove: (item: any) => void
  onSelect: (item: any) => void
  items: any[]
  labelExtractor?: (item: any) => string
  keyExtractor?: (item: any) => string
  label: any[]
  placholder?: string
  itemExtractor?: (item: any) => string
}) => {
  const [selected, setSelected] = useState(false)

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div className='w-full'>
        <div className='flex flex-col items-center relative'>
          <div
            className='w-full cursor-pointer'
            onClick={(e) => {
              setSelected(!selected)
            }}
          >
            <div className='py-[12px] pl-[12px] pr-[20px] min-w-[300px] flex border rounded w-ful text-sm font-semibold border-custom-600 bg-custom-bg'>
              <div className='flex flex-auto flex-wrap'>
                {!_isEmpty(label) ? _map(label, (item) => (
                  <div key={keyExtractor ? keyExtractor(item) : item} className='flex ml-2 justify-between items-center font-medium rounded-lg bg-custom-800 text-white px-2 py-[4px]'>
                    <div className='text-sm font-semibold leading-none max-w-full flex-initial break-words flex'>{labelExtractor ? labelExtractor(item) : item}</div>
                    <div className='flex items-center'>
                      <div className='h-[15px] w-[1px] bg-white mx-2' />
                      <div 
                      data-testid={`remove-${item}`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onRemove(item)
                      }}
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="Vector">
                            <path id="Vector_2" d="M9.5 1.5L1.5 9.5M9.5 9.5L1.5 1.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className='text-white flex justify-center items-center px-2'>{placholder}</p>
                )}
              </div>
              <div className='flex items-center'>
                <button type='button' onClick={() => setSelected(!selected)} className='cursor-pointer outline-none focus:outline-none' data-testid='open'>
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 2219">
                      <path id="Polygon 1" d="M6 12.5L0.803847 3.5L11.1962 3.5L6 12.5Z" fill="#4E5788" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {selected && (
            <div className='shadow top-100 bg-custom-bg z-40 w-full left-0 rounded border border-custom-600 text-white max-h-select overflow-y-auto overflow-x-hidden max-h-[200px]'>
              <div className='flex flex-col w-full'>
                {_map(items, (item) => (
                  <div key={keyExtractor ? `${keyExtractor(item)}select` : `${item}select`} onClick={() => onSelect(item)} className='cursor-pointer w-full rounded-t border-b border-custom-600' data-testid={`select-${item}`}>
                    <div className={cx('overflow-x-auto flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative', {
                      '!border-custom-800 border-l-2': _includes(label, item),
                    })}
                    >
                      <div className='w-full items-center flex break-words'>
                        <div className='mx-2 leading-6 flex'>{itemExtractor ? itemExtractor(item) : item}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

MultiSelect.defaultProps = {
  className: '',
  labelExtractor: (item: any) => item,
  keyExtractor: (item: any) => item,
  hint: '',
  placholder: 'Select...',
  itemExtractor: (item: any) => item,
}

export default MultiSelect
