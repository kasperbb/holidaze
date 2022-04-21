import { Accommodation } from './accommodation'
import { Auth } from './auth'

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
