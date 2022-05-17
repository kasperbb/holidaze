import { Accommodation } from '@interfaces/accommodation'
import { TOAST_DURATION } from '@constants/toast'
import { routes } from '@constants/routes'
import { toggleFeatured } from '@queries/accommodations'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export function useToggleFeatured({ id, featured, name }: Pick<Accommodation, 'id' | 'featured' | 'name'>) {
  const toast = useToast()
  const router = useRouter()

  return useMutation<Accommodation, Error>(() => toggleFeatured(id, !featured), {
    onSuccess: () => {
      router.push(routes.admin.accommodations.base)
      toast({
        title: 'Success!',
        description: !featured ? `Successfully set ${name} as featured.` : `Successfully removed ${name} from featured.`,
        status: 'success',
        duration: TOAST_DURATION,
        isClosable: true,
      })
    },
    onError: () => {
      toast({
        title: 'Error!',
        description: `Something went wrong! Couldn't set ${name} as featured.`,
        status: 'error',
        duration: TOAST_DURATION,
        isClosable: true,
      })
    },
  })
}
