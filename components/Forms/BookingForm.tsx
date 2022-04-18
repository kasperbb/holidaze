import { Button, FormControl, FormLabel, HStack, Select, useDisclosure } from '@chakra-ui/react'

import { Booking } from '@interfaces/bookings'
import { Card } from '@components/Card'
import { DatePicker } from '@components/DatePicker'
import { PaymentModal } from '@components/Modals/PaymentModal'
import { useAuth } from '@context/AuthContext'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface BookingFormProps {
  accommodationId: number
}

export function BookingForm({ accommodationId }: BookingFormProps) {
  const modalProps = useDisclosure()
  const { user } = useAuth()

  const [from, setFrom] = useState<Date | null>(new Date())
  const [to, setTo] = useState<Date | null>(new Date())

  const { register, watch } = useForm<Booking>()

  const booking = {
    from: from?.toISOString()!,
    to: to?.toISOString()!,
    guests: watch('guests'),
    accommodation_id: accommodationId,
    user_id: user?.id!,
  }

  return (
    <>
      <PaymentModal {...modalProps} booking={booking} />

      <Card as="form" maxWidth={['full', 'full']} overflow="visible">
        <FormControl mb={4}>
          <FormLabel htmlFor="from" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
            From
          </FormLabel>
          <DatePicker selected={from} onChange={date => setFrom(date)} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="to" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
            To
          </FormLabel>
          <DatePicker selected={to} onChange={date => setTo(date)} />
        </FormControl>

        <HStack align="end">
          <FormControl width="40%" mr={4}>
            <FormLabel htmlFor="to" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
              Guests
            </FormLabel>
            <Select bg="white" {...register('guests')}>
              {Array.from({ length: 5 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button width="full" onClick={() => modalProps.onOpen()}>
            Book
          </Button>
        </HStack>
      </Card>
    </>
  )
}
