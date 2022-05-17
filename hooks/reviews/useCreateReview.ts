import { useMutation, useQueryClient } from 'react-query'

import { Review } from '@interfaces/reviews'
import { createReview } from '@queries/reviews'
import { useAuth } from '@context/AuthContext'
import { useToast } from '@chakra-ui/react'

export function useCreateReview(review: Omit<Review, 'created_at'>) {
  const queryClient = useQueryClient()
  const toast = useToast()
  const { user } = useAuth()

  return useMutation(() => createReview(review), {
    onMutate: async () => {
      await queryClient.cancelQueries(['reviews'])
      const previousReviews = queryClient.getQueryData<Review[]>(['reviews', review.accommodation_id])

      if (previousReviews) {
        const userObj = {
          id: user?.id,
          email: user?.email,
        }

        const nextId = (previousReviews[0]?.id as number) + 1
        queryClient.setQueryData(['reviews', review.accommodation_id], () => [
          { ...review, user: userObj, created_at: new Date().toISOString(), id: nextId },
          ...previousReviews,
        ])
      }

      return { previousReviews }
    },
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: `Successfully placed the review.`,
        status: 'success',
        duration: 20000,
        isClosable: true,
      })
    },
    onError: (error: Error, _, ctx) => {
      queryClient.setQueryData(['reviews', review.accommodation_id], ctx?.previousReviews)

      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        duration: 20000,
        isClosable: true,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries(['reviews'])
    },
  })
}
