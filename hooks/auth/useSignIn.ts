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
    onSuccess: () => {
      push(routes.admin.base)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        isClosable: true,
      })
    },
  })
}
