import { Container, Flex, FormControl, FormLabel, Grid, Heading, Select } from '@chakra-ui/react'
import { HorizontalAccommodationCard, HorizontalAccommodationCardSkeleton } from '@components/Cards/HorizontalAccommodationCard'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Card } from '@components/Cards/Card'
import { EmptyResults } from '@components/EmptyResults'
import { FiPlus } from 'react-icons/fi'
import Head from 'next/head'
import NextLink from 'next/link'
import { Public } from '@interfaces/auth'
import { SortByInput } from '@components/Forms/Inputs/SortByInput'
import { TooltipIconButton } from '@components/TooltipIconButton'
import { enforceAuth } from '@utils/enforceAuth'
import { getAccommodationsForUser } from '@queries/accommodations'
import { getSortObject } from '@utils/common'
import { routes } from '@constants/routes'
import { useForm } from 'react-hook-form'

export const getServerSideProps = enforceAuth(async ({ user }) => {
  const queryClient = new QueryClient()

  if (user?.id) await queryClient.prefetchQuery(['accommodations', user.id, 'created_at-desc'], () => getAccommodationsForUser(user.id))

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
  const { watch, control } = useForm<{ sortBy: string }>({
    defaultValues: { sortBy: 'created_at-desc' },
  })

  const { key, ascending } = getSortObject(watch('sortBy'))

  const { data, isLoading, isFetching } = useQuery(['accommodations', user?.id, watch('sortBy')], () => getAccommodationsForUser(user?.id, key, ascending))

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
              <FormControl display="flex" alignItems="center" width="unset" gap={4}>
                <FormLabel htmlFor="sortBy" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" m={0}>
                  Sort by
                </FormLabel>
                <SortByInput name="sortBy" control={control} />
              </FormControl>

              <NextLink href={routes.admin.accommodations.add} passHref>
                <TooltipIconButton icon={<FiPlus />} variant="primary" p={3} aria-label="Add accommodation" />
              </NextLink>
            </Flex>
          </Flex>
        </Card>

        <Grid templateColumns="repeat(1, 1fr)" gap={4} width="full" my={10}>
          {isLoading || isFetching
            ? Array.from({ length: 5 }).map((_, i) => <HorizontalAccommodationCardSkeleton key={i} />)
            : data?.map(item => <HorizontalAccommodationCard key={item.id} {...item} showEditButton />)}

          <EmptyResults data={data}>No accommodations found</EmptyResults>
        </Grid>
      </Container>
    </>
  )
}
