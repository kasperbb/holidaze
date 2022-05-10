import { Auth } from '@interfaces/auth'
import { routes } from '@constants/routes'
import { signIn } from '@queries/auth'
import { useAuth } from '@context/AuthContext'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useSignIn({ email, password }: Auth.User) {
  const { user } = useAuth()
  const { push } = useRouter()
  const toast = useToast()

  return useMutation('signIn', () => signIn({ email, password }), {
    onSuccess: () => {
      setTimeout(() => push(user?.role === 'admin' ? routes.admin.base : routes.admin.accommodations.my), 500)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        duration: 20000,
        isClosable: true,
      })
    },
  })
}
