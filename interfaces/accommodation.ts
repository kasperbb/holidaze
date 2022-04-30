import { Booking } from './bookings'
import { Review } from './reviews'

export interface Accommodation {
  id: number
  name: string
  description: string
  location: [latitude: number, longitude: number]
  price: number
  rooms: number
  images: Image[]
  featured: boolean
  created_at: string
  user_id: string
  reviews?: Review[]
  bookings?: Pick<Booking, 'from' | 'to'>[]
  rating?: number
}

export interface AddAccommodation {
  name: string
  description: string
  location: [latitude: number, longitude: number]
  price: number
  rooms: number
  images: File[]
  user_id?: string
}

export interface AccommodationFilter {
  search: string
  dateRange: [from: Date | undefined, to: Date | undefined] | undefined[]
  priceRange: [number, number]
  rating: number
  sortBy: string
}

export interface Image {
  url: string
  path: string | null
}
