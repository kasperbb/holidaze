import { Accommodation } from '@interfaces/accommodation'
import { FeaturedLocation } from './FeaturedLocation'
import { Grid } from '@chakra-ui/react'

export function FeaturedLocations({ featuredLocations }: { featuredLocations: Accommodation[] | undefined }) {
  if (!featuredLocations?.length) return null

  return (
    <Grid h={['full', '392px']} templateRows={['repeat(1, 1fr)', 'repeat(2, 1fr)']} templateColumns="repeat(4, 1fr)" position="relative" gap={[4, 8]}>
      <FeaturedLocation size="md" rowSpan={[1, 2]} colSpan={[4, 2]} location={featuredLocations[0]} />
      {featuredLocations.slice(1, 5).map(location => (
        <FeaturedLocation key={location.id} colSpan={[2, 1]} location={location} />
      ))}
    </Grid>
  )
}
