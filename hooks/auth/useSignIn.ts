import { Auth } from '@interfaces/auth'
import { signIn } from '@queries/auth'
import { useMutation } from 'react-query'

export function useSignIn({ email, password }: Auth.User) {
  return useMutation('signIn', () => signIn({ email, password }))
}
