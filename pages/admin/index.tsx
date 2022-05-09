import { Container, Flex, Grid, Heading, Image, Link, Progress, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { FiBookOpen, FiMessageSquare, FiStar } from 'react-icons/fi'
import { getWeekArray, isSameDay } from '@utils/date'

import { Card } from '@components/Cards/Card'
import Head from 'next/head'
import { IconType } from 'react-icons'
import { MdBed } from 'react-icons/md'
import NextLink from 'next/link'
import { StarRating } from '@components/StarRating'
import dynamic from 'next/dynamic'
import { enforceAuth } from '@utils/enforceAuth'
import { getAccommodations } from '@queries/accommodations'
import { getAllReviews } from '@queries/reviews'
import { getBookings } from '@queries/bookings'
import { getMessages } from '@queries/messages'
import { lineChartOptions } from '@constants/charts'
import { routes } from '@constants/routes'
import { useCallback } from 'react'
import { useQuery } from 'react-query'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const getServerSideProps = enforceAuth()

export default function AdminHome() {
  const { data: accommodations, isLoading: accommodationsLoading } = useQuery(['accommodations'], () => getAccommodations())
  const { data: bookings, isLoading: bookingsLoading } = useQuery(['bookings'], () => getBookings())
  const { data: reviews } = useQuery(['reviews'], () => getAllReviews())
  const { data: messages } = useQuery(['messages'], () => getMessages())

  const getChartData = useCallback(
    () => [
      {
        name: 'Accommodations',
        data: getCountForWeek(accommodations),
      },
      {
        name: 'Bookings',
        data: getCountForWeek(bookings),
      },
      {
        name: 'Messages',
        data: getCountForWeek(messages),
      },
      {
        name: 'Reviews',
        data: getCountForWeek(reviews),
      },
    ],
    [accommodations, bookings, messages, reviews]
  )

  return (
    <>
      <Head>
        <title>Dashboard — Holidaze</title>
      </Head>

      <Container maxWidth="7xl" alignItems="flex-start">
        <Card width="full" mb={8}>
          <Heading as="h2" fontSize="3xl" mb={4}>
            Stats
          </Heading>
          <Flex gap={8} wrap="wrap">
            <StatItem title="Accommodations" number={accommodations?.length ?? 0} icon={MdBed} />
            <StatItem title="Bookings" number={bookings?.length ?? 0} icon={FiBookOpen} />
            <StatItem title="Messages" number={messages?.length ?? 0} icon={FiMessageSquare} />
            <StatItem title="Reviews" number={reviews?.length ?? 0} icon={FiStar} />
          </Flex>
        </Card>

        <Card width="full" mb={8}>
          <Heading as="h2" fontSize="3xl" mb={4}>
            Timeline
          </Heading>
          <ApexChart options={lineChartOptions} series={getChartData()} type="area" width="100%" height="100%" />
        </Card>

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} width="full" gap={8}>
          <Card width="full">
            <Heading as="h2" fontSize="3xl" mb={4}>
              Bookings
            </Heading>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Dates</Th>
                  <Th>Accommodation</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookingsLoading && <Spinner />}
                {bookings?.slice(0, 10).map(({ id, from, to, accommodation, user }) => (
                  <Tr key={id}>
                    <Td display="flex" alignItems="center" gap={2}>
                      <Image src="user_placeholder.jpg" alt="" width={6} height={6} borderRadius="full" />
                      {user?.email}
                    </Td>
                    <Td title={`${Intl.DateTimeFormat('default').format(new Date(from))} - ${Intl.DateTimeFormat('default').format(new Date(to))}`}>
                      {Intl.DateTimeFormat('default').format(new Date(from))} - {Intl.DateTimeFormat('default').format(new Date(to))}
                    </Td>
                    <Td display="flex" alignItems="center" gap={2}>
                      <Image src={accommodation?.images[0].url ?? '/placeholder.png'} alt="" width={6} height={6} borderRadius="full" />
                      {accommodation?.name}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>

          <Card width="full">
            <Heading as="h2" fontSize="3xl" mb={4}>
              Top Accommodations
            </Heading>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Average Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {accommodationsLoading && <Spinner />}
                {accommodations
                  ?.sort((a, b) => Number(b.rating) - Number(a.rating))
                  .slice(0, 10)
                  .map(({ id, name, rating, images }) => (
                    <Tr key={id} _hover={{ bg: 'gray.50' }}>
                      <Td>
                        <NextLink href={`${routes.accommodations.base}/${id}`} passHref>
                          <Link display="flex" alignItems="center" gap={2}>
                            <Image src={images[0].url} alt="" width={6} height={6} borderRadius="full" />
                            <Text color="text.primary" width="140px" isTruncated>
                              {name}
                            </Text>
                          </Link>
                        </NextLink>
                      </Td>
                      <Td>
                        <StarRating rating={rating} />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Card>
        </Grid>
      </Container>
    </>
  )
}

interface StatItemProps {
  icon: IconType
  title: string
  number: number
}

export function StatItem({ icon, title, number }: StatItemProps) {
  const Icon = icon
  return (
    <Flex direction="column">
      <Flex alignItems="center">
        <Flex alignItems="center" justifyContent="center" borderRadius="12px" h="30px" w="30px" bg="blue.500" me="6px">
          <Icon color="white" />
        </Flex>
        <Text fontSize="sm" color="text.secondary" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
      <Text fontSize="lg" color="text.primary" fontWeight="bold" mb="6px" my="6px">
        {number}
      </Text>
      <Progress colorScheme="teal" borderRadius="12px" h="5px" value={56} />
    </Flex>
  )
}

function getCountForWeek<T extends { created_at?: string }>(items: T[] | undefined) {
  const week = getWeekArray()

  return week.map(day => items?.filter(item => isSameDay(day, new Date(item.created_at!))).length ?? 0)
}
