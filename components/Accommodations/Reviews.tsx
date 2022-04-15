import { Button, Collapse, Flex, FormControl, FormLabel, Heading, Textarea, useDisclosure } from '@chakra-ui/react'

import { Card } from '@components/Card'
import { FiPlus } from 'react-icons/fi'
import { Review } from '@components/Review'
import { StarRating } from '@components/StarRating'
import { useAuth } from '@context/AuthContext'
import { useState } from 'react'

export function Reviews() {
  const { isOpen, onToggle } = useDisclosure()
  const { user } = useAuth()

  const [rating, setRating] = useState(0)

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
        <Card as="form" mb={10}>
          <FormControl mb={4}>
            <FormLabel htmlFor="description" color="text.primary">
              Rating
            </FormLabel>
            <StarRating rating={rating} onClick={num => setRating(num)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="description" color="text.primary">
              Description
            </FormLabel>
            <Textarea id="description" />
          </FormControl>

          <Button type="submit">Submit</Button>
        </Card>
      </Collapse>

      <Flex direction="column" gap={6}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Review key={index} />
        ))}
      </Flex>
    </>
  )
}
