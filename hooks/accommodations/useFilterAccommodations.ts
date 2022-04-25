import { AccommodationFilter } from '@interfaces/accommodation'
import { filterAccommodations } from '@queries/accommodations'
import { useQuery } from 'react-query'

export function useFilterAccommodations(filter: AccommodationFilter) {
  return useQuery(['accommodationsFilter', filter], () => filterAccommodations(filter))
}
