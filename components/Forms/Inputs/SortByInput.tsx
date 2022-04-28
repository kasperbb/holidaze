import { Button, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, RangeSliderProps, chakra } from '@chakra-ui/react'
import React, { useState } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

import { FiChevronDown } from 'react-icons/fi'

interface SortByInputProps extends Omit<RangeSliderProps, 'onChange'> {}

export function SortByInput<T>(props: UseControllerProps<T> & SortByInputProps) {
  const {
    field: { onChange, onBlur, name, ref, value },
  } = useController<T>(props)

  const [sortBy, setSortBy] = useState<string | string[]>(value as string)

  const handleChange = (val: string | string[]) => {
    setSortBy(val)
    onChange(val)
  }

  function getTitle(sortBy: string | string[]) {
    if (Array.isArray(sortBy)) {
      return `${sortBy[0]} - ${sortBy[1]}`
    }

    let [key, direction] = sortBy.split('-')

    if (direction === 'asc') direction = 'Ascending'
    if (direction === 'desc') direction = 'Descending'

    return `${key.split('_').join(' ')} - ${direction}`
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FiChevronDown />}
        aria-label="Sort"
        variant="outline"
        fontWeight="normal"
        px={2}
        sx={{ '& > span::first-letter': { textTransform: 'uppercase' } }}
      >
        {getTitle(sortBy)}
      </MenuButton>
      <MenuList ref={ref}>
        <MenuOptionGroup defaultValue="created_at-asc" type="radio" onChange={handleChange} onBlur={onBlur} id={name} value={sortBy}>
          <chakra.p my={2} mx={4} fontWeight="semibold" fontSize="sm">
            Created at
          </chakra.p>
          <MenuItemOption value="created_at-asc">Ascending</MenuItemOption>
          <MenuItemOption value="created_at-desc">Descending</MenuItemOption>
          <MenuDivider />
          <chakra.p my={2} mx={4} fontWeight="semibold" fontSize="sm">
            Name
          </chakra.p>
          <MenuItemOption value="name-asc">Ascending</MenuItemOption>
          <MenuItemOption value="name-desc">Descending</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
