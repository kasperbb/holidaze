export function isFile(arg: unknown): arg is File {
  return arg instanceof File
}

export function isFileArray(arg: unknown): arg is File[] {
  return Array.isArray(arg) && arg.some(item => item instanceof File)
}
