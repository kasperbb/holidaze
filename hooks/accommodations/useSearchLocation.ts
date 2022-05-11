import { Location } from '@interfaces/location'
import { searchLocation } from '@queries/location'
import { useQuery } from 'react-query'

export function useSearchLocation(query: string) {
  return useQuery<Location.Response, Error, Location.LongLat | undefined>(['locationSearch', query], () => searchLocation(query), {
    select: data => {
      if (!data.features?.length) return undefined
      return data.features[0].center
    },
    enabled: false,
  })
}
