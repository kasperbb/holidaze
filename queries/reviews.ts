import { JoinedReview, Review } from '@interfaces/reviews'
import { supabase } from '@lib/supabase'

const TABLE = 'reviews'

export const getAllReviews = async () => {
  const { data, error } = await supabase.from<Review[]>(TABLE).select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getReviewPaths = async () => {
  const { data, error } = await supabase.from<{ id: string }>(TABLE).select('id')

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getReviews = async (accommodationId: number) => {
  const { data, error } = await supabase.from<JoinedReview>(TABLE).select(`
    id,
    rating,
    message,
    created_at,
    user_id
  `).eq('accommodation_id', accommodationId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const createReview = async (obj: Review) => {
  const { data, error } = await supabase.from<Review>(TABLE).insert(obj).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
