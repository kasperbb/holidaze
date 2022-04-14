import { Container, Flex, Grid, Heading, IconButton, Link, Select, Text } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Card } from '@components/Card'
import { FiPlus } from 'react-icons/fi'
import NextLink from 'next/link'
import { enforceAuth } from '@utils/enforceAuth'
import { getAccommodations } from '@api/accommodations'
import { maxLines } from '@utils/styleProps'
import { qk } from '@constants/queryKeys'
import { routes } from '@constants/routes'

export const getServerSideProps = enforceAuth(async ctx => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(qk.accommodations, () => getAccommodations())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: Number(ctx.params?.id),
    },
  }
})

export default function AdminHotels() {
  const { data } = useQuery(qk.accommodations, () => getAccommodations())

  return (
    <Container maxWidth="7xl">
      <Card as="div" maxWidth="full" width="full">
        <Flex align="center" justify="space-between" gap={5}>
          <Heading as="h1" fontSize="24px" fontWeight={500}>
            {data?.length} Hotels
          </Heading>

          <Flex gap={4}>
            <Select bgColor="white">
              <option value="option1">Sort by default</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>

            <NextLink href={routes.admin.accommodations.add} passHref>
              <IconButton as="a" icon={<FiPlus />} variant="primary" aria-label="Go back" />
            </NextLink>
          </Flex>
        </Flex>
      </Card>

      <Grid templateColumns="repeat(2, 1fr)" gap={4} width="full" my={10}>
        {data?.map(({ id, images, name, description }) => (
          <Card key={id} variant="horizontal" imageSrc={images ? images[0] : '/placeholder.png'}>
            <NextLink href={`${routes.admin.accommodations.base}/${id}`} passHref>
              <Link>
                <Heading as="h3" fontSize="19px" fontWeight={600}>
                  {name}
                </Heading>
              </Link>
            </NextLink>
            <Text sx={{ ...maxLines(3) }}>{description}</Text>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}
