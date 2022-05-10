import { Accommodation, AddAccommodation } from '@interfaces/accommodation'
import { useMutation, useQueryClient } from 'react-query'

import { updateAccommodation } from '@queries/accommodations'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useUpdateAccommodation(id: number | undefined, accommodation: AddAccommodation, shouldDelete?: boolean) {
  const queryClient = useQueryClient()
  const toast = useToast()
  const router = useRouter()

  return useMutation<Accommodation, Error>(() => updateAccommodation(id, accommodation, shouldDelete), {
    onSuccess: data => {
      router.back()
      toast({
        title: 'Success!',
        description: `Successfully updated ${data.name}`,
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
