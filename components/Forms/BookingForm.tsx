import * as Yup from 'yup'

import { AddBooking, Booking } from '@interfaces/bookings'
import { Button, FormControl, FormLabel, HStack, Select, useDisclosure, useToast } from '@chakra-ui/react'
import { dateRange, includesSameDay } from '@utils/date'

import { BookingModal } from '@components/Modals/BookingModal'
import { Card } from '@components/Cards/Card'
import { ControlledDatePicker } from '@components/DatePicker'
import { FormHelperError } from './FormHelperError'
import { useAuth } from '@context/AuthContext'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

interface BookingFormProps {
  accommodationId: number
  accommodationName: string
  bookings: Pick<Booking, 'from' | 'to'>[] | undefined
}

export function BookingForm({ accommodationId, accommodationName, bookings }: BookingFormProps) {
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
      dateRange: [undefined, undefined],
      guests: 1,
    },
  })

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
      <BookingModal
        initialValues={{ ...watch() }}
        accommodationId={accommodationId}
        accommodationName={accommodationName}
        bookings={bookings}
        {...modalProps}
      />

      <Card as="form" maxWidth={['full', 'full']} overflow="visible" onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4} isInvalid={Boolean(errors.dateRange)}>
          <FormLabel htmlFor="dates" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
            When will you stay?
          </FormLabel>
          <ControlledDatePicker name="dateRange" id="dates" control={control} excludedDates={excludedDates} minDate={new Date()} />
          <FormHelperError error={errors.dateRange} />
        </FormControl>

        <HStack align="end">
          <FormControl width="40%" mr={4}>
            <FormLabel htmlFor="guests" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
              Guests
            </FormLabel>
            <Select bg="white" id="guests" {...register('guests')}>
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
