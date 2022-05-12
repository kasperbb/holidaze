import { Auth } from '@interfaces/auth'
import { routes } from '@constants/routes'
import { signIn } from '@queries/auth'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useSignIn({ email, password }: Auth.User) {
  const { push } = useRouter()
  const toast = useToast()

  return useMutation('signIn', () => signIn({ email, password }), {
    onSuccess: user => {
      push(user?.role === 'admin' ? routes.admin.base : routes.admin.accommodations.my)
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
