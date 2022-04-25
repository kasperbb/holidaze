import { Accommodation } from './accommodation'
import { Auth } from './auth'

type DateRange = [start: Date | null, end: Date | null]

export interface Booking {
  id?: number
  from: string
  to: string
  guests: number
  created_at?: string
  user_id: string
  accommodation_id: number
  user?: Auth.User
  accommodation?: Accommodation
}

export interface AddBooking {
  dateRange: DateRange
  guests: number
}
