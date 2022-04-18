import { Accommodation, AddAccommodation } from '@interfaces/accommodation'

import { supabase } from '@lib/supabase'
import { uploadImages } from './upload'

const TABLE = 'accommodations'

export const getAccommodations = async () => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getAccommodation = async (id: number) => {
  const { data, error } = await supabase.from<Accommodation>(TABLE).select().eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
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

export const searchAccommodations = async (query: string) => {
  const { data, error } = await supabase.from(TABLE).select().textSearch('name', query, {
    type: 'websearch',
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
