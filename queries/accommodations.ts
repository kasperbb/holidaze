import { Accommodation, AccommodationFilter, AddAccommodation } from '@interfaces/accommodation'
import { addAverageRatingToAccommodation, addAverageRatingToAccommodations } from '@utils/accommodations'
import { dateRange, includesSameDay } from '@utils/date'

import { getSortObject } from '@utils/common'
import { supabase } from '@lib/supabase'
import { uploadImages } from './upload'

const TABLE = 'accommodations'
const QUERY = `
  *,
  reviews (
    rating
  ),
  bookings (
    from,
    to
  )
`

export const getAccommodations = async (column: keyof Accommodation = 'created_at', ascending = false) => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).select(QUERY).order(column, { ascending })

  if (error) {
    throw new Error(error.message)
  }

  return addAverageRatingToAccommodations(data)
}

export const getFeaturedAccommodations = async () => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).select(QUERY).eq('featured', true)

  if (error) {
    throw new Error(error.message)
  }

  return addAverageRatingToAccommodations(data)
}

export const getAccommodationsForUser = async (userId: string | undefined, column: keyof Accommodation = 'created_at', ascending = false) => {
  if (!userId) return

  const { data, error } = await supabase.from<Accommodation>(TABLE).select(QUERY).eq('user_id', userId).order(column, { ascending })

  if (error) {
    throw new Error(error.message)
  }

  return addAverageRatingToAccommodations(data)
}

export const getAccommodation = async (id: number) => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).select(QUERY).eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return addAverageRatingToAccommodation(data)
}

export const getAccommodationsCount = async () => {
  const { error, count } = await supabase.from(TABLE).select('*', { count: 'exact' })

  if (error) {
    throw new Error(error.message)
  }

  return count
}

export const createAccommodation = async (obj: AddAccommodation) => {
  const imageUrls = await uploadImages(obj.images, {
    bucketName: 'images',
    folderName: obj.name,
  })

  const { data, error } = await supabase
    .from<Accommodation>(TABLE)
    .insert({ ...obj, images: imageUrls })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateAccommodation = async (id: number | undefined, obj: AddAccommodation, shouldDelete?: boolean) => {
  if (!obj.images) throw new Error('Images are required')

  const imageUrls = await uploadImages(
    obj.images,
    {
      bucketName: 'images',
      folderName: obj.name,
    },
    shouldDelete
  )

  const { data, error } = await supabase
    .from<Accommodation>(TABLE)
    .update({ ...obj, images: imageUrls })
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const toggleFeatured = async (id: number, featuredValue: boolean) => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).update({ featured: featuredValue }).eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteAccommodation = async (id: number) => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).delete().eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

const searchQuery = `
    id,
    name,
    images,
    reviews (
      rating
    )
`

interface SearchResult extends Pick<Accommodation, 'id' | 'name' | 'images'> {
  reviews: {
    rating: number
  }[]
}

export const searchAccommodations = async (query: string) => {
  const { data, error } = await supabase.from<SearchResult>(TABLE).select(searchQuery).textSearch('name', query, {
    type: 'websearch',
  })

  if (error) {
    throw new Error(error.message)
  }

  return data.map(accommodation => ({
    ...accommodation,
    rating: accommodation.reviews.reduce((sum, review) => sum + review.rating, 0) / accommodation.reviews.length,
  }))
}

export const filterAccommodations = async ({ search, dateRange, priceRange, rating, sortBy }: AccommodationFilter) => {
  let query = supabase.from<Accommodation>(TABLE).select(QUERY)

  if (search) query = query.textSearch('name', search, { type: 'websearch' })
  if (priceRange && priceRange.length) query = query.gte('price', priceRange[0]).lte('price', priceRange[1])
  if (sortBy) {
    const { key, ascending } = getSortObject(sortBy)
    query = query.order(key, { ascending })
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  let accommodations = addAverageRatingToAccommodations(data)

  if (rating) {
    accommodations = filterByRating(accommodations, rating)
  }

  if (dateRange[0] && dateRange[1]) {
    accommodations = filterByBookings(accommodations, dateRange[0], dateRange[1])
  }

  return accommodations
}

function filterByBookings(accommodations: Accommodation[], from: Date, to: Date) {
  return accommodations.filter(({ bookings }) => {
    if (!bookings?.length) return true
    const disabledDates = bookings?.reduce<Date[]>((acc, dates) => [...acc, ...dateRange(dates.from, dates.to)], [])
    return !includesSameDay(dateRange(from, to), disabledDates)
  })
}

function filterByRating(accommodations: Accommodation[], rating: number) {
  return accommodations.filter(accommodation => {
    return accommodation.rating! >= rating
  })
}
