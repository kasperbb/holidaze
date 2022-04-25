import * as Yup from 'yup'

import { Button, Container, FormControl, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react'

import { Card } from '@components/Card'
import { FormHelperError } from '@components/Forms/FormHelperError'
import { Message } from '@interfaces/messages'
import { useCreateMessage } from '@hooks/messages/useCreateMessage'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const formSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.').min(3, 'Password must be at least 3 characters long.'),
  email: Yup.string().required('Email is required').email('Has to be a valid email.'),
  message: Yup.string().required('Message is required'),
})

export default function Contact() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Message>({ resolver: yupResolver(formSchema) })

  const { mutate, isLoading } = useCreateMessage({ ...watch() })

  const onSubmit = handleSubmit(() => {
    mutate()
  })

  return (
    <Container py={36}>
      <Heading as="h1" fontSize={['4xl', '5xl', '6xl']} mb={6}>
        Contact Us
      </Heading>

      <Card as="form" maxWidth="2xl" onSubmit={onSubmit}>
        <FormControl mb={4} isInvalid={Boolean(errors.name)} isRequired>
          <FormLabel htmlFor="name" color="text.primary">
            Name
          </FormLabel>
          <Input id="name" type="text" {...register('name')} />
          <FormHelperError error={errors.name} />
        </FormControl>

        <FormControl mb={4} isInvalid={Boolean(errors.email)} isRequired>
          <FormLabel htmlFor="email" color="text.primary">
            Email
          </FormLabel>
          <Input id="email" type="email" {...register('email')} />
          <FormHelperError error={errors.email} />
        </FormControl>

        <FormControl mb={6} isInvalid={Boolean(errors.message)} isRequired>
          <FormLabel htmlFor="message" color="text.primary">
            Message
          </FormLabel>
          <Textarea id="message" {...register('message')} />
          <FormHelperError error={errors.message} />
        </FormControl>

        <Button type="submit" width="full" isLoading={isLoading} disabled={isLoading}>
          Send
        </Button>
      </Card>
    </Container>
  )
}
