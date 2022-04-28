import { Accommodation, AddAccommodation } from '@interfaces/accommodation'
import { useMutation, useQueryClient } from 'react-query'

import { updateAccommodation } from '@queries/accommodations'
import { useToast } from '@chakra-ui/react'

export function useUpdateAccommodation(id: number | undefined, accommodation: AddAccommodation, shouldDelete?: boolean) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation<Accommodation, Error>(() => updateAccommodation(id, accommodation, shouldDelete), {
    onSuccess: data => {
      toast({
        title: 'Success!',
        description: `Successfully updated ${data.name}`,
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
