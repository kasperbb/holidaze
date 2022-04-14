import {
  Badge,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Spinner,
  Text,
  chakra,
} from '@chakra-ui/react'
import { FiBookmark, FiChevronDown, FiSearch } from 'react-icons/fi'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { AiFillStar } from 'react-icons/ai'
import { Card } from '@components/Card'
import { DatePicker } from '@components/DatePicker'
import { GetStaticProps } from 'next'
import NextLink from 'next/link'
import { StarRating } from '@components/StarRating'
import { getAccommodations } from '@api/accommodations'
import { qk } from '@constants/queryKeys'
import { useState } from 'react'

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

export default function Accommodations() {
  const { data } = useQuery(qk.accommodations, () => getAccommodations())

  const [filterPriceValue, setFilterPriceValue] = useState([50, 300])

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
                €{filterPriceValue[0]} - €{filterPriceValue[1]}
              </Badge>

              <RangeSlider min={0} max={500} step={5} defaultValue={filterPriceValue} onChange={setFilterPriceValue}>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="to" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                Filter by rating
              </FormLabel>
              <StarRating rating={1} size={6} />
            </FormControl>
          </Card>
        </GridItem>
        <GridItem width="full" colSpan={4}>
          {data?.map(item => (
            <Card
              key={item.id}
              variant="horizontal"
              imageSrc={item.images ? item.images[0] : '/placeholder.png'}
              imageAlt="Holidaze"
              mb={4}
              contentProps={{ width: 'full', display: 'flex', flexDirection: 'column' }}
            >
              <NextLink href={`/accommodations/${item.id}`} passHref>
                <Link display="block" flex="1 1 0%" _hover={{ textDecoration: 'none' }} mb={4}>
                  <Heading as="h3" fontSize="25px" fontWeight="semibold">
                    {item.name}
                  </Heading>
                </Link>
              </NextLink>

              <Flex align="center" justify="space-between" gap={10}>
                <Flex align="center" color="orange.800" fontWeight="bold" fontSize="sm" gap={2} aria-label="Average rating">
                  <Badge display="flex" alignItems="center" fontSize="sm" borderRadius="md" colorScheme="orange" px={1}>
                    4/5
                  </Badge>
                  Average
                </Flex>
                <Text fontSize="20px" fontWeight="semibold" color="success.500" whiteSpace="nowrap">
                  €{item.price}
                  <chakra.span fontSize="14px" color="text.secondary" fontWeight="normal" ml={2}>
                    per night
                  </chakra.span>
                </Text>
              </Flex>
            </Card>
          ))}
        </GridItem>
      </Grid>
    </Container>
  )
}
