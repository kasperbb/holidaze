import { Container, Flex, FormControl, FormLabel, Grid, Heading } from '@chakra-ui/react'
import { FiEdit, FiPlus } from 'react-icons/fi'
import { HorizontalAccommodationCard, HorizontalAccommodationCardSkeleton } from '@components/Cards/HorizontalAccommodationCard'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Accommodation } from '@interfaces/accommodation'
import { Card } from '@components/Cards/Card'
import { EmptyResults } from '@components/EmptyResults'
import Head from 'next/head'
import NextLink from 'next/link'
import { SortByInput } from '@components/Forms/Inputs/SortByInput'
import { TooltipIconButton } from '@components/TooltipIconButton'
import { enforceAdmin } from '@utils/enforceAuth'
import { getAccommodations } from '@queries/accommodations'
import { getSortObject } from '@utils/common'
import { routes } from '@constants/routes'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export const getServerSideProps = enforceAdmin(async ctx => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['accommodations', 'created_at-desc'], () => getAccommodations())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: Number(ctx.params?.id),
    },
  }
})

export default function AdminHotels() {
  const [isEditMode, setIsEditMode] = useState(false)

  const { watch, control } = useForm<{ sortBy: string }>({
    defaultValues: { sortBy: 'created_at-desc' },
  })

  const { key, ascending } = getSortObject<Accommodation>(watch('sortBy'))

  const { data, isLoading, isFetching } = useQuery(['accommodations', watch('sortBy')], () => getAccommodations(key, ascending))

  return (
    <>
      <Head>
        <title>Accommodations — Holidaze</title>
      </Head>

      <Container maxWidth="7xl">
        <Card as="div" maxWidth="full" width="full">
          <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between" gap={5}>
            <Heading as="h1" fontSize="24px" fontWeight={500}>
              {data?.length} Accommodations
            </Heading>

            <Flex direction={{ base: 'column', sm: 'row' }} alignItems="center" gap={4}>
              <FormControl display="flex" alignItems="center" width="unset" gap={4}>
                <FormLabel htmlFor="sortBy" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" m={0}>
                  Sort by
                </FormLabel>
                <SortByInput name="sortBy" control={control} />
              </FormControl>

              <Flex gap={4}>
                <TooltipIconButton icon={<FiEdit />} variant="primary" p={3} aria-label="Edit accommodations" onClick={() => setIsEditMode(prev => !prev)} />

                <NextLink href={routes.admin.accommodations.add} passHref>
                  <TooltipIconButton as="a" icon={<FiPlus />} variant="primary" p={3} aria-label="Add accommodation" />
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Grid templateColumns="repeat(1, 1fr)" gap={4} width="full" my={10}>
          {isLoading || isFetching
            ? Array.from({ length: 5 }).map((_, i) => <HorizontalAccommodationCardSkeleton key={i} />)
            : data?.map(item => <HorizontalAccommodationCard key={item.id} {...item} isEditMode={isEditMode} />)}

          <EmptyResults data={data}>No accommodations found</EmptyResults>
        </Grid>
      </Container>
    </>
  )
}
