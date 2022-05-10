import { Accommodation, AddAccommodation } from '@interfaces/accommodation'
import { useMutation, useQueryClient } from 'react-query'

import { createAccommodation } from '@queries/accommodations'
import { useAuth } from '@context/AuthContext'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useCreateAccommodation(accommodation: AddAccommodation) {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const toast = useToast()
  const router = useRouter()

  return useMutation<Accommodation, Error>(() => createAccommodation({ ...accommodation, user_id: user?.id }), {
    onSuccess: data => {
      router.back()
      toast({
        title: 'Success!',
        description: `Successfully created ${data.name}`,
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
    onSettled: () => {
      queryClient.invalidateQueries(['accommodations'])
    },
  })
}
