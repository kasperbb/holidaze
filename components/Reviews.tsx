import * as Yup from 'yup'

import { Alert, AlertIcon, Button, Collapse, Flex, FormControl, FormLabel, Heading, Spinner, Textarea, useDisclosure } from '@chakra-ui/react'

import { Card } from '@components/Cards/Card'
import { FiPlus } from 'react-icons/fi'
import { FormHelperError } from './Forms/FormHelperError'
import { Review } from '@components/Review'
import { Review as ReviewType } from '@interfaces/reviews'
import { StarRatingInput } from './Forms/Inputs/StarRatingInput'
import { getReviews } from '@queries/reviews'
import { useAuth } from '@context/AuthContext'
import { useCreateReview } from '@hooks/reviews/useCreateReview'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'

interface ReviewsProps {
  accommodationId: number
}

const formSchema = Yup.object().shape({
  rating: Yup.number().required('Rating is required.').min(1, 'You must give at least a rating of 1.'),
  message: Yup.string().required('Message is required.').min(5, 'Message must be at least 5 characters long.'),
})

export function Reviews({ accommodationId }: ReviewsProps) {
  const { data: reviews, isLoading } = useQuery(['reviews', accommodationId], () => getReviews(accommodationId))

  const { isOpen, onToggle, onClose } = useDisclosure()
  const { user } = useAuth()

  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Pick<ReviewType, 'rating' | 'message'>>({
    resolver: yupResolver(formSchema),
  })

  const mutation = useCreateReview({ ...watch(), user_id: user?.id, accommodation_id: accommodationId })

  const onSubmit = handleSubmit(() => {
    mutation.mutate()
  })

  useEffect(() => {
    if (mutation.isSuccess) {
      reset()
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
          <FormControl mb={4} isInvalid={Boolean(errors.rating)}>
            <FormLabel htmlFor="rating" color="text.primary">
              Rating
            </FormLabel>
            <StarRatingInput name="rating" control={control} size={6} />
            <FormHelperError error={errors.rating}>{errors.rating?.message}</FormHelperError>
          </FormControl>
          <FormControl mb={4} isInvalid={Boolean(errors.message)} isRequired>
            <FormLabel htmlFor="message" color="text.primary">
              Message
            </FormLabel>
            <Textarea id="description" {...register('message')} />
            <FormHelperError error={errors.message}>{errors.message?.message}</FormHelperError>
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
