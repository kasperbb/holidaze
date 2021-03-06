import * as Yup from 'yup'

import { AddBooking, Booking } from '@interfaces/bookings'
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  UseDisclosureProps,
  useToast,
} from '@chakra-ui/react'
import { dateRange, includesSameDay } from '@utils/date'
import { useEffect, useMemo } from 'react'

import { ControlledDatePicker } from '@components/DatePicker'
import { FormHelperError } from '@components/Forms/FormHelperError'
import { useAuth } from '@context/AuthContext'
import { useCreateBooking } from '@hooks/bookings/useCreateBooking'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface BookingModalProps extends UseDisclosureProps {
  accommodationId: number
  accommodationName: string
  bookings: Pick<Booking, 'from' | 'to'>[] | undefined
  initialValues?: AddBooking
}

export function BookingModal({ accommodationId, accommodationName, bookings, isOpen, onClose, initialValues }: BookingModalProps) {
  const { user } = useAuth()
  const toast = useToast()

  const excludedDates = useMemo(() => {
    return bookings?.reduce<Date[]>((acc, { from, to }) => [...acc, ...dateRange(from, to)], [])
  }, [bookings])

  const formSchema = Yup.object().shape({
    dateRange: Yup.array()
      .test('validDateRange', 'You must select a valid date range.', (value: Date[] | undefined) => (value ? value.some(Boolean) : false))
      .test('invalidDates', 'Those dates are not available.', (value: Date[] | undefined) => validateDates(value)),
  })

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddBooking>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      dateRange: [undefined, undefined],
      guests: 1,
    },
  })

  useEffect(() => {
    if (initialValues) {
      setValue('dateRange', initialValues.dateRange)
      setValue('guests', initialValues.guests)
    }
  }, [initialValues, setValue])

  const [from, to] = [...watch('dateRange')]

  const booking = {
    from: from?.toISOString()!,
    to: to?.toISOString()!,
    guests: watch('guests'),
    message: watch('message'),
    accommodation_id: accommodationId,
    user_id: user?.id!,
  }

  const { mutate, isLoading } = useCreateBooking({ ...booking })

  function validateDates(dates: Date[] | undefined) {
    if (!dates) return false
    const range = dateRange(dates[0], dates[1])
    return !includesSameDay(range, excludedDates)
  }

  const onSubmit = () => {
    if (user) return mutate(onClose)

    if (!toast.isActive('booking-form-toast')) {
      toast({
        id: 'booking-form-toast',
        title: 'Error!',
        description: 'You must be logged in to book an accommodation',
        status: 'error',
        duration: 20000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal isOpen={isOpen!} onClose={onClose!}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Book for {accommodationName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4} isInvalid={Boolean(errors.dateRange)}>
            <FormLabel htmlFor="dateRange" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
              When will you stay?
            </FormLabel>
            <ControlledDatePicker name="dateRange" id="dateRange" control={control} excludedDates={excludedDates} minDate={new Date()} />
            <FormHelperError error={errors.dateRange} />
          </FormControl>

          <FormControl mb={4}>
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

          <FormControl mb={4}>
            <FormLabel htmlFor="message" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
              Message
            </FormLabel>
            <Textarea id="message" rows={4} {...register('message')} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="error" width="full" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" width="full" type="submit" isLoading={isLoading}>
            Book
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
