import { JoinedReview, Review } from '@interfaces/reviews'

import { supabase } from '@lib/supabase'

const TABLE = 'reviews'

export const getAllReviews = async () => {
  const { data, error } = await supabase.from<Review>(TABLE).select()

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
  const { data, error } = await supabase
    .from<JoinedReview>(TABLE)
    .select(
      `
      id,
      rating,
      message,
      created_at,
      user:user_id (
        id,
        email
      )
    `
    )
    .eq('accommodation_id', accommodationId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const createReview = async (obj: Omit<Review, 'created_at'>) => {
  const { data, error } = await supabase.from<Review>(TABLE).insert(obj).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getReviewsCount = async () => {
  const { error, count } = await supabase.from(TABLE).select('*', { count: 'exact' })

  if (error) {
    throw new Error(error.message)
  }

  return count
}
