export function dateRange(startDate: Date | string | null, endDate: Date | string | null, steps = 1) {
  if (!startDate || !endDate) return []

  const dateArray = []
  let currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + steps)
  }

  return dateArray
}

export function isSameDay(a: Date | undefined, b: Date | undefined) {
  return a?.getFullYear() === b?.getFullYear() && a?.getMonth() === b?.getMonth() && a?.getDate() === b?.getDate()
}

export function includesSameDay(a: Date[] | undefined, b: Date[] | undefined) {
  return a?.some(dateOne => b?.some(dateTwo => isSameDay(dateOne, dateTwo))) ?? false
}

export function getDatesArray(days = 14) {
  const today = new Date()
  return Array.from({ length: days })
    .map((_, index) => {
      return new Date(today.getFullYear(), today.getMonth(), today.getDate() - index)
    })
    .reverse()
}
