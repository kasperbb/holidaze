import { searchAccommodations } from '@queries/accommodations'
import { useQuery } from 'react-query'

export function useSearchAccommodations(query: string) {
  return useQuery(['accommodationsSearch', query], () => searchAccommodations(query), {
    enabled: false,
  })
}
