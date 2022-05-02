import { Box, Button, Collapse, Flex, Heading, Image, Text, useDisclosure } from '@chakra-ui/react'

import { Card } from './Cards/Card'
import { JoinedReview } from '@interfaces/reviews'
import { StarRating } from './StarRating'

export function Review({ rating, message, user, created_at }: JoinedReview) {
  const { isOpen, onToggle } = useDisclosure()
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const

  return (
    <Card maxWidth={['full', 'full']} contentProps={{ display: 'flex', gap: 4 }}>
      <Image src="/user_placeholder.jpg" alt="" width={10} height={10} borderRadius="full" shadow="primary" border="3px solid white" />
      <Box width="full">
        <Flex direction={['column', 'row']} justify="space-between" mb={4}>
          <Box>
            <Heading as="h3" fontSize="md" lineHeight={1.5}>
              {user.email}
            </Heading>
            <Text fontSize="xs" mb={[2, 0]}>
              {new Intl.DateTimeFormat('default', dateOptions).format(new Date(created_at))}
            </Text>
          </Box>

          <StarRating rating={rating} />
        </Flex>
        <Text>
          <Collapse startingHeight={45} in={isOpen}>
            {message}
          </Collapse>
        </Text>
        <Button variant="outline" size="sm" onClick={onToggle} mt={4}>
          Show {isOpen ? 'Less' : 'More'}
        </Button>
      </Box>
    </Card>
  )
}
