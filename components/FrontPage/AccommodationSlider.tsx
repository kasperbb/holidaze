import { Box, Flex, Heading, IconButton, chakra } from '@chakra-ui/react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { Swiper as ReactSwiper, SwiperSlide, useSwiper } from 'swiper/react'

import { Accommodation } from '@interfaces/accommodation'
import { AccommodationCard } from '../AccommodationCard'
import { useState } from 'react'

const Swiper = chakra(ReactSwiper)

export function AccommodationSlider({ accommodations }: { accommodations: Accommodation[] | undefined }) {
  const [activeSlide, setActiveSlide] = useState(1)

  if (!accommodations) {
    return null
  }

  return (
    <Swiper
      slidesPerView="auto"
      onActiveIndexChange={swiper => setActiveSlide(swiper.activeIndex + 1)}
      spaceBetween={30}
      grabCursor
      ml={{ base: 0, lg: 80 }}
      px={{ base: 10, lg: 0 }}
      py={24}
    >
      <chakra.span slot="container-start">
        <Heading as="h2" fontSize={['4xl', '5xl']} mb={6}>
          Our Most Popular Locations
        </Heading>
      </chakra.span>
      {accommodations.map(hotel => (
        <SwiperSlide key={hotel.id}>
          <AccommodationCard {...hotel} />
        </SwiperSlide>
      ))}
      <SwiperControls activeSlide={activeSlide} allSlides={accommodations.length ?? 0} />
    </Swiper>
  )
}

interface SwiperControlsProps {
  activeSlide: number
  allSlides: number
}
export function SwiperControls({ activeSlide, allSlides }: SwiperControlsProps) {
  const swiper = useSwiper()

  return (
    <Flex align="center" justify="space-between" mr={{ base: 0, lg: 40 }}>
      <Box border="1px solid" borderColor="muted" borderRadius="full" px={6} py={2} mt={10}>
        {activeSlide} / {allSlides}
      </Box>
      <Flex border="1px solid" borderColor="muted" borderRadius="full" bg="white" mt={10}>
        <IconButton
          width={16}
          height={10}
          borderRadius="full"
          borderRightRadius={0}
          bg="white"
          color="primary.text"
          _hover={{ bg: 'muted' }}
          aria-label="Slide previous"
          icon={<FiArrowLeft />}
          onClick={() => swiper.slidePrev()}
        />
        <IconButton
          width={16}
          height={10}
          borderRadius="full"
          borderLeftRadius={0}
          bg="white"
          color="primary.text"
          _hover={{ bg: 'muted' }}
          aria-label="Slide next"
          icon={<FiArrowRight />}
          onClick={() => swiper.slideNext()}
        />
      </Flex>
    </Flex>
  )
}
