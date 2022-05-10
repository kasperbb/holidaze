import { RangeSliderProps, Select } from '@chakra-ui/react'
import { UseControllerProps, useController } from 'react-hook-form'

import React from 'react'

interface SortByInputProps extends Omit<RangeSliderProps, 'onChange'> {}

export function SortByInput<T>(props: UseControllerProps<T> & SortByInputProps) {
  const {
    field: { onChange, onBlur, name, ref, value },
  } = useController<T>(props)

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
      <option value="created_at-desc">Newest</option>
      <option value="created_at-asc">Oldest</option>
      <option value="name-asc">A - Z</option>
      <option value="name-desc">Z - A</option>
    </Select>
  )
}
