import { Message } from '@interfaces/messages'
import { createMessage } from '@queries/messages'
import { useMutation } from 'react-query'

export function useCreateMessage(message: Message) {
  return useMutation<Message, Error>(() => createMessage(message))
}
