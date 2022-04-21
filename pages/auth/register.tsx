import * as Yup from 'yup'

import { Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Heading, Input, Text } from '@chakra-ui/react'
import { FieldError, useForm } from 'react-hook-form'

import { Card } from '@components/Card'
import NextLink from 'next/link'
import { PasswordInput } from '@components/Forms/Inputs/PasswordInput'
import { routes } from '@constants/routes'
import { useCreateUser } from '@hooks/auth/useCreateUser'
import { yupResolver } from '@hookform/resolvers/yup'

interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
}

const formSchema = Yup.object().shape({
  email: Yup.string().required('Email is required.').email('Has to be a valid email.'),

  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long.'),

  confirmPassword: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match.'),
})

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: yupResolver(formSchema), delayError: 500, defaultValues: { email: '', password: '', confirmPassword: '' } })

  const { mutate, isLoading } = useCreateUser({ email: watch('email'), password: watch('password') })

  const onSubmit = handleSubmit(() => {
    if (isLoading) return
    mutate()
  })

  return (
    <Container maxWidth={['lg', 'lg', 'lg']} py={36}>
      <Heading as="h1" fontSize={['4xl', '5xl', '6xl']} mb={6}>
        Register
      </Heading>

      <HStack mb={4}>
        <Text>Already have an account?</Text>
        <NextLink href={routes.auth.signIn} passHref>
          <Button as="a" variant="link" color="blue.500" size="sm">
            Sign in!
          </Button>
        </NextLink>
      </HStack>

      <Card as="form" maxWidth="2xl" onSubmit={onSubmit}>
        <FormControl mb={4} isInvalid={Boolean(errors.email)} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" required {...register('email')} />
          <FormHelperError error={errors.email}>Must be a valid email.</FormHelperError>
        </FormControl>

        <FormControl mb={4} isInvalid={Boolean(errors.password)} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <PasswordInput id="password" {...register('password')} />
          <FormHelperError error={errors.password}>Must be min. 6 characters long.</FormHelperError>
        </FormControl>

        <FormControl mb={6} isInvalid={Boolean(errors.confirmPassword)} isRequired>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <PasswordInput id="confirmPassword" {...register('confirmPassword')} />
          <FormHelperError error={errors.confirmPassword}>Must match password.</FormHelperError>
        </FormControl>

        <Button type="submit" width="full" isLoading={isLoading} disabled={isLoading}>
          Register
        </Button>
      </Card>
    </Container>
  )
}

interface FormHelperErrorProps {
  children: React.ReactNode
  error: FieldError | undefined
}

export function FormHelperError({ children, error }: FormHelperErrorProps) {
  return Boolean(error) ? <FormErrorMessage>{error?.message}</FormErrorMessage> : <FormHelperText>{children}</FormHelperText>
}
