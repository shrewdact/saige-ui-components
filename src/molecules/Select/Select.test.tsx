import React from 'react'
import Select from './Select'

import { fireEvent, render } from '@testing-library/react'

const options = [
  { label: 'Strict Black', value: 'strict-black' },
  { label: 'Heavenly Green', value: 'heavenly-green' },
  { label: 'Sweet Pink', value: 'sweet pink' },
]
test('renders all options passed to it', () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />)

  fireEvent.click(getByTestId('SdsSelectButton'))

  expect(getAllByRole('menuitemradio')).toHaveLength(options.length)
})
