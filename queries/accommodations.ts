import { Accommodation, AddAccommodation } from '@interfaces/accommodation'
import { addAverageRatingToAccommodation, addAverageRatingToAccommodations } from '@utils/accommodations'

import { supabase } from '@lib/supabase'
import { uploadImages } from './upload'

const TABLE = 'accommodations'
const QUERY = `
  *,
  reviews (
    rating
  )
`

export const getAccommodations = async () => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).select(QUERY)

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

export const getAccommodationCount = async () => {
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

export const updateAccommodation = async (id: number, obj: Accommodation) => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).update(obj).eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteAccommodation = async (id: number) => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).delete().eq('id', id)

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

  return addAverageRatingToResults(data)
}

function addAverageRatingToResults(results: SearchResult[]) {
  return results.map(result => ({
    ...result,
    rating: result.reviews.reduce((sum, review) => sum + review.rating, 0) / result.reviews.length,
  }))
}
