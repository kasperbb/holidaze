import { Button, Container, Flex, Grid, GridItem, HStack, Heading, Select, Text, VisuallyHidden, chakra } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Card } from '@components/Cards/Card'
import { EmptyResults } from '@components/EmptyResults'
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
        <Flex direction={['column', 'row']} align="center" justify="space-between" gap={5}>
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
            <chakra.dl fontSize="sm" mb={4} aria-label="Contact information">
              <VisuallyHidden>
                <Heading as="h3">Contact information</Heading>
              </VisuallyHidden>

              <HStack>
                <chakra.dt minWidth={10}>Name</chakra.dt>
                <chakra.dd fontWeight="semibold">{name}</chakra.dd>
              </HStack>

              <HStack>
                <chakra.dt minWidth={10}>Email</chakra.dt>
                <chakra.dd fontWeight="semibold">{email}</chakra.dd>
              </HStack>

              <HStack>
                <chakra.dt minWidth={10}>Date</chakra.dt>
                <chakra.dd fontWeight="semibold">{new Intl.DateTimeFormat('default', dateOptions).format(new Date(created_at!))}</chakra.dd>
              </HStack>
            </chakra.dl>

            <Text sx={{ ...maxLines(3) }} mb={6}>
              {message}
            </Text>

            <Flex justify="flex-end">
              <Button as="a" href={`mailto:${email}`} variant="secondary">
                Respond
              </Button>
            </Flex>
          </Card>
        ))}

        <GridItem colSpan={2}>
          <EmptyResults data={data}>No messages found</EmptyResults>
        </GridItem>
      </Grid>
    </Container>
  )
}
