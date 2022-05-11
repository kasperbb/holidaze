export async function searchLocation(query: string) {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?limit=1&types=place&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
  )
  return await res.json()
}
