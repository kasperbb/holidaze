import { searchAccommodations } from '@api/accommodations'
import { useQuery } from 'react-query'

export function useSearchAccommodations(query: string) {
  return useQuery(['accommodationsSearch', query], () => searchAccommodations(query), {
    enabled: false,
  })
}
