import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import Text from '../../atoms/Text/Text'
import { HiCheck } from 'react-icons/hi'

interface SelectOption {
  label: string
  value: string
}

const KEY_CODES = ['Enter', ' ', 'ArrowDown']

interface RenderOptionProps {
  isSelected: boolean
  option: SelectOption
  getOptionRecommendedProps: (overrideProps?: Object) => Object
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void
  options: SelectOption[]
  label?: string
  renderOption?: (props: RenderOptionProps) => React.ReactNode
}
import { HiChevronDown } from 'react-icons/hi'
import { createRef } from 'react'

const Select: React.FC<SelectProps> = ({
  options = [],
  label = 'Please select an option...',
  onOptionSelected: handler,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
  const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null)
  const labelRef = useRef<HTMLButtonElement>(null)
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([])
  const [overlayTop, setOverlayTop] = useState<number>(0)

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    setIsOpen(!isOpen)

    if (handler) {
      handler(option, optionIndex)
    }

    setSelectedIndex(optionIndex)
    setIsOpen(false)
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setOverlayTop(labelRef.current?.offsetHeight || 0)
  }, [labelRef.current?.offsetHeight])

  let selectedOption = null

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex]
  }

  const hightlightItem = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex)
  }

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault()
    if (KEY_CODES.includes(event.key)) {
      setIsOpen(true)

      // set focus on the list item
      hightlightItem(0)
    }
  }

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()))
  }, [options.length])

  // console.log(optionRefs)

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex]

      if (ref && ref.current) {
        ref.current.focus()
      }
    }
  }, [isOpen])

  return (
    <div className='sds-select'>
      <button
        data-testid='SdsSelectButton'
        aria-controls='sds-select-list'
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        ref={labelRef}
        className='sds-select__label'
        onClick={() => onLabelClick()}
        onKeyDown={onButtonKeyDown}
      >
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
        <span>
          <HiChevronDown
            width='1rem'
            height='1rem'
            className={`sds-select__caret ${
              isOpen ? 'sds-select__caret--open' : 'sds-select__caret--closed'
            }`}
          />
        </span>
      </button>

      {isOpen ? (
        <ul
          role='menu'
          id='sds-select-list'
          className='sds-select__overlay'
          style={{ top: overlayTop }}
        >
          {options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex
            const isHighlighted = highlightedIndex === optionIndex
            const ref = optionRefs[optionIndex]

            const renderOptionProps = {
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  ref,
                  role: 'menuitemradio',
                  'aria-label': option.label,
                  'aria-checked': isSelected ? true : undefined,
                  tabIndex: isHighlighted ? -1 : 0,
                  onMouseEnter: () => hightlightItem(optionIndex),
                  onMouseLeave: () => hightlightItem(null),
                  className: `sds-select__option 
                  ${isSelected ? 'sds-select__option--selected' : ''}
                  ${isHighlighted ? 'sds-select__option--highlighted' : ''}
                  `,
                  key: option.value,
                  onClick: () => onOptionSelected(option, optionIndex),
                  ...overrideProps,
                }
              },
            }

            if (renderOption) {
              return renderOption(renderOptionProps)
            }
            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>

                {isSelected && <HiCheck width='1rem' height='1rem' />}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default Select
