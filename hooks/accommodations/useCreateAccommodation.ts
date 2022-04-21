import { Accommodation, AddAccommodation } from '@interfaces/accommodation'
import { useMutation, useQueryClient } from 'react-query'

import { createAccommodation } from '@queries/accommodations'
import { routes } from '@constants/routes'
import { useAuth } from '@context/AuthContext'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useCreateAccommodation(accommodation: AddAccommodation) {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const toast = useToast()
  const router = useRouter()

  return useMutation<Accommodation, Error>(() => createAccommodation({ ...accommodation, user_id: user?.id }), {
    onSuccess: () => {
      router.push(routes.admin.accommodations.base)
      toast({
        title: 'Success!',
        description: `Successfully created hotel with the name: ${accommodation.name}`,
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
    onSettled: () => {
      queryClient.invalidateQueries(['accommodations'])
    },
  })
}
