import { Container, Spinner, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

import { Card } from '@components/Card'
import { getAccommodationCount } from '@queries/accommodations'
import { useQuery } from 'react-query'

export default function AdminHome() {
  const { data } = useQuery('accommodationsCount', getAccommodationCount)

  return (
    <Container maxWidth="7xl">
      <Card as="div" maxWidth="full" width="full">
        <Stat>
          <StatLabel>Accommodations</StatLabel>
          <StatNumber>{data ? data : <Spinner />}</StatNumber>
        </Stat>
      </Card>
    </Container>
  )
}
