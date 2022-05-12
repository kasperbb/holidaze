import { useEffect, useRef, useState } from 'react'

import { Location } from '@interfaces/location'
import { MAP_LOCATION } from '@constants/map'
import { MapRef } from 'react-map-gl'
import { useDebounce } from './useDebouce'
import { useSearchLocation } from './accommodations/useSearchLocation'

export function useLocationState(query: string, initialState?: Location.LongLat) {
  const [location, setLocation] = useState<Location.LongLat>(initialState ?? MAP_LOCATION)
  const debouncedLocationQuery = useDebounce(query, 500)
  const ref = useRef<MapRef>(null)

  const { refetch, isFetching, data: locationResponse } = useSearchLocation(debouncedLocationQuery)

  useEffect(() => {
    if (debouncedLocationQuery.length) {
      refetch()
    }
  }, [debouncedLocationQuery, refetch])

  useEffect(() => {
    if (locationResponse) {
      setLocation(locationResponse)
      ref.current?.flyTo({ center: locationResponse, zoom: 13 })
    }
  }, [locationResponse])

  return { location, setLocation, isFetching, ref }
}
