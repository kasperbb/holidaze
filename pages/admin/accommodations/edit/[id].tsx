import { Container, Flex, Heading, chakra } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { AccommodationForm } from '@components/Forms/AccommodationForm'
import { BackButton } from '@components/BackButton'
import { Card } from '@components/Cards/Card'
import { FiEdit } from 'react-icons/fi'
import Head from 'next/head'
import { PropsWithId } from '@interfaces/common'
import { enforceAuth } from '@utils/enforceAuth'
import { getAccommodation } from '@queries/accommodations'

export const getServerSideProps = enforceAuth(async ctx => {
  const queryClient = new QueryClient()
  const id = Number(ctx.params?.id)

  await queryClient.prefetchQuery(['accommodation', id], () => getAccommodation(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
})

const EditIcon = chakra(FiEdit)

export default function AdminEditAccommodation({ id }: PropsWithId) {
  const { data } = useQuery(['accommodation', id], () => getAccommodation(id))

  return (
    <>
      <Head>
        <title>Edit {data?.name} — Holidaze</title>
      </Head>

      <Container maxWidth="7xl">
        <Card as="div" maxWidth="full" width="full">
          <Flex align="center" gap={5}>
            <BackButton variant="primary" aria-label="Go back" />
            <Heading as="h1" fontSize="24px" fontWeight={500}>
              Edit {data?.name}
            </Heading>
          </Flex>
        </Card>

        <Card variant="no-padding" maxWidth="full" width="full" my={10}>
          <Flex align="center" borderBottom="1px solid" borderColor="muted" py={6} px={8} gap={4}>
            <EditIcon width="20px" height="20px" />
            <Heading as="h2" fontSize="24px" fontWeight={500}>
              Listing Information
            </Heading>
          </Flex>

          <AccommodationForm accommodation={data} />
        </Card>
      </Container>
    </>
  )
}
