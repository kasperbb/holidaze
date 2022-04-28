import { Grid, GridItem, Image } from '@chakra-ui/react'

import { Accommodation } from '@interfaces/accommodation'

export function FeaturedLocations({ featuredLocations }: { featuredLocations: Accommodation[] | undefined }) {
  if (!featuredLocations) return null

  return (
    <Grid h="392px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" position="relative" gap={4}>
      <GridItem rowSpan={2} colSpan={3} borderRadius="2xl" overflow="hidden" cursor="pointer">
        <Image src={featuredLocations[0].images[0].url} fallbackSrc="/placeholder.png" alt="" width="full" height="full" objectFit="cover" />
      </GridItem>
      {featuredLocations.slice(1, 5).map(({ images }) => (
        <GridItem
          key={images[0].url}
          colSpan={1}
          borderRadius="2xl"
          opacity={0.6}
          overflow="hidden"
          cursor="pointer"
          transition="opacity 100ms ease-in-out"
          _hover={{ opacity: 1 }}
        >
          <Image src={images[0].url!} fallbackSrc="/placeholder.png" alt="" width="full" height="full" objectFit="cover" />
        </GridItem>
      ))}
    </Grid>
  )
}
