import { Message } from '@interfaces/messages'
import { createMessage } from '@queries/messages'
import { useMutation } from 'react-query'
import { useToast } from '@chakra-ui/react'

export function useCreateMessage(message: Message) {
  const toast = useToast()

  return useMutation<Message, Error>(() => createMessage(message), {
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: `Successfully sent message`,
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
