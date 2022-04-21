export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', ...options } as const

  if (typeof date === 'string') {
    return new Intl.DateTimeFormat('default', dateOptions).format(new Date(date))
  }

  return new Intl.DateTimeFormat('default', dateOptions).format(date)
}
