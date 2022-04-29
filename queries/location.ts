export async function searchLocation(query: string) {
  const res = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${process.env.NEXT_PUBLIC_POSITIONSTACK_KEY}&query=${encodeURIComponent(query)}&limit=1`
  )
  const { data } = await res.json()
  return data[0]
}
