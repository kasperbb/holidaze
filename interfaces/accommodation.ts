import { Review } from './reviews'

export interface Accommodation {
  id: number
  name: string
  description: string
  location: [latitude: number, longitude: number]
  price: number
  rooms: number
  images: string[]
  created_at: string
  reviews?: Review[]
  rating?: number
}

export interface AddAccommodation {
  name: string
  description: string
  location: [latitude: number, longitude: number]
  price: number
  rooms: number
  images: File[]
}
