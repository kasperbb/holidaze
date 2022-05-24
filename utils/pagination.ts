export const DEFAULT_PAGE_SIZE = 6

export function getPagination(page = 1, size = DEFAULT_PAGE_SIZE) {
  const limit = +size
  const from = (page - 1) * limit
  const to = from + (size - 1)

  return { from, to }
}
