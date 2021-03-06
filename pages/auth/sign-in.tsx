import { Button, Container, FormControl, FormLabel, HStack, Heading, Input, Text } from '@chakra-ui/react'

import { Card } from '@components/Cards/Card'
import Head from 'next/head'
import NextLink from 'next/link'
import { PasswordInput } from '@components/Forms/Inputs/PasswordInput'
import { routes } from '@constants/routes'
import { supabase } from '@lib/supabase'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useSignIn } from '@hooks/auth/useSignIn'

interface SignInFormData {
  email: string
  password: string
}

export default function SignIn() {
  const { register, watch, handleSubmit } = useForm<SignInFormData>()
  const { mutate, isLoading } = useSignIn({ ...watch() })
  const { query } = useRouter()

  useEffect(() => {
    if (query?.force_logout === 'true' && typeof window !== 'undefined') {
      supabase.auth.signOut()
    }
  }, [query?.force_logout])

  const onSubmit = handleSubmit(() => {
    if (isLoading) return
    mutate()
  })

  return (
    <>
      <Head>
        <title>Sign In — Holidaze</title>
      </Head>

      <Container maxWidth={['lg', 'lg', 'lg']} py={36}>
        <Heading as="h1" fontSize={['4xl', '5xl', '6xl']} mb={6}>
          Sign In
        </Heading>

        <HStack mb={4}>
          <Text>Don&apos;t have an account?</Text>
          <NextLink href={routes.auth.register} passHref>
            <Button as="a" variant="link" color="blue.500" size="sm">
              Register!
            </Button>
          </NextLink>
        </HStack>

        <Card as="form" maxWidth="2xl" onSubmit={onSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register('email')} />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <PasswordInput {...register('password')} />
          </FormControl>

          <Button type="submit" width="full" isLoading={isLoading} disabled={isLoading}>
            Sign In
          </Button>
        </Card>
      </Container>
    </>
  )
}
