import { Button, Collapse, Flex, FormControl, FormLabel, Heading, Textarea, useDisclosure, useToast } from '@chakra-ui/react'

import { Card } from '@components/Card'
import { FiPlus } from 'react-icons/fi'
import { Review } from '@components/Review'
import { StarRating } from '@components/StarRating'
import { useAuth } from '@context/AuthContext'
import { useEffect, useState } from 'react'
import { useCreateReview } from '@hooks/reviews/useCreateReview'
import { useForm } from 'react-hook-form'
import { Review as ReviewType } from '@interfaces/reviews'
import { getReviews } from '@queries/reviews'
import { useQuery } from 'react-query'

interface ReviewsProps {
  accommodationId: number
}

export function Reviews({ accommodationId }: ReviewsProps) {
  const { data: reviews } = useQuery(['reviews', accommodationId], () => getReviews(accommodationId))

  const { isOpen, onToggle } = useDisclosure()
  const { user } = useAuth()

  const [rating, setRating] = useState(0)

  const { register, watch, handleSubmit } = useForm<ReviewType>()
  const toast = useToast()

  const mutation = useCreateReview({ ...watch(), rating, user_id: user?.id, accommodation_id: accommodationId })

  const onSubmit = handleSubmit(() => {
    mutation.mutate()
  })

  useEffect(() => {
    if (mutation.isError) {
      toast({
        title: 'Error!',
        description: mutation.error.message,
        status: 'error',
        isClosable: true,
      })
    }

    if (mutation.isSuccess) {
      toast({
        title: 'Success!',
        description: `Successfully placed the review.`,
        status: 'success',
        isClosable: true,
      })
    }
  }, [mutation.data, mutation.error, mutation.isError, mutation.isSuccess, toast])

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

          <Button type="submit" isLoading={mutation.isLoading}>Submit</Button>
        </Card>
      </Collapse>

      <Flex direction="column" gap={6}>
        {reviews?.map((review) => (
          <Review key={review.id} {...review} />
        ))}
      </Flex>
    </>
  )
}
