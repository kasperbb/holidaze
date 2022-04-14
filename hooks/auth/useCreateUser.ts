import { Auth } from '@interfaces/auth'
import { createUser } from '@api/auth'
import { useMutation } from 'react-query'

export function useCreateUser(user: Auth.User) {
  return useMutation(() => createUser(user))
}
