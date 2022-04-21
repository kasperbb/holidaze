import { Auth } from '@interfaces/auth'
import { createUser } from '@queries/auth'
import { useMutation } from 'react-query'
import { useToast } from '@chakra-ui/react'

export function useCreateUser(user: Auth.User) {
  const toast = useToast()

  return useMutation(() => createUser(user), {
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: `Successfully registered account. Please check your email to confirm.`,
        status: 'success',
        isClosable: true,
      })
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
