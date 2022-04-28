import { useMutation, useQueryClient } from 'react-query'

import { Accommodation } from '@interfaces/accommodation'
import { routes } from '@constants/routes'
import { toggleFeatured } from '@queries/accommodations'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useToggleFeatured({ id, featured, name }: Pick<Accommodation, 'id' | 'featured' | 'name'>) {
  const queryClient = useQueryClient()
  const toast = useToast()
  const router = useRouter()

  const newFeaturedValue = !featured

  return useMutation<Accommodation, Error>(() => toggleFeatured(id, newFeaturedValue), {
    onSuccess: () => {
      router.push(routes.admin.accommodations.base)
      toast({
        title: 'Success!',
        description: newFeaturedValue ? `Successfully set ${name} as featured.` : `Successfully unset ${name} as featured.`,
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
