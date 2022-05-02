import { Box, Collapse, Flex, GridItem, GridItemProps, Heading, Image, Text } from '@chakra-ui/react'

import { Accommodation } from '@interfaces/accommodation'
import { MdAdsClick } from 'react-icons/md'
import NextLink from 'next/link'
import { StarRating } from '@components/StarRating'
import { maxLines } from '@utils/styleProps'
import { routes } from '@constants/routes'
import { useState } from 'react'

interface FeaturedLocationProps extends Omit<GridItemProps, 'id'> {
  location: Accommodation
  size?: 'sm' | 'md'
}

export function FeaturedLocation({ location: { id, name, rating, description, images }, size = 'sm', ...rest }: FeaturedLocationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NextLink href={`${routes.accommodations.base}/${id}`} passHref>
      <GridItem as="a" borderRadius="2xl" overflow="hidden" cursor="pointer" position="relative" maxHeight={size === 'sm' ? '180px' : '392px'} {...rest}>
        <Flex
          direction="column"
          justify="end"
          position="absolute"
          width="full"
          height="full"
          p={8}
          zIndex={2}
          _before={{
            content: '""',
            width: 'full',
            height: 'full',
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            opacity: 0.5,
            background: 'transparent linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,1))',
            transition: 'opacity 250ms ease-in-out',
          }}
          _hover={{
            '&:before': { opacity: 0.8 },
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Box position="absolute" top={5} right={5} opacity={0.8}>
            <MdAdsClick color="white" size={size === 'sm' ? 20 : 30} />
          </Box>
          <Heading as="h3" color="white" mb={1} fontSize={size === 'sm' ? 'lg' : '4xl'}>
            {name}
          </Heading>
          <StarRating rating={rating} size={size === 'sm' ? 3 : 5} />
          <Collapse in={isOpen} animateOpacity>
            <Text color="gray.200" mt={2} sx={{ ...maxLines(size === 'sm' ? 2 : 3) }}>
              {description}
            </Text>
          </Collapse>
        </Flex>
        <Image src={images[0].url} fallbackSrc="/placeholder.png" alt="" width="full" height="full" objectFit="cover" />
      </GridItem>
    </NextLink>
  )
}
