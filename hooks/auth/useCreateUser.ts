import { Auth } from '@interfaces/auth'
import { createUser } from '@queries/auth'
import { routes } from '@constants/routes'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useCreateUser(user: Auth.User) {
  const toast = useToast()
  const { push } = useRouter()

  return useMutation(() => createUser(user), {
    onSuccess: () => {
      push(routes.admin.accommodations.my)
      toast({
        title: 'Success!',
        description: `Please check your email to confirm your account.`,
        status: 'success',
        duration: 20000,
        isClosable: true,
      })
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
