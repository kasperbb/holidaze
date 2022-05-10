import { Alert, AlertDescription, AlertIcon, AlertTitle, Container } from '@chakra-ui/react'

import Head from 'next/head'
import { enforceAuth } from '@utils/enforceAuth'

export const getServerSideProps = enforceAuth()

export default function AdminError() {
  return (
    <>
      <Head>
        <title>Error — Holidaze</title>
      </Head>

      <Container maxWidth="7xl" alignItems="flex-start">
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="lg"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Error!
          </AlertTitle>
          <AlertDescription maxWidth="sm">This page is only accessible by superadmin users.</AlertDescription>
        </Alert>
      </Container>
    </>
  )
}
