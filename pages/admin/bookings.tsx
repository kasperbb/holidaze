import { Box, Container, Flex, Grid, Heading, Image, Link, Select, Text } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Card } from '@components/Cards/Card'
import { EmptyResults } from '@components/EmptyResults'
import Head from 'next/head'
import NextLink from 'next/link'
import { enforceAuth } from '@utils/enforceAuth'
import { formatDate } from '@utils/formatDate'
import { getBookings } from '@queries/bookings'
import { routes } from '@constants/routes'

export const getServerSideProps = enforceAuth(async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['bookings'], () => getBookings())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

export default function AdminBookings() {
  const { data } = useQuery(['bookings'], () => getBookings())

  return (
    <>
      <Head>
        <title>Bookings — Holidaze</title>
      </Head>

      <Container maxWidth="7xl">
        <Card as="div" maxWidth="full" width="full">
          <Flex direction={['column', 'row']} align="center" justify="space-between" gap={5}>
            <Heading as="h1" fontSize="24px" fontWeight={500}>
              {data?.length} Bookings
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

        <Grid templateColumns="repeat(1, 1fr)" gap={4} width="full" my={10}>
          {data?.map(({ id, from, to, user, accommodation, message }) => (
            <Card key={id} maxWidth={['full', 'full']} contentProps={{ display: 'flex', gap: 4 }}>
              <Image src="/user_placeholder.jpg" alt="" width={10} height={10} borderRadius="full" shadow="primary" border="3px solid white" />
              <Box width="full">
                <Box mb={message ? 4 : 0}>
                  <Heading as="h3" fontSize="md" lineHeight={1.5}>
                    {user?.email}
                  </Heading>
                  <Text fontSize="xs">
                    {formatDate(from, { weekday: undefined })} - {formatDate(to, { weekday: undefined })} for{' '}
                    <NextLink href={`${routes.accommodations.base}/${accommodation?.id}`} passHref>
                      <Link color="blue.500">{accommodation?.name}</Link>
                    </NextLink>
                  </Text>
                </Box>
                {message && <Text>{message}</Text>}
              </Box>
            </Card>
          ))}

          <EmptyResults data={data}>No bookings found</EmptyResults>
        </Grid>
      </Container>
    </>
  )
}
