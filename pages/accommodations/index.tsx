import { Button, Container, FormControl, FormLabel, Grid, GridItem, HStack, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { QueryClient, dehydrate } from 'react-query'

import { Card } from '@components/Card'
import { ControlledDatePicker } from '@components/DatePicker'
import { EmptyResults } from '@components/EmptyResults'
import { FiSearch } from 'react-icons/fi'
import { Filter } from '@interfaces/filter'
import { GetStaticProps } from 'next'
import { HorizontalAccommodationCard } from '@components/HorizontalAccommodationCard'
import { PriceRangeInput } from '@components/Forms/Inputs/PriceRangeInput'
import { SortByInput } from '@components/Forms/Inputs/SortByInput'
import { StarRatingInput } from '@components/Forms/Inputs/StarRatingInput'
import { getAccommodations } from '@queries/accommodations'
import { useFilterAccommodations } from '@hooks/accommodations/useFilterAccommodations'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export const getStaticProps: GetStaticProps = async ctx => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('accommodations', () => getAccommodations())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: Number(ctx.params?.id),
    },
  }
}

const initialState: Filter.State = {
  search: '',
  dateRange: [undefined, undefined],
  priceRange: [0, 300],
  rating: 0,
  sortBy: 'created_at-asc',
}

function getDateValue(dateRange: (Date | undefined)[], index: number) {
  return dateRange[index] ? dateRange[index]?.toISOString() : undefined
}

export default function Accommodations() {
  const [filter, setFilter] = useState(initialState)
  const { data } = useFilterAccommodations({
    ...filter,
    from: getDateValue(filter.dateRange, 0),
    to: getDateValue(filter.dateRange, 1),
    sortBy: filter.sortBy,
  })

  const { register, handleSubmit, reset, control } = useForm<Filter.State>({
    defaultValues: filter,
  })

  const onSubmit = (data: Filter.State) => {
    setFilter(data)
  }

  return (
    <Container as="form" py={40} onSubmit={handleSubmit(onSubmit)}>
      <Card
        variant="horizontal"
        contentProps={{ width: 'full', display: 'flex', flexDirection: { base: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}
        px={6}
      >
        <Heading as="h1" fontSize={['lg', 'xl', '2xl']} fontWeight="medium" textAlign="center">
          {data?.length} Accommodations found
        </Heading>

        <SortByInput name="sortBy" control={control} />
      </Card>

      <Grid width="full" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(6, 1fr)' }} gap={8} mt={8}>
        <GridItem width="full" colSpan={{ base: 4, md: 2 }}>
          <Card overflow="visible">
            <FormControl mb={4}>
              <FormLabel htmlFor="search" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Search
              </FormLabel>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.300" />
                </InputLeftElement>
                <Input borderRadius="lg" placeholder="Search" fontSize="sm" id="search" {...register('search')} />
              </InputGroup>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="dateRange" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Date
              </FormLabel>

              <ControlledDatePicker name="dateRange" control={control} minDate={new Date()} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="priceRange" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Filter by price
              </FormLabel>

              <PriceRangeInput name="priceRange" control={control} />
            </FormControl>

            <FormControl mb={6}>
              <FormLabel htmlFor="rating" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Filter by rating
              </FormLabel>

              <StarRatingInput size={6} name="rating" control={control} />
            </FormControl>

            <HStack spacing={4}>
              <Button
                variant="error"
                width="full"
                onClick={() => {
                  setFilter(initialState)
                  reset()
                }}
              >
                Clear
              </Button>
              <Button type="submit" width="full">
                Apply
              </Button>
            </HStack>
          </Card>
        </GridItem>
        <GridItem width="full" colSpan={4}>
          {data?.map(item => (
            <HorizontalAccommodationCard key={item.id} {...item} />
          ))}

          <EmptyResults data={data}>No accommodations found</EmptyResults>
        </GridItem>
      </Grid>
    </Container>
  )
}
