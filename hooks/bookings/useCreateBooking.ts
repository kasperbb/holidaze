import { Booking } from '@interfaces/bookings'
import { createBooking } from '@queries/bookings'
import { useMutation } from 'react-query'
import { useToast } from '@chakra-ui/react'

type CallbackType = (() => void) | undefined

export function useCreateBooking(booking: Booking) {
  const toast = useToast()

  return useMutation<Booking, Error, CallbackType>(() => createBooking(booking), {
    onMutate: (callback: CallbackType) => {
      return { callback }
    },
    onSuccess: (_, callback: CallbackType) => {
      toast({
        title: 'Success!',
        description: `Successfully booked a room.`,
        status: 'success',
        isClosable: true,
      })

      if (callback) callback()
    },

    onError: (error: Error) => {
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        isClosable: true,
      })
    },
  })
}
