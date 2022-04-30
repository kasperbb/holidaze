import { AccommodationFilter } from '@interfaces/accommodation'
import { filterAccommodations } from '@queries/accommodations'
import { useQuery } from 'react-query'

export function useFilterAccommodations(filter: AccommodationFilter) {
  const key = {
    ...filter,
    dateRange: [getDateKey(filter.dateRange[0]), getDateKey(filter.dateRange[1])],
  }

  return useQuery(['accommodationsFilter', key], () => filterAccommodations(filter))
}

function getDateKey(date: Date | undefined) {
  return `${date?.getUTCFullYear()}-${date?.getUTCMonth()}-${date?.getUTCDate()}`
}
