import { Box, Input, InputGroup, InputLeftElement, InputProps, Popover, PopoverBody, PopoverContent, PopoverTrigger, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import { useDebounce } from '@hooks/useDebouce'
import { useOnOutsideClick } from '@hooks/useOnOutsideClick'
import { useSearchAccommodations } from '@hooks/accommodations/useSearchAccommodations'

export function Searchbar({ ...rest }: InputProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [isOpen, setIsOpen] = useState(false)

  const { refetch, isFetching, data } = useSearchAccommodations(debouncedQuery)

  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useOnOutsideClick(() => {
    setQuery('')
    setIsOpen(false)
  }, [inputRef, popoverRef])

  useEffect(() => {
    if (debouncedQuery.length) {
      setIsOpen(true)
      refetch()
    } else {
      setIsOpen(false)
    }
  }, [debouncedQuery, refetch])

  return (
    <Popover isOpen={isOpen} isLazy lazyBehavior="keepMounted" placement="bottom-start" initialFocusRef={inputRef}>
      <PopoverTrigger>
        <InputGroup minWidth="449px">
          <InputLeftElement pointerEvents="none">{isFetching ? <Spinner width={3} height={3} /> : <FiSearch color="gray.300" />}</InputLeftElement>
          <Input borderRadius="lg" placeholder="Search" fontSize="sm" onChange={e => setQuery(e.target.value)} ref={inputRef} {...rest} />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent width="464px">
        <PopoverBody ref={popoverRef}>
          {(!data || !data.length) && <Text>No results</Text>}
          {data?.map(hotel => (
            <Box key={hotel.id}>{hotel.name}</Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
