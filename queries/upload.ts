import { getRandomInt, replaceSpacesStr } from '@utils/common'

import { Image } from '@interfaces/accommodation'
import { supabase } from '@lib/supabase'

interface UploadImagesOptions {
  bucketName: string
  folderName: string
}

export async function uploadImages(files: File[], options: UploadImagesOptions, shouldDelete?: boolean) {
  const folderName = replaceSpacesStr(options.folderName)

  if (shouldDelete) {
    const { data: list } = await supabase.storage.from(options.bucketName).list(folderName)
    const filesToRemove = list?.map(x => `${folderName}/${x.name}`)

    if (filesToRemove) {
      await supabase.storage.from(options.bucketName).remove(filesToRemove)
    }
  }

  const promises = files.map(file => {
    return supabase.storage.from(options.bucketName).upload(`${folderName}/${getRandomInt(0, 999999999999)}-${replaceSpacesStr(file.name)}`, file, {
      upsert: true,
    })
  })

  const responses = await Promise.all(promises)

  responses.forEach(res => {
    if (res.error) throw new Error(res.error.message)
  })

  const keys = getKeys(responses)

  return getImageObject(keys, 60 * 60 * 24 * 7 * 52)
}

async function getImageObject(keys: string[], expires: number): Promise<Image[]> {
  const { data, error } = await supabase.storage.from('images').createSignedUrls(keys, expires)

  if (error) {
    throw new Error(error.message)
  }

  return data?.map(item => ({ url: item.signedURL, path: item.path })) ?? []
}

interface UploadResponse {
  data: {
    Key: string
  } | null
  error: Error | null
}

function getKeys(responses: UploadResponse[]) {
  return responses.reduce<string[]>((acc, res) => {
    if (res.data?.Key) {
      return [...acc, res.data.Key.split('/').slice(1, res.data.Key.length).join('/')]
    }

    return acc
  }, [])
}

export async function downloadImages(images: Image[] | undefined) {
  if (!images) return

  const promises = images.map(({ path }) => {
    return path && supabase.storage.from('images').download(path)
  })

  if (!promises) throw new Error('Failed to download images')

  const res = await Promise.all(promises)

  return res.map((file, index) => {
    if (typeof file === 'string' || !file?.data) throw new Error('Failed to download images')
    return {
      file: new File([file.data], images[index].path?.split('/')[1] ?? `name-${index}.jpg`),
      dataURL: images[index].url,
    }
  })
}
