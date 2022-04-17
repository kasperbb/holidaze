export interface Review {
  id?: number
  rating: number
  message: string
  created_at?: string
  accommodation_id: number
  user_id: string | undefined
}

export interface JoinedReview {
  id: number
  rating: number
  message: string
  created_at: string
  user_id: string | undefined
  accommodation_id?: number
}