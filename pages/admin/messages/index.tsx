import { Container, Flex, Grid, Heading, Select, Text, chakra } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Card } from '@components/Card'
import { enforceAuth } from '@utils/enforceAuth'
import { getMessages } from '@queries/messages'
import { maxLines } from '@utils/styleProps'

export const getServerSideProps = enforceAuth(async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('messages', () => getMessages())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

export default function AdminMessages() {
  const { data } = useQuery('messages', () => getMessages())

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const

  return (
    <Container maxWidth="7xl">
      <Card as="div" maxWidth="full" width="full">
        <Flex align="center" justify="space-between" gap={5}>
          <Heading as="h1" fontSize="24px" fontWeight={500}>
            {data?.length} Messages
          </Heading>

          <Flex gap={4}>
            <Select bgColor="white">
              <option value="option1">Sort by default</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </Flex>
      </Card>

      <Grid templateColumns="repeat(2, 1fr)" gap={4} width="full" my={10}>
        {data?.map(({ id, name, email, message, created_at }) => (
          <Card key={id}>
            <Heading as="h3" fontSize="19px" fontWeight={600}>
              Message from {name}
            </Heading>

            <chakra.dl>
              <chakra.dt>Name</chakra.dt>
              <chakra.dd>{name}</chakra.dd>

              <chakra.dt>Email</chakra.dt>
              <chakra.dd>{email}</chakra.dd>

              <chakra.dt>Date</chakra.dt>
              <chakra.dd>{new Intl.DateTimeFormat('default', dateOptions).format(new Date(created_at!))}</chakra.dd>
            </chakra.dl>

            <Text sx={{ ...maxLines(3) }}>{message}</Text>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}
