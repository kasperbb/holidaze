import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

import { DatePicker } from '../DatePicker'
import { FiSearch } from 'react-icons/fi'
import NextLink from 'next/link'
import { routes } from '@constants/routes'
import { useIsDesktop } from '@hooks/useIsDesktop'
import { useState } from 'react'

interface FormData {
  from: Date | null
  to: Date | null
}

export function Herobar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isDesktop = useIsDesktop()

  const [data, setData] = useState<FormData>({
    to: new Date(),
    from: new Date(),
  })

  function getUrlSafeDate(date: Date | null) {
    return date?.toISOString().split('T')[0]
  }

  if (isDesktop) {
    return (
      <Flex align="center" bg="white" width="full" borderRadius="full" gap={4} py={2} px={4} pl={8} mb={16}>
        <FormControl display="flex" alignItems="center" flexDirection={['column', 'row']}>
          <FormLabel htmlFor="checkIn" color="text.primary" whiteSpace="nowrap" margin={0} mr={2}>
            Check-in
          </FormLabel>
          <DatePicker name="checkIn" selected={data.from} onChange={date => setData(prev => ({ ...prev, from: date }))} />
        </FormControl>

        <FormControl display="flex" alignItems="center" flexDirection={['column', 'row']}>
          <FormLabel htmlFor="checkOut" color="text.primary" whiteSpace="nowrap" margin={0} mr={2}>
            Check-out
          </FormLabel>
          <DatePicker name="checkOut" selected={data.to} onChange={date => setData(prev => ({ ...prev, to: date }))} />
        </FormControl>

        <NextLink href={`${routes.accommodations.base}?from=${getUrlSafeDate(data.from)}&to=${getUrlSafeDate(data.to)}`} passHref>
          <IconButton as="a" icon={<FiSearch />} variant="primary" p={3} aria-label="Search" />
        </NextLink>
      </Flex>
    )
  }

  return (
    <>
      <IconButton icon={<FiSearch />} variant="white" size="lg" aria-label="Search" p={4} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Accommodations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel htmlFor="checkIn" color="text.primary" whiteSpace="nowrap" mb={2}>
                Check-in
              </FormLabel>
              <DatePicker name="checkIn" selected={data.from} onChange={date => setData(prev => ({ ...prev, from: date }))} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="checkOut" color="text.primary" whiteSpace="nowrap" mb={2}>
                Check-out
              </FormLabel>
              <DatePicker name="checkOut" selected={data.to} onChange={date => setData(prev => ({ ...prev, to: date }))} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <NextLink href={`${routes.accommodations.base}?from=${getUrlSafeDate(data.from)}&to=${getUrlSafeDate(data.to)}`} passHref>
              <Button as="a" colorScheme="blue" width="full">
                Search
              </Button>
            </NextLink>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
