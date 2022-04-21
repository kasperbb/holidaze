import { Box, Button, Container, Flex, Grid, GridItem, Heading, Link, Spinner, Text, VisuallyHidden, chakra } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { BookingForm } from '@components/Forms/BookingForm'
import { Card } from '@components/Card'
import { GetServerSideProps } from 'next/types'
import { ImageGrid } from '@components/ImageGrid'
import { Map } from '@components/Map'
import NextLink from 'next/link'
import { Reviews } from '@components/Accommodations/Reviews'
import { getAccommodation } from '@queries/accommodations'
import { routes } from '@constants/routes'
import { useAuth } from '@context/AuthContext'
import { useIsDesktop } from '@hooks/useIsDesktop'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const queryClient = new QueryClient()
  const id = Number(ctx.params?.id)

  await queryClient.prefetchQuery(['accommodation', id], () => getAccommodation(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
}

export default function AccommodationDetails({ id }: { id: number }) {
  const { data } = useQuery(['accommodation', id], () => getAccommodation(id))
  const { user } = useAuth()
  const isDesktop = useIsDesktop()

  if (!data) {
    return <Spinner />
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

          {user && isDesktop && (
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
          <Box position="sticky" top={28}>
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

            <BookingForm accommodationId={id} />
          </Box>
        </GridItem>

        <GridItem width="full" colSpan={3} order={{ base: 1, md: -1 }}>
          <Box>
            <Heading as="h2" fontSize="2xl" mb={6}>
              Location
            </Heading>

            <Map markerList={[{ latitude: latitude, longitude: longitude }]} lat={latitude} long={longitude} />
          </Box>

          <Box mt={14}>
            <Reviews accommodationId={data.id} />
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}
