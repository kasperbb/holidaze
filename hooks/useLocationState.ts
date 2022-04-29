import { useEffect, useRef, useState } from 'react'

import { MapRef } from 'react-map-gl'
import { useDebounce } from './useDebouce'
import { useSearchLocation } from './accommodations/useSearchLocation'

export function useLocationState(query: string, initialState?: [latitude: number, longitude: number]) {
  const [location, setLocation] = useState<[latitude: number, longitude: number]>(initialState ?? [60.3914191, 5.3248788])
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
      const { latitude, longitude } = locationResponse
      setLocation([latitude, longitude])
      ref.current?.flyTo({ center: [longitude, latitude], zoom: 13 })
    }
  }, [locationResponse])

  return { location, setLocation, isFetching, ref }
}
