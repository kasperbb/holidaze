import { Button, Flex, Heading, IconButton, Link, Text, chakra } from '@chakra-ui/react'

import { Accommodation } from '@interfaces/accommodation'
import { Card } from './Card'
import { FiBookmark } from 'react-icons/fi'
import NextLink from 'next/link'
import { StarRating } from '../StarRating'
import { useIsDesktop } from '@hooks/useIsDesktop'

export function AccommodationCard({ id, name, images, price, rating }: Accommodation) {
  const isDesktop = useIsDesktop()

  return (
    <Card imageSrc={images ? images[0].url : '/placeholder.png'} imageAlt="Holidaze">
      <StarRating rating={rating ?? 0} />

      <NextLink href={`/accommodations/${id}`} passHref>
        <Link display="block" flex="1 1 0%" _hover={{ textDecoration: 'none' }}>
          <Heading as="h3" fontSize={['16px', '25px']} fontWeight="semibold" my={2}>
            {name}
          </Heading>
        </Link>
      </NextLink>

      <Flex align="end" justify="space-between" gap={10}>
        <Text fontSize="20px" fontWeight="semibold" color="success.500" whiteSpace="nowrap">
          €{price}
          <chakra.span fontSize="14px" color="text.secondary" fontWeight="normal" ml={2}>
            per night
          </chakra.span>
        </Text>

        {isDesktop ? (
          <Button variant="primary" leftIcon={<FiBookmark />}>
            Book
          </Button>
        ) : (
          <IconButton variant="primary" icon={<FiBookmark />} p={3} aria-label="Book" />
        )}
      </Flex>
    </Card>
  )
}
