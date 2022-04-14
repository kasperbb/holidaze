import { Message } from '@interfaces/messages'
import { supabase } from '@lib/supabase'

const TABLE = 'messages'

export const getMessages = async () => {
  const { data, error } = await supabase.from<Message[]>(TABLE).select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getMessagePaths = async () => {
  const { data, error } = await supabase.from<{ id: string }>(TABLE).select('id')

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getMessage = async (id: number) => {
  const { data, error } = await supabase.from<Message>(TABLE).select().eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const createMessage = async (obj: Message) => {
  const { data, error } = await supabase.from<Message>(TABLE).insert(obj).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
