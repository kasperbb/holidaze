import { Auth } from '@interfaces/auth'
import { createUser } from '@queries/auth'
import { useMutation } from 'react-query'

export function useCreateUser(user: Auth.User) {
  return useMutation(() => createUser(user))
}
