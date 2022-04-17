import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { JoinedReview } from '@interfaces/reviews'

import { Card } from './Card'

export function Review({ rating, message, user_id, created_at }: JoinedReview) {
  return (
    <Card maxWidth={['full', 'full']} contentProps={{ display: 'flex', gap: 4 }}>
      <Image src="/user_placeholder.jpg" alt="" width={10} height={10} borderRadius="full" shadow="primary" border="3px solid white" />
      <Box>
        <Heading as="h3" fontSize="md" lineHeight={1.5}>
          {user_id}
        </Heading>
        <Text fontSize="xs" mb={4}>
          {created_at}
          05:25 pm - June 14, 2022
        </Text>
        <Text>
          {message}
        </Text>
      </Box>
    </Card>
  )
}
