import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Link,
  Select,
  Text,
  VisuallyHidden,
  chakra,
} from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { getAccommodation, getAccommodationPaths } from '@queries/accommodations'

import { Card } from '@components/Card'
import { DatePicker } from '@components/DatePicker'
import { GetStaticProps } from 'next/types'
import { ImageGrid } from '@components/ImageGrid'
import { Map } from '@components/Map'
import NextLink from 'next/link'
import { Reviews } from '@components/Accommodations/Reviews'
import { qk } from '@constants/queryKeys'
import { routes } from '@constants/routes'
import { useAuth } from '@context/AuthContext'

export const getStaticProps: GetStaticProps = async ctx => {
  const queryClient = new QueryClient()
  const accommodationId = Number(ctx.params?.id)

  await queryClient.prefetchQuery([qk.accommodation, ctx.params?.id], () => getAccommodation(accommodationId))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: accommodationId,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const paths = await getAccommodationPaths()

  const constructedPaths = paths?.map(path => ({ params: { id: path.id.toString() } }))

  return {
    paths: constructedPaths,
    fallback: true,
  }
}

export default function AccommodationDetails({ id }: { id: number }) {
  const { data } = useQuery([qk.accommodation, id], () => getAccommodation(id))
  const { user } = useAuth()

  if (!data) {
    return null
  }

  const [latitude, longitude] = data.location

  return (
    <Container py="88px">
      <ImageGrid images={data.images} />

      <Box mb={{ base: 0, md: 14 }} mt={8}>
        <Flex align="center" justify="space-between">
          <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
            {data.name}
          </Heading>

          {user && (
            <NextLink href={`${routes.admin.accommodations.base}/${data.id}`} passHref>
              <Button as={Link} variant="outline">
                Edit Accommodation
              </Button>
            </NextLink>
          )}
        </Flex>

        <Text mt={4}>{data.description}</Text>
      </Box>

      <Grid width="full" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }} gap={{ base: 12, md: 24 }} mt={8}>
        <GridItem width="full" colSpan={{ base: 3, md: 2 }}>
          <Heading as="h2" fontSize="2xl" mb={6}>
            Book
          </Heading>
          <chakra.form position="sticky" top={28}>
            <Card maxWidth={['full', 'full']} contentProps={{ display: 'grid', placeItems: 'center' }} borderRadius="full" mb={8}>
              <VisuallyHidden>
                <Heading as="h2">Price</Heading>
              </VisuallyHidden>
              <Flex as="p" align="end" gap={2} fontSize="4xl" color="success.500" fontWeight="semibold">
                €{data.price}
                <chakra.span fontSize="md" fontWeight="normal" color="text.secondary" lineHeight={2} mb={1}>
                  per night
                </chakra.span>
              </Flex>
            </Card>

            <Card maxWidth={['full', 'full']} overflow="visible">
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

              <HStack align="end">
                <FormControl width="40%" mr={4}>
                  <FormLabel htmlFor="to" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" mb={2}>
                    Guests
                  </FormLabel>
                  <Select bg="white">
                    <option value="option1">1</option>
                    <option value="option2">2</option>
                    <option value="option3">3</option>
                    <option value="option3">4</option>
                    <option value="option3">5</option>
                  </Select>
                </FormControl>

                <Button width="full">Book</Button>
              </HStack>
            </Card>
          </chakra.form>
        </GridItem>

        <GridItem width="full" colSpan={3} order={{ base: 1, md: -1 }}>
          <Box>
            <Heading as="h2" fontSize="2xl" mb={6}>
              Location
            </Heading>

            <Map markerList={[{ latitude: latitude, longitude: longitude }]} />
          </Box>

          <Box mt={14}>
            <Reviews accommodationId={data.id} />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}
