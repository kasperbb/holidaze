import { Flex, FormControl, FormLabel, Hide, IconButton, Show } from '@chakra-ui/react'

import { DatePicker } from '../DatePicker'
import { FiSearch } from 'react-icons/fi'

export function Herobar() {
  return (
    <>
      <Hide below="sm">
        <Flex align="center" bg="white" width="full" borderRadius="full" gap={4} py={2} px={4} pl={8} mb={16}>
          <FormControl display="flex" alignItems="center" flexDirection={['column', 'row']}>
            <FormLabel htmlFor="checkIn" color="text.primary" whiteSpace="nowrap" margin={0} mr={2}>
              Check-in
            </FormLabel>
            <DatePicker selected={new Date()} onChange={date => console.log(date)} />
          </FormControl>

          <FormControl display="flex" alignItems="center" flexDirection={['column', 'row']}>
            <FormLabel htmlFor="checkOut" color="text.primary" whiteSpace="nowrap" margin={0} mr={2}>
              Check-out
            </FormLabel>
            <DatePicker selected={new Date()} onChange={date => console.log(date)} />
          </FormControl>

          <IconButton icon={<FiSearch />} variant="primary" p={3} aria-label="Search" />
        </Flex>
      </Hide>
      <Show below="sm">
        <IconButton icon={<FiSearch />} variant="white" size="lg" aria-label="Search" />
      </Show>
    </>
  )
}
