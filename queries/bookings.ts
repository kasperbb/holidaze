import { Booking } from '@interfaces/bookings'
import { supabase } from '@lib/supabase'

const TABLE = 'bookings'

export const createBooking = async (obj: Booking) => {
  const { data, error } = await supabase.from<Booking>(TABLE).insert(obj).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
