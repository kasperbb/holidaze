import { Accommodation, AddAccommodation } from '@interfaces/accommodation'

import { createAccommodation } from '@api/accommodations'
import { useMutation } from 'react-query'

export function useCreateAccommodation(hotelObj: AddAccommodation) {
  return useMutation<Accommodation, Error>(() => createAccommodation(hotelObj))
}
