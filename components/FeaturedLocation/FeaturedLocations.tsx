import { Accommodation } from '@interfaces/accommodation'
import { FeaturedLocation } from './FeaturedLocation'
import { Grid } from '@chakra-ui/react'

export function FeaturedLocations({ featuredLocations }: { featuredLocations: Accommodation[] | undefined }) {
  if (!featuredLocations?.length) return null

  return (
    <Grid h="392px" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" position="relative" gap={8}>
      <FeaturedLocation size="md" rowSpan={2} colSpan={2} {...featuredLocations[0]} />
      {featuredLocations.slice(1, 5).map(location => (
        <FeaturedLocation key={location.id} {...location} />
      ))}
    </Grid>
  )
}
