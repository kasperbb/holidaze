import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Progress,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UseRadioGroupProps,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react'
import { FiBookOpen, FiMessageSquare, FiStar } from 'react-icons/fi'
import { getDatesArray, isSameDay } from '@utils/date'
import { getLineChartOptions, lineChartOptions } from '@constants/charts'
import { useCallback, useState } from 'react'

import { Card } from '@components/Cards/Card'
import Head from 'next/head'
import { IconType } from 'react-icons'
import { MdBed } from 'react-icons/md'
import NextLink from 'next/link'
import { StarRating } from '@components/StarRating'
import dynamic from 'next/dynamic'
import { enforceAdmin } from '@utils/enforceAuth'
import { formatDate } from '@utils/formatDate'
import { getAccommodations } from '@queries/accommodations'
import { getAllReviews } from '@queries/reviews'
import { getBookings } from '@queries/bookings'
import { getMessages } from '@queries/messages'
import { routes } from '@constants/routes'
import { useQuery } from 'react-query'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const getServerSideProps = enforceAdmin()

export default function AdminHome() {
  const { data: accommodations, isLoading: accommodationsLoading } = useQuery(['accommodations'], () => getAccommodations())
  const { data: bookings, isLoading: bookingsLoading } = useQuery(['bookings'], () => getBookings())
  const { data: reviews } = useQuery(['reviews'], () => getAllReviews())
  const { data: messages } = useQuery(['messages'], () => getMessages())

  const [chartDays, setChartDays] = useState(14)

  const getChartData = useCallback(
    () => [
      {
        name: 'Accommodations',
        data: getCountForDates(accommodations, chartDays),
      },
      {
        name: 'Bookings',
        data: getCountForDates(bookings, chartDays),
      },
      {
        name: 'Messages',
        data: getCountForDates(messages, chartDays),
      },
      {
        name: 'Reviews',
        data: getCountForDates(reviews, chartDays),
      },
    ],
    [accommodations, bookings, chartDays, messages, reviews]
  )

  const getChartOptions = useCallback(() => getLineChartOptions(chartDays), [chartDays])

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
          <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between" gap={4} mb={4}>
            <Heading as="h2" fontSize="3xl">
              Timeline
            </Heading>

            <ChartNavigation value={chartDays} defaultValue={14} onChange={val => setChartDays(Number(val))} />
          </Flex>

          <ApexChart options={getChartOptions()} series={getChartData()} type="area" width="100%" height="100%" />
        </Card>

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(5, 1fr)' }} width="full" gap={8}>
          <GridItem width="full" colSpan={3}>
            <Card as="div" width="full">
              <Heading as="h2" fontSize="3xl" mb={4}>
                Bookings
              </Heading>

              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>User</Th>
                      <Th>Dates</Th>
                      <Th>Accommodation</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {bookings?.slice(0, 10).map(({ id, from, to, accommodation, user }) => (
                      <Tr key={id} _hover={{ bg: 'gray.50' }}>
                        <Td display="flex" alignItems="center" gap={2}>
                          <NextLink href={`mailto:${user?.email}`} passHref>
                            <Link display="flex" alignItems="center" gap={2}>
                              <Image src="user_placeholder.jpg" alt="" width={6} height={6} borderRadius="full" />
                              {user?.email}
                            </Link>
                          </NextLink>
                        </Td>
                        <Td>
                          {formatDate(from, { weekday: undefined, year: undefined })} - {formatDate(to, { weekday: undefined, year: undefined })}
                        </Td>
                        <Td display="flex" alignItems="center" gap={2}>
                          <NextLink href={`${routes.accommodations.base}/${id}`} passHref>
                            <Link display="flex" alignItems="center" gap={2}>
                              <Image src={accommodation?.images[0].url ?? '/placeholder.png'} alt="" width={6} height={6} borderRadius="full" />
                              {accommodation?.name}
                            </Link>
                          </NextLink>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              {bookingsLoading && (
                <Flex width="full" justify="center" mt={8}>
                  <Spinner />
                </Flex>
              )}
            </Card>
          </GridItem>

          <GridItem width="full" colSpan={{ base: 3, xl: 2 }}>
            <Card as="div" width="full">
              <Heading as="h2" fontSize="3xl" mb={4}>
                Top Accommodations
              </Heading>

              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Average Rating</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
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
              </TableContainer>

              {accommodationsLoading && (
                <Flex width="full" justify="center" mt={8}>
                  <Spinner />
                </Flex>
              )}
            </Card>
          </GridItem>
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

function StatItem({ icon, title, number }: StatItemProps) {
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

function ChartNavigation({ name, defaultValue, value, onChange }: UseRadioGroupProps) {
  const options = [
    { label: 'This week', value: 7 },
    { label: 'Past 2 weeks', value: 14 },
    { label: 'Past month', value: 30 },
    { label: 'Past year', value: 365 },
  ]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange,
  })

  const group = getRootProps()

  return (
    <ButtonGroup size="sm" isAttached variant="outline" {...group}>
      {options.map(({ label, value }, index) => (
        <RadioButton key={value} index={index} length={options.length} {...getRadioProps({ value })}>
          {label}
        </RadioButton>
      ))}
    </ButtonGroup>
  )
}

function RadioButton({ children, index, length, ...rest }: UseRadioProps & { children: React.ReactNode; index: number; length: number }) {
  const { getInputProps, getCheckboxProps } = useRadio(rest)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  let borderStyles

  if (index === 0) {
    borderStyles = {
      borderRightRadius: 0,
    }
  }

  if (index > 0 && index < length - 1) {
    borderStyles = {
      borderLeftRadius: 0,
      borderRightRadius: 0,
    }
  }

  if (index === length - 1) {
    borderStyles = {
      borderLeftRadius: 0,
    }
  }

  return (
    <Box as="label">
      <input {...input} />
      <Button
        {...checkbox}
        {...borderStyles}
        as="div"
        cursor="pointer"
        _checked={{
          bg: 'blue.500',
          color: 'white',
          borderColor: 'blue.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        {children}
      </Button>
    </Box>
  )
}

function getCountForDates<T extends { created_at?: string }>(items: T[] | undefined, days = 14) {
  const dates = getDatesArray(days)

  return dates.map(day => items?.filter(item => isSameDay(day, new Date(item.created_at!))).length ?? 0)
}
