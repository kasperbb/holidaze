import { Box, Container, Flex, FormControl, FormLabel, Grid, Heading, Image, Link, Text } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Booking } from '@interfaces/bookings'
import { Card } from '@components/Cards/Card'
import { EmptyResults } from '@components/EmptyResults'
import Head from 'next/head'
import NextLink from 'next/link'
import { SortByInput } from '@components/Forms/Inputs/SortByInput'
import { enforceAdmin } from '@utils/enforceAuth'
import { formatDate } from '@utils/formatDate'
import { getBookings } from '@queries/bookings'
import { getSortObject } from '@utils/common'
import { routes } from '@constants/routes'
import { useForm } from 'react-hook-form'

export const getServerSideProps = enforceAdmin(async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['bookings', 'created_at-desc'], () => getBookings())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

export default function AdminBookings() {
  const { watch, control } = useForm<{ sortBy: string }>({
    defaultValues: { sortBy: 'created_at-desc' },
  })

  const { key, ascending } = getSortObject<Booking>(watch('sortBy'))

  const { data } = useQuery(['bookings', watch('sortBy')], () => getBookings(key, ascending))

  return (
    <>
      <Head>
        <title>Bookings — Holidaze</title>
      </Head>

      <Container maxWidth="7xl">
        <Card as="div" maxWidth="full" width="full">
          <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between" gap={5}>
            <Heading as="h1" fontSize="24px" fontWeight={500}>
              {data?.length} Bookings
            </Heading>

            <Flex direction={{ base: 'column', sm: 'row' }} alignItems="center" gap={4}>
              <FormControl display="flex" alignItems="center" width="unset" gap={4}>
                <FormLabel htmlFor="sortBy" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" m={0}>
                  Sort by
                </FormLabel>
                <SortByInput
                  name="sortBy"
                  control={control}
                  options={[
                    { label: 'Newest', value: 'created_at-desc' },
                    { label: 'Oldest', value: 'created_at-asc' },
                  ]}
                />
              </FormControl>
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
