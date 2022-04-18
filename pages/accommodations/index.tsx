import {
  Badge,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react'
import { FiChevronDown, FiSearch } from 'react-icons/fi'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Card } from '@components/Card'
import { DatePicker } from '@components/DatePicker'
import { Filter } from '@interfaces/filter'
import { GetStaticProps } from 'next'
import { HorizontalAccommodationCard } from '@components/HorizontalAccommodationCard'
import { StarRating } from '@components/StarRating'
import { getAccommodations } from '@queries/accommodations'
import { qk } from '@constants/queryKeys'
import { useReducer } from 'react'

export const getStaticProps: GetStaticProps = async ctx => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qk.accommodations, () => getAccommodations())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: Number(ctx.params?.id),
    },
  }
}

function reducer(state: Filter.State, action: Filter.Action) {
  let newState = state

  switch (action.type) {
    case 'SET_SEARCH':
      newState = { ...state, search: action.payload }
      break
    case 'SET_FROM':
      newState = { ...state, from: action.payload }
      break
    case 'SET_TO':
      newState = { ...state, to: action.payload }
      break
    case 'SET_PRICE_RANGE':
      newState = { ...state, priceRange: action.payload }
      break
    case 'SET_RATING':
      newState = { ...state, rating: action.payload }
      break
    default:
      throw new Error('Invalid action type')
  }

  return newState
}

const initialState: Filter.State = {
  search: '',
  from: new Date(),
  to: new Date(),
  priceRange: [50, 300],
  rating: 0,
}

export default function Accommodations() {
  const { data } = useQuery(qk.accommodations, () => getAccommodations())

  const [filter, dispatch] = useReducer(reducer, initialState)

  return (
    <Container py={40}>
      <Card
        variant="horizontal"
        contentProps={{ width: 'full', display: 'flex', flexDirection: { base: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}
        px={6}
      >
        <Heading as="h1" fontSize={['lg', 'xl', '2xl']} fontWeight="medium" textAlign="center">
          219 Accommodations found
        </Heading>

        <Menu>
          <MenuButton as={Button} rightIcon={<FiChevronDown />} aria-label="Sort" variant="outline" fontWeight="normal" px={4}>
            Sort by default
          </MenuButton>
          <MenuList>
            <MenuOptionGroup defaultValue="asc" type="radio">
              <MenuItemOption value="asc">Ascending</MenuItemOption>
              <MenuItemOption value="desc">Descending</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Card>

      <Grid width="full" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(6, 1fr)' }} gap={8} mt={8}>
        <GridItem width="full" colSpan={{ base: 4, md: 2 }}>
          <Card overflow="visible">
            <FormControl mb={4}>
              <FormLabel htmlFor="from" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Search
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.300" />
                </InputLeftElement>
                <Input borderRadius="lg" placeholder="Search" fontSize="sm" />
              </InputGroup>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="from" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                From
              </FormLabel>
              <DatePicker selected={new Date()} onChange={date => console.log(date)} isOutline />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="to" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                To
              </FormLabel>
              <DatePicker selected={new Date()} onChange={date => console.log(date)} isOutline />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="to" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Filter by price
              </FormLabel>

              <Badge colorScheme="twitter" fontWeight="normal" fontSize="sm" borderRadius="sm" py={1} px={2} mb={1}>
                €{filter.priceRange[0]} - €{filter.priceRange[1]}
              </Badge>

              <RangeSlider
                min={0}
                max={500}
                step={5}
                defaultValue={filter.priceRange}
                onChange={range => dispatch({ type: Filter.ActionType.SET_PRICE_RANGE, payload: range })}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel htmlFor="to" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Filter by rating
              </FormLabel>
              <StarRating rating={filter.rating} size={6} onClick={num => dispatch({ type: Filter.ActionType.SET_RATING, payload: num })} />
            </FormControl>

            <Button type="submit" width="full">
              Apply
            </Button>
          </Card>
        </GridItem>
        <GridItem width="full" colSpan={4}>
          {data?.map(item => (
            <HorizontalAccommodationCard key={item.id} {...item} />
          ))}
        </GridItem>
      </Grid>
    </Container>
  )
}
