import { Booking } from '@interfaces/bookings'
import { supabase } from '@lib/supabase'

const TABLE = 'bookings'
const QUERY = `
  *,
  user:user_id (*),
  accommodation:accommodation_id (*)
`

export const getBookings = async () => {
  const { data, error } = await supabase.from<Booking>(TABLE).select(QUERY)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const createBooking = async (obj: Booking) => {
  const { data, error } = await supabase.from<Booking>(TABLE).insert(obj).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getBookingsCount = async () => {
  const { error, count } = await supabase.from(TABLE).select('*', { count: 'exact' })

  if (error) {
    throw new Error(error.message)
  }

  return count
}
