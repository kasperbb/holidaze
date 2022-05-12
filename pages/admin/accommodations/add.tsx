import { Container, Flex, Heading, chakra } from '@chakra-ui/react'

import { AccommodationForm } from '@components/Forms/AccommodationForm'
import { BackButton } from '@components/BackButton'
import { Card } from '@components/Cards/Card'
import { FiEdit } from 'react-icons/fi'
import Head from 'next/head'
import { enforceAuth } from '@utils/enforceAuth'

export const getServerSideProps = enforceAuth()

const EditIcon = chakra(FiEdit)

export default function AdminAddAccommodation() {
  return (
    <>
      <Head>
        <title>Add Accommodation — Holidaze</title>
      </Head>

      <Container maxWidth="7xl">
        <Card as="div" maxWidth="full" width="full">
          <Flex align="center" gap={5}>
            <BackButton variant="primary" aria-label="Go back" />
            <Heading as="h1" fontSize="24px" fontWeight={500}>
              Add Accommodation
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

          <AccommodationForm />
        </Card>
      </Container>
    </>
  )
}
