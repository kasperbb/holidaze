export function dateRange(startDate: Date | string | null, endDate: Date | string | null, steps = 1) {
  if (!startDate || !endDate) return []

  const dateArray = []
  let currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate))
    currentDate.setUTCDate(currentDate.getUTCDate() + steps)
  }

  return dateArray
}

export function isSameDay(a: Date | undefined, b: Date | undefined) {
  return a?.getUTCFullYear() === b?.getUTCFullYear() && a?.getUTCMonth() === b?.getUTCMonth() && a?.getUTCDate() === b?.getUTCDate()
}

export function includesSameDay(a: Date[] | undefined, b: Date[] | undefined) {
  return a?.some(dateOne => b?.some(dateTwo => isSameDay(dateOne, dateTwo))) ?? false
}
