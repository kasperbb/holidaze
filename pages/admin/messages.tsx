import { Button, Container, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Heading, Text, VisuallyHidden, chakra } from '@chakra-ui/react'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Card } from '@components/Cards/Card'
import { EmptyResults } from '@components/EmptyResults'
import Head from 'next/head'
import { Message } from '@interfaces/messages'
import { SortByInput } from '@components/Forms/Inputs/SortByInput'
import { enforceAdmin } from '@utils/enforceAuth'
import { getMessages } from '@queries/messages'
import { getSortObject } from '@utils/common'
import { maxLines } from '@utils/styleProps'
import { useForm } from 'react-hook-form'

export const getServerSideProps = enforceAdmin(async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['messages', 'created_at-desc'], () => getMessages())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const

export default function AdminMessages() {
  const { watch, control } = useForm<{ sortBy: string }>({
    defaultValues: { sortBy: 'created_at-desc' },
  })

  const { key, ascending } = getSortObject<Message>(watch('sortBy'))

  const { data } = useQuery(['messages', watch('sortBy')], () => getMessages(key, ascending))

  return (
    <>
      <Head>
        <title>Messages — Holidaze</title>
      </Head>

      <Container maxWidth="7xl">
        <Card as="div" maxWidth="full" width="full">
          <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between" gap={5}>
            <Heading as="h1" fontSize="24px" fontWeight={500}>
              {data?.length} Messages
            </Heading>

            <Flex direction={{ base: 'column', sm: 'row' }} alignItems="center" gap={4}>
              <FormControl display="flex" alignItems="center" width="unset" gap={4}>
                <FormLabel htmlFor="sortBy" color="text.primary" whiteSpace="nowrap" fontSize="sm" fontWeight="normal" m={0}>
                  Sort by
                </FormLabel>
                <SortByInput
                  name="sortBy"
                  control={control}
                  options={[
                    { label: 'Newest', value: 'created_at-desc' },
                    { label: 'Oldest', value: 'created_at-asc' },
                  ]}
                />
              </FormControl>
            </Flex>
          </Flex>
        </Card>

        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="full" my={10}>
          {data?.map(({ id, name, email, message, created_at }) => (
            <Card key={id}>
              <chakra.dl fontSize="sm" mb={4} aria-label="Contact information">
                <VisuallyHidden>
                  <Heading as="h3">Contact information</Heading>
                </VisuallyHidden>

                <HStack>
                  <chakra.dt minWidth={10}>Name</chakra.dt>
                  <chakra.dd fontWeight="semibold">{name}</chakra.dd>
                </HStack>

                <HStack>
                  <chakra.dt minWidth={10}>Email</chakra.dt>
                  <chakra.dd fontWeight="semibold">{email}</chakra.dd>
                </HStack>

                <HStack>
                  <chakra.dt minWidth={10}>Date</chakra.dt>
                  <chakra.dd fontWeight="semibold">{new Intl.DateTimeFormat('default', dateOptions).format(new Date(created_at!))}</chakra.dd>
                </HStack>
              </chakra.dl>

              <Text sx={{ ...maxLines(3) }} mb={6}>
                {message}
              </Text>

              <Flex justify="flex-end">
                <Button as="a" href={`mailto:${email}`} variant="secondary">
                  Respond
                </Button>
              </Flex>
            </Card>
          ))}

          <GridItem colSpan={2}>
            <EmptyResults data={data}>No messages found</EmptyResults>
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}
