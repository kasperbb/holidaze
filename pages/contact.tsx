import { Button, Container, FormControl, FormLabel, Heading, Input, Textarea, useToast } from '@chakra-ui/react'

import { Card } from '@components/Card'
import { Message } from '@interfaces/messages'
import { useCreateMessage } from '@hooks/messages/useCreateMessage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function Contact() {
  const { register, watch, handleSubmit } = useForm<Message>()
  const toast = useToast()

  const mutation = useCreateMessage({ ...watch() })

  const onSubmit = handleSubmit(() => {
    mutation.mutate()
  })

  useEffect(() => {
    if (mutation.isError) {
      toast({
        title: 'Error!',
        description: mutation.error.message,
        status: 'error',
        isClosable: true,
      })
    }

    if (mutation.isSuccess) {
      toast({
        title: 'Success!',
        description: `Successfully sent message`,
        status: 'success',
        isClosable: true,
      })
    }
  }, [mutation.data, mutation.error, mutation.isError, mutation.isSuccess, toast])

  return (
    <Container py={36}>
      <Heading as="h1" fontSize={['4xl', '5xl', '6xl']} mb={6}>
        Contact Us
      </Heading>

      <Card as="form" maxWidth="2xl" onSubmit={onSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="name" color="text.primary">
            Name
          </FormLabel>
          <Input id="name" type="text" {...register('name')} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="email" color="text.primary">
            Email
          </FormLabel>
          <Input id="email" type="email" {...register('email')} />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel htmlFor="message" color="text.primary">
            Message
          </FormLabel>
          <Textarea id="message" {...register('message')} />
        </FormControl>

        <Button type="submit" width="full" isLoading={mutation.isLoading}>
          Send
        </Button>
      </Card>
    </Container>
  )
}
