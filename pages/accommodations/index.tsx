import {
  Button,
  Collapse,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react'
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi'
import { HorizontalAccommodationCard, HorizontalAccommodationCardSkeleton } from '@components/Cards/HorizontalAccommodationCard'
import { QueryClient, dehydrate } from 'react-query'
import { useEffect, useState } from 'react'

import { Card } from '@components/Cards/Card'
import { ControlledDatePicker } from '@components/DatePicker'
import { EmptyResults } from '@components/EmptyResults'
import { Filter } from '@interfaces/filter'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { PriceRangeInput } from '@components/Forms/Inputs/PriceRangeInput'
import { SortByInput } from '@components/Forms/Inputs/SortByInput'
import { StarRatingInput } from '@components/Forms/Inputs/StarRatingInput'
import { filterAccommodations } from '@queries/accommodations'
import { useFilterAccommodations } from '@hooks/accommodations/useFilterAccommodations'
import { useForm } from 'react-hook-form'
import { useIsDesktop } from '@hooks/useIsDesktop'
import { useRouter } from 'next/router'

const initialFilter: Filter.State = {
  search: '',
  dateRange: [undefined, undefined],
  priceRange: [0, 300],
  rating: 0,
  sortBy: 'created_at-asc',
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const queryClient = new QueryClient()

  const initialDateRange = getInitialDateRange(ctx.query)

  const filter = {
    ...initialFilter,
    dateRange: initialDateRange,
    search: typeof ctx.query.search === 'string' ? ctx.query.search : '',
  }

  const key = {
    ...filter,
    dateRange: [getDateKey(initialDateRange[0]), getDateKey(initialDateRange[1])],
  }

  await queryClient.prefetchQuery(['accommodationsFilter', key], () => filterAccommodations(filter))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function getDateKey(date: Date | undefined) {
  return `${date?.getUTCFullYear()}-${date?.getUTCMonth()}-${date?.getUTCDate()}`
}

function getInitialDateRange(query: ParsedUrlQuery): [from: Date | undefined, to: Date | undefined] {
  if (query.from && query.to && typeof query.from === 'string' && typeof query.to === 'string') {
    return [new Date(query.from), new Date(query.to)]
  }
  return [undefined, undefined]
}

export default function Accommodations() {
  const { query } = useRouter()
  const isDesktop = useIsDesktop()
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  const [filter, setFilter] = useState<Filter.State>({
    ...initialFilter,
    dateRange: getInitialDateRange(query),
    search: typeof query.search === 'string' ? query.search : '',
  })

  const { register, handleSubmit, reset, setValue, watch, control } = useForm<Filter.State>({
    defaultValues: filter,
  })

  useEffect(() => {
    if (query.search) {
      setValue('search', typeof query.search === 'string' ? query.search : '')
    }
  }, [query.search, setValue])

  const { data, isLoading, isFetching } = useFilterAccommodations(filter)

  const sortValue = watch('sortBy')

  useEffect(() => {
    setFilter(prev => ({ ...prev, sortBy: sortValue }))
  }, [sortValue])

  const onSubmit = (data: Filter.State) => {
    setFilter(data)
  }

  return (
    <>
      <Head>
        <title>Accommodations — Holidaze</title>
      </Head>

      <Container as="form" py={[20, 40]} onSubmit={handleSubmit(onSubmit)}>
        <Card
          variant="horizontal"
          contentProps={{ width: 'full', display: 'flex', flexDirection: { base: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}
          px={6}
        >
          <Heading as="h1" fontSize={['lg', 'xl', '2xl']} fontWeight="medium" textAlign="center">
            {data?.length} Accommodations found
          </Heading>

          <FormControl display="flex" alignItems="center" width="unset" gap={4}>
            <FormLabel htmlFor="sortBy" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" m={0}>
              Sort by
            </FormLabel>
            <SortByInput name="sortBy" control={control} />
          </FormControl>
        </Card>

        <Grid width="full" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(6, 1fr)' }} gap={8} mt={8}>
          <GridItem width="full" colSpan={{ base: 4, md: 2 }}>
            {!isDesktop && (
              <Button variant="outline" bg="white" width="full" mb={4} gap={2} onClick={onToggle}>
                {isOpen ? 'Hide filter' : 'Show filter'}
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
              </Button>
            )}
            <Collapse in={isOpen} animateOpacity>
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
                      setFilter(initialFilter)
                      reset(initialFilter)
                    }}
                  >
                    Clear
                  </Button>
                  <Button type="submit" width="full">
                    Apply
                  </Button>
                </HStack>
              </Card>
            </Collapse>
          </GridItem>
          <GridItem width="full" display="flex" flexDirection="column" alignItems="center" colSpan={4}>
            {isLoading || isFetching
              ? Array.from({ length: 5 }).map((_, i) => <HorizontalAccommodationCardSkeleton key={i} />)
              : data?.map(item => <HorizontalAccommodationCard key={item.id} {...item} />)}

            <EmptyResults data={data}>No accommodations found</EmptyResults>
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}
