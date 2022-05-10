import { Container, Flex, Grid, Heading, Select } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Card } from '@components/Cards/Card'
import { EmptyResults } from '@components/EmptyResults'
import { FiPlus } from 'react-icons/fi'
import Head from 'next/head'
import { HorizontalAccommodationCard } from '@components/Cards/HorizontalAccommodationCard'
import NextLink from 'next/link'
import { Public } from '@interfaces/auth'
import { TooltipIconButton } from '@components/TooltipIconButton'
import { enforceAuth } from '@utils/enforceAuth'
import { getAccommodationsForUser } from '@queries/accommodations'
import { routes } from '@constants/routes'

export const getServerSideProps = enforceAuth(async ({ user }) => {
  const queryClient = new QueryClient()

  if (user?.id) await queryClient.prefetchQuery(['accommodations', user.id], () => getAccommodationsForUser(user.id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      user,
    },
  }
})

interface AdminAccommodationsProps {
  user: Public.User | undefined
}

export default function AdminAccommodations({ user }: AdminAccommodationsProps) {
  const { data } = useQuery(['accommodations', user?.id], () => getAccommodationsForUser(user?.id))

  return (
    <>
      <Head>
        <title>Accommodations — Holidaze</title>
      </Head>

      <Container maxWidth="7xl">
        <Card as="div" maxWidth="full" width="full">
          <Flex direction={['column', 'row']} align="center" justify="space-between" gap={5}>
            <Heading as="h1" fontSize="24px" fontWeight={500}>
              {data?.length} Accommodations
            </Heading>

            <Flex gap={4}>
              <Select bgColor="white">
                <option value="option1">Sort by default</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              <NextLink href={routes.admin.accommodations.add} passHref>
                <TooltipIconButton icon={<FiPlus />} variant="primary" p={3} aria-label="Add accommodation" />
              </NextLink>
            </Flex>
          </Flex>
        </Card>

        <Grid templateColumns="repeat(1, 1fr)" gap={4} width="full" my={10}>
          {data?.map(accommodation => (
            <HorizontalAccommodationCard key={accommodation.id} {...accommodation} showEditButton />
          ))}

          <EmptyResults data={data}>No accommodations found</EmptyResults>
        </Grid>
      </Container>
    </>
  )
}
