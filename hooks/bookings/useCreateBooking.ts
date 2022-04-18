import { Booking } from '@interfaces/bookings'
import { createBooking } from '@queries/bookings'
import { useMutation } from 'react-query'

export function useCreateBooking(booking: Booking) {
  return useMutation<Booking, Error>(() => createBooking(booking))
}
