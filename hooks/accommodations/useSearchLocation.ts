import { searchLocation } from '@queries/location'
import { useQuery } from 'react-query'

export function useSearchLocation(query: string) {
  return useQuery(['locationSearch', query], () => searchLocation(query), {
    enabled: false,
  })
}
