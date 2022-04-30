import { Button, Grid, GridItem, Image } from '@chakra-ui/react'

import { Accommodation } from '@interfaces/accommodation'
import { Lightbox } from './Lightbox'
import { useIsDesktop } from '@hooks/useIsDesktop'
import { useState } from 'react'

type ImageGridProps = Pick<Accommodation, 'images'>

export function ImageGrid({ images }: ImageGridProps) {
  const isDesktop = useIsDesktop()
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  function handleImageClick(index: number) {
    setIsOpen(true)
    setLightboxIndex(index)
  }

  return (
    <>
      <Grid h="392px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" position="relative" gap={4}>
        <Button display={isDesktop ? 'none' : 'block'} size="sm" position="absolute" bottom={2} right={2} onClick={() => handleImageClick(0)}>
          All Images
        </Button>

        <GridItem
          rowSpan={2}
          colSpan={isDesktop ? 3 : 5}
          borderRadius="2xl"
          overflow="hidden"
          cursor="pointer"
          onClick={() => isDesktop && handleImageClick(0)}
        >
          <Image src={images[0].url} fallbackSrc="/placeholder.png" alt="" width="full" height="full" objectFit="cover" />
        </GridItem>
        {isDesktop &&
          images.slice(1, 5).map((image, index) => (
            <GridItem
              key={image.path}
              colSpan={1}
              borderRadius="2xl"
              opacity={0.6}
              overflow="hidden"
              cursor="pointer"
              transition="opacity 100ms ease-in-out"
              _hover={{ opacity: 1 }}
              onClick={() => handleImageClick(index + 1)}
            >
              <Image src={image.url} fallbackSrc="/placeholder.png" alt="" width="full" height="full" objectFit="cover" />
            </GridItem>
          ))}
      </Grid>

      <Lightbox images={images} isOpen={isOpen} activeIndex={lightboxIndex} setActiveIndex={setLightboxIndex} onClose={() => setIsOpen(false)} />
    </>
  )
}
