import { useMutation, useQueryClient } from 'react-query'

import { routes } from '@constants/routes'
import { signOut } from '@queries/auth'
import { useRouter } from 'next/router'

export function useSignOut() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation(() => signOut(), {
    onSuccess: () => {
      queryClient.removeQueries()
      router.push(routes.base)
    },
  })
}
