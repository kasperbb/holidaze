import { Button, Collapse, Flex, FormControl, FormLabel, Heading, Textarea, useDisclosure } from '@chakra-ui/react'

import { Card } from '@components/Card'
import { FiPlus } from 'react-icons/fi'
import { Review } from '@components/Review'
import { StarRating } from '@components/StarRating'
import { useAuth } from '@context/AuthContext'

export function Reviews() {
  const { isOpen, onToggle } = useDisclosure()
  const { user } = useAuth()

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
        <Card mb={10}>
          <FormControl mb={4}>
            <FormLabel htmlFor="description" color="text.primary">
              Rating
            </FormLabel>
            <StarRating rating={0} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description" color="text.primary">
              Description
            </FormLabel>
            <Textarea id="description" />
          </FormControl>
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
