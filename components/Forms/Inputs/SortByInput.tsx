import { RangeSliderProps, Select } from '@chakra-ui/react'
import { UseControllerProps, useController } from 'react-hook-form'

import React from 'react'

interface SortByInputProps extends Omit<RangeSliderProps, 'onChange'> {
  options?: { label: string; value: string }[]
}

const defaultOptions = [
  { label: 'Newest', value: 'created_at-desc' },
  { label: 'Oldest', value: 'created_at-asc' },
  { label: 'A - Z', value: 'name-asc' },
  { label: 'Z - A', value: 'name-desc' },
]

export function SortByInput<T>({ options = defaultOptions, ...rest }: UseControllerProps<T> & SortByInputProps) {
  const {
    field: { onChange, onBlur, name, ref, value },
  } = useController<T>(rest)

  return (
    <Select
      bgColor="white"
      aria-label="Sort"
      width="200px"
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      name={name}
      id={name}
      ref={ref}
      value={value as string}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  )
}
