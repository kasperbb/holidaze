import { getAccommodation, getAccommodationPaths } from '@api/accommodations'
import { Box, Button, chakra, Container, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Link, Text, VisuallyHidden } from '@chakra-ui/react'
import { Card } from '@components/Card'
import { DatePicker } from '@components/DatePicker'
import { ImageGrid } from '@components/ImageGrid'
import { Map } from '@components/Map'
import { Review } from '@components/Review'
import { useAuth } from '@context/AuthContext'
import { type GetStaticProps } from 'next/types'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import NextLink from 'next/link'
import { qk } from '@constants/queryKeys'

export const getStaticProps: GetStaticProps = async ctx => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([qk.accommodation, ctx.params?.id], () => getAccommodation(Number(ctx.params?.id)))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: ctx.params?.id,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const paths = await getAccommodationPaths()

  const constructedPaths = paths.map(path => ({ params: { id: path.id.toString() } }))

  return {
    paths: constructedPaths,
    fallback: true,
  }
}

export default function AccommodationDetails({ id }: { id: number }) {
  const { data } = useQuery([qk.accommodation, id], () => getAccommodation(Number(id)))
  const { user } = useAuth()

  if (!data) {
    return null
  }

  const [latitude, longitude] = data.location

  return (
    <Container py="88px">
      <ImageGrid images={data.images} />

      <Box mb={{ base: 0, md: 14 }} mt={8}>
        <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
          {data.name}
        </Heading>

        <Text mt={4}>{data.description}</Text>
      </Box>

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }} gap={{ base: 12, md: 24 }} mt={8}>
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
            <Heading as="h2" fontSize="2xl" mb={6}>
              Reviews
            </Heading>

            <Flex direction="column" gap={6}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Review key={index} />
              ))}
            </Flex>
          </Box>
        </GridItem>
      </Grid>

      {user && (
        <NextLink href={`/admin/hotels/${data.id}`} passHref>
          <Button as={Link} position="fixed" bottom={5} right={5}>
            Edit Hotel
          </Button>
        </NextLink>
      )}
    </Container>
  )
}
