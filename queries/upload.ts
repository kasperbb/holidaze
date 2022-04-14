import { getRandomInt } from '@utils/common'
import { supabase } from '@lib/supabase'

interface UploadImagesOptions {
  bucketName: string
  folderName: string
}

export async function uploadImages(files: File[], options: UploadImagesOptions) {
  const promises = files.map(file => {
    return supabase.storage.from(options.bucketName).upload(`${options.folderName}/${getRandomInt(0, 999999999999)}-${file.name}`, file)
  })

  const responses = await Promise.all(promises)

  responses.forEach(res => {
    if (res.error) throw new Error(res.error.message)
  })

  const keys = getKeys(responses)

  return getSignedUrls(keys, 60 * 60 * 24 * 7 * 52)
}

async function getSignedUrls(keys: string[], expires: number) {
  const { data, error } = await supabase.storage.from('images').createSignedUrls(keys, expires)

  if (error) {
    throw new Error(error.message)
  }

  return data?.map(item => item.signedURL) ?? []
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
