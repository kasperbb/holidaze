import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { getAccommodations, getFeaturedAccommodations } from '@queries/accommodations'

import { AccommodationSlider } from '@components/FrontPage/AccommodationSlider'
import { ExploreCard } from '@components/Cards/ExploreCard'
import { FeaturedLocations } from '@components/FeaturedLocation/FeaturedLocations'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { HeroSection } from '@components/FrontPage/Hero'
import { Stats } from '@components/Stats'
import { TrianglePattern } from '@components/Icons/TrianglePattern'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('accommodations', () => getAccommodations())
  await queryClient.prefetchQuery(['accommodations', 'featured'], () => getFeaturedAccommodations())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  }
}

export default function Home() {
  const { data } = useQuery('accommodations', () => getAccommodations())
  const { data: featured } = useQuery(['accommodations', 'featured'], () => getFeaturedAccommodations())

  return (
    <>
      <Head>
        <title>Home — Holidaze</title>
      </Head>

      <HeroSection />

      <Container>
        <Stats />

        <ExploreCard />
      </Container>

      <Box position="relative" bgColor="#f7fafc" my={24}>
        <TrianglePattern height="unset" width="full" position="absolute" top="99%" transform="rotate(180deg)" />
        <TrianglePattern height="unset" width="full" position="absolute" bottom="99%" />
        <Container py={24}>
          <Flex direction="column" alignItems="center">
            <Heading fontSize={['4xl', '5xl']} textAlign="center" mb={4}>
              Featured Locations
            </Heading>

            <Text maxW="2xl" textAlign="center" mb={10}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>

            <FeaturedLocations featuredLocations={featured} />
          </Flex>
        </Container>
      </Box>

      <AccommodationSlider accommodations={data} />
    </>
  )
}
