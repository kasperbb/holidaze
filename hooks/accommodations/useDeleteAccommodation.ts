import { useMutation, useQueryClient } from 'react-query'

import { Accommodation } from '@interfaces/accommodation'
import { deleteAccommodation } from '@queries/accommodations'
import { routes } from '@constants/routes'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useDeleteAccommodation(id: number) {
  const queryClient = useQueryClient()
  const toast = useToast()
  const router = useRouter()

  return useMutation<Accommodation, Error>(() => deleteAccommodation(id), {
    onSuccess: data => {
      router.push(routes.admin.accommodations.base)
      toast({
        title: 'Success!',
        description: `Successfully deleted ${data.name}`,
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
