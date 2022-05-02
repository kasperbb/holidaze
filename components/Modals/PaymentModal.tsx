import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  UseDisclosureProps,
} from '@chakra-ui/react'
import { FiCalendar, FiCreditCard, FiEdit2 } from 'react-icons/fi'

import { Booking } from '@interfaces/bookings'
import { useCreateBooking } from '@hooks/bookings/useCreateBooking'
import { useState } from 'react'

interface PaymentModalProps extends UseDisclosureProps {
  booking: Omit<Booking, 'message'>
}

export function PaymentModal({ isOpen, onClose, booking }: PaymentModalProps) {
  const [message, setMessage] = useState('')
  const { mutate, isLoading } = useCreateBooking({ ...booking, message })

  return (
    <Modal isOpen={isOpen!} onClose={onClose!}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payment & Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel htmlFor="name" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
              Cardholder name
            </FormLabel>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiCreditCard color="gray.300" />
              </InputLeftElement>
              <Input id="name" borderRadius="lg" placeholder="Cardholder name" fontSize="sm" />
            </InputGroup>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel htmlFor="number" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
              Card number
            </FormLabel>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiCreditCard color="gray.300" />
              </InputLeftElement>
              <Input id="number" borderRadius="lg" placeholder="Card number" fontSize="sm" />
            </InputGroup>
          </FormControl>

          <HStack mb={4}>
            <FormControl>
              <FormLabel htmlFor="expiryDate" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Expiry Date
              </FormLabel>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiCalendar color="gray.300" />
                </InputLeftElement>
                <Input id="expiryDate" borderRadius="lg" placeholder="Expiry date" fontSize="sm" />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="cvv" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                CVV
              </FormLabel>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiEdit2 color="gray.300" />
                </InputLeftElement>
                <Input id="cvv" borderRadius="lg" placeholder="CVV" fontSize="sm" />
              </InputGroup>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel htmlFor="message" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
              Message
            </FormLabel>
            <Textarea id="message" rows={4} onChange={e => setMessage(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="error" width="full" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" width="full" onClick={() => mutate(onClose)} isLoading={isLoading}>
            Pay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
