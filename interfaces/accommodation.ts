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

export interface UpdateAccommodation extends Omit<AddAccommodation, 'images'> {
  images?: Image[]
}

export interface AccommodationFilter {
  search: string
  from: string | undefined
  to: string | undefined
  priceRange: [number, number]
  rating: number
  sortBy: string
}

export interface Image {
  url: string
  path: string | null
}
