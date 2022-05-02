import { Container, Grid, GridItem, Spinner, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'

import { Card } from '@components/Cards/Card'
import Head from 'next/head'
import { getAccommodationsCount } from '@queries/accommodations'
import { getBookingsCount } from '@queries/bookings'
import { getReviewsCount } from '@queries/reviews'
import { useQuery } from 'react-query'

export default function AdminHome() {
  const { data: accommodationsCount, isLoading: accommodationsLoading } = useQuery(['accommodations', 'count'], getAccommodationsCount)
  const { data: bookingsCount, isLoading: bookingsLoading } = useQuery(['bookings', 'count'], getBookingsCount)
  const { data: messagesCount, isLoading: messagesLoading } = useQuery(['messages', 'count'], getReviewsCount)
  const { data: reviewsCount, isLoading: reviewsLoading } = useQuery(['reviews', 'count'], getReviewsCount)

  return (
    <>
      <Head>
        <title>Admin — Holidaze</title>
      </Head>

      <Container maxWidth="7xl">
        <Grid templateColumns="repeat(4, 1fr)" gap={8}>
          <GridItem>
            <StatCard label="Accommodations" number={accommodationsCount} isLoading={accommodationsLoading} />
          </GridItem>
          <GridItem>
            <StatCard label="Bookings" number={bookingsCount} isLoading={bookingsLoading} />
          </GridItem>
          <GridItem>
            <StatCard label="Messages" number={messagesCount} isLoading={messagesLoading} />
          </GridItem>
          <GridItem>
            <StatCard label="Reviews" number={reviewsCount} isLoading={reviewsLoading} />
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}

interface StatCardProps {
  label: string
  number: number | null | undefined
  helpText?: string
  isLoading?: boolean
}

export function StatCard({ label, number, helpText, isLoading }: StatCardProps) {
  return (
    <Card as="div" maxWidth="full" width="full">
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{isLoading ? <Spinner /> : number}</StatNumber>
        {helpText && <StatHelpText>{helpText}</StatHelpText>}
      </Stat>
    </Card>
  )
}
