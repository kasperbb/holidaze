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
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react'
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi'

import { Card } from '@components/Cards/Card'
import { ControlledDatePicker } from '@components/DatePicker'
import { EmptyResults } from '@components/EmptyResults'
import { Filter } from '@interfaces/filter'
import Head from 'next/head'
import { HorizontalAccommodationCard } from '@components/Cards/HorizontalAccommodationCard'
import { ParsedUrlQuery } from 'querystring'
import { PriceRangeInput } from '@components/Forms/Inputs/PriceRangeInput'
import { SortByInput } from '@components/Forms/Inputs/SortByInput'
import { StarRatingInput } from '@components/Forms/Inputs/StarRatingInput'
import { useFilterAccommodations } from '@hooks/accommodations/useFilterAccommodations'
import { useForm } from 'react-hook-form'
import { useIsDesktop } from '@hooks/useIsDesktop'
import { useRouter } from 'next/router'
import { useState } from 'react'

const today = new Date()
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())

function getInitialDateRange(query: ParsedUrlQuery): [from: Date | undefined, to: Date | undefined] {
  if (query.from && query.to && typeof query.from === 'string' && typeof query.to === 'string') {
    return [new Date(query.from), new Date(query.to)]
  }
  return [today, nextMonth]
}

const initialState: Filter.State = {
  search: '',
  dateRange: [today, nextMonth],
  priceRange: [0, 300],
  rating: 0,
  sortBy: 'created_at-asc',
}

export default function Accommodations() {
  const { query } = useRouter()
  const isDesktop = useIsDesktop()
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  const [filter, setFilter] = useState<Filter.State>({
    ...initialState,
    dateRange: getInitialDateRange(query),
    search: typeof query.search === 'string' ? query.search : '',
  })

  const { data, isLoading } = useFilterAccommodations(filter)

  const { register, handleSubmit, reset, control } = useForm<Filter.State>({
    defaultValues: filter,
  })

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

          <SortByInput name="sortBy" control={control} />
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
            </Collapse>
          </GridItem>
          <GridItem width="full" colSpan={4}>
            {isLoading && Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rect" width="100%" height="125px" borderRadius="2xl" mb={4} />)}

            {data?.map(item => (
              <HorizontalAccommodationCard key={item.id} {...item} />
            ))}

            <EmptyResults data={data}>No accommodations found</EmptyResults>
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}
