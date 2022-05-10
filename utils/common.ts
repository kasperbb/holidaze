export function mod(n: number, m: number) {
  const remain = n % m
  return Math.floor(remain >= 0 ? remain : remain + m)
}

export function getImageExt(type: string) {
  switch (type) {
    case 'image/jpeg':
      return '.jpg'
    case 'image/png':
      return '.png'
    case 'image/gif':
      return '.gif'
    default:
      return '.jpg'
  }
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function replaceSpacesStr(path: string) {
  return path.replace(/\s/g, '-').toLowerCase()
}

export function getSortObject<T = unknown>(sortBy: string) {
  const [sortByKey, sortByDirection] = sortBy.split('-') as [keyof T, string]

  return { key: sortByKey, ascending: sortByDirection !== 'desc' }
}
