import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  chakra,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'

import { Logo } from '@components/Logo'
import { PasswordField } from '@components/Forms/Fields/PasswordField'
import { useCreateUser } from '@hooks/auth/useCreateUser'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface RegisterFormData {
  email: string
  password: string
}

export default function Register() {
  const { register, watch, handleSubmit } = useForm<RegisterFormData>()

  const createUserMutation = useCreateUser({ ...watch() })

  const onSubmit = handleSubmit(() => {
    if (createUserMutation.isLoading) return
    createUserMutation.mutate()
  })

  useEffect(() => {
    if (createUserMutation.isSuccess) console.log('SUCCESS')
  }, [createUserMutation.isSuccess])

  return (
    <Container maxW="lg" py={{ base: '12', md: '' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>Register an account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <chakra.form
          onSubmit={onSubmit}
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" {...register('email')} />
              </FormControl>
              <PasswordField {...register('password')} />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultIsChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Button variant="solid" colorScheme="blue" type="submit" isLoading={createUserMutation.isLoading} disabled={createUserMutation.isLoading}>
              Register
            </Button>
          </Stack>
        </chakra.form>
      </Stack>
    </Container>
  )
}
