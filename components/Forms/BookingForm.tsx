import * as Yup from 'yup'

import { AddBooking, Booking } from '@interfaces/bookings'
import { Button, FormControl, FormLabel, HStack, Select, useDisclosure, useToast } from '@chakra-ui/react'
import { dateRange, includesSameDay } from '@utils/date'

import { Card } from '@components/Cards/Card'
import { ControlledDatePicker } from '@components/DatePicker'
import { FormHelperError } from './FormHelperError'
import { PaymentModal } from '@components/Modals/PaymentModal'
import { useAuth } from '@context/AuthContext'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

interface BookingFormProps {
  accommodationId: number
  bookings: Pick<Booking, 'from' | 'to'>[] | undefined
}

export function BookingForm({ accommodationId, bookings }: BookingFormProps) {
  const modalProps = useDisclosure()
  const toast = useToast()

  const { user } = useAuth()

  const excludedDates = useMemo(() => {
    return bookings?.reduce<Date[]>((acc, { from, to }) => [...acc, ...dateRange(from, to)], [])
  }, [bookings])

  const formSchema = Yup.object().shape({
    dateRange: Yup.array().test('rangeIncludesDisabledDates', 'Those dates are not available.', (value: Date[] | undefined) => validateDates(value)),
  })

  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<AddBooking>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      dateRange: [new Date(), new Date()],
      guests: 1,
    },
  })

  const [from, to] = [...watch('dateRange')]

  const booking = {
    from: from?.toISOString()!,
    to: to?.toISOString()!,
    guests: watch('guests'),
    accommodation_id: accommodationId,
    user_id: user?.id!,
  }

  function validateDates(dates: Date[] | undefined) {
    if (!dates) return false
    const range = dateRange(dates[0], dates[1])
    return !includesSameDay(range, excludedDates)
  }

  const onSubmit = (data: AddBooking) => {
    if (!data.dateRange.some(Boolean)) {
      return setError('dateRange', { type: 'custom', message: 'You must select a valid date range.' })
    }

    clearErrors('dateRange')

    if (user) return modalProps.onOpen()

    toast({
      title: 'Error!',
      description: 'You must be logged in to book an accommodation',
      status: 'error',
      isClosable: true,
    })
  }

  return (
    <>
      <PaymentModal {...modalProps} booking={booking} />

      <Card as="form" maxWidth={['full', 'full']} overflow="visible" onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4} isInvalid={Boolean(errors.dateRange)}>
          <FormLabel htmlFor="from" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
            When will you stay?
          </FormLabel>
          <ControlledDatePicker name="dateRange" control={control} excludedDates={excludedDates} />
          <FormHelperError error={errors.dateRange} />
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

          <Button width="full" type="submit">
            Book
          </Button>
        </HStack>
      </Card>
    </>
  )
}
