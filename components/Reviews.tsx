import { Alert, AlertIcon, Button, Collapse, Flex, FormControl, FormLabel, Heading, Spinner, Textarea, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Card } from '@components/Cards/Card'
import { FiPlus } from 'react-icons/fi'
import { Review } from '@components/Review'
import { Review as ReviewType } from '@interfaces/reviews'
import { StarRating } from '@components/StarRating'
import { getReviews } from '@queries/reviews'
import { useAuth } from '@context/AuthContext'
import { useCreateReview } from '@hooks/reviews/useCreateReview'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

interface ReviewsProps {
  accommodationId: number
}

export function Reviews({ accommodationId }: ReviewsProps) {
  const { data: reviews, isLoading } = useQuery(['reviews', accommodationId], () => getReviews(accommodationId))

  const { isOpen, onToggle, onClose } = useDisclosure()
  const { user } = useAuth()

  const [rating, setRating] = useState(0)

  const { register, watch, handleSubmit, reset } = useForm<ReviewType>()

  const mutation = useCreateReview({ ...watch(), rating, user_id: user?.id, accommodation_id: accommodationId })

  const onSubmit = handleSubmit(() => {
    mutation.mutate()
  })

  useEffect(() => {
    if (mutation.isSuccess) {
      reset()
      setRating(0)
      onClose()
    }
  }, [mutation.isSuccess, onClose, reset])

  return (
    <>
      <Flex align="center" justify="space-between" mb={6}>
        <Heading as="h2" fontSize="2xl">
          Reviews
        </Heading>

        {user && (
          <Button variant="outline" leftIcon={<FiPlus />} px={4} onClick={onToggle}>
            Place review
          </Button>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Card as="form" mb={10} onSubmit={onSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="rating" color="text.primary">
              Rating
            </FormLabel>
            <StarRating rating={rating} onClick={num => setRating(num)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="message" color="text.primary">
              Message
            </FormLabel>
            <Textarea id="description" {...register('message')} />
          </FormControl>

          <Button type="submit" isLoading={mutation.isLoading}>
            Submit
          </Button>
        </Card>
      </Collapse>

      <Flex direction="column" gap={6}>
        {reviews?.map(review => (
          <Review key={review.id} {...review} />
        ))}

        {!reviews?.length && !isLoading && (
          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            No reviews found. Be the first to place a review!
          </Alert>
        )}

        {isLoading && <Spinner />}
      </Flex>
    </>
  )
}
