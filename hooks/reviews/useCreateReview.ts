import { Review } from '@interfaces/reviews'
import { createReview } from '@queries/reviews'
import { useMutation } from 'react-query'

export function useCreateReview(review: Review) {
  return useMutation<Review | null, Error>(() => createReview(review))
}
