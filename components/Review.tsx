import { Box, Heading, Image, Text } from '@chakra-ui/react'

import { Card } from './Card'

export function Review() {
  return (
    <Card maxWidth={['full', 'full']} contentProps={{ display: 'flex', gap: 4 }}>
      <Image src="/user_placeholder.jpg" alt="" width={10} height={10} borderRadius="full" shadow="primary" border="3px solid white" />
      <Box>
        <Heading as="h3" fontSize="md" lineHeight={1.5}>
          User
        </Heading>
        <Text fontSize="xs" mb={4}>
          05:25 pm - June 14, 2022
        </Text>
        <Text>
          Dequi folores dolor sit amet, consectetur adipisicing elit. Nesciunt illo, delectus totam! Delectus illo magnam voluptatem a tempora id vitae dolor,
          quis natus iusto molestiae ab nam error vero possimus ullam facilis porro veritatis.
        </Text>
      </Box>
    </Card>
  )
}
