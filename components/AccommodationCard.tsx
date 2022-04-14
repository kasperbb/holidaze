import { Button, Flex, Heading, Link, Text, chakra } from '@chakra-ui/react'

import { Accommodation } from '@interfaces/accommodation'
import { Card } from './Card'
import { FiBookmark } from 'react-icons/fi'
import NextLink from 'next/link'
import { StarRating } from './StarRating'

export function AccommodationCard({ id, name, images, price }: Accommodation) {
  return (
    <Card imageSrc={images ? images[0] : '/placeholder.png'} imageAlt="Holidaze">
      <StarRating rating={3.5} />

      <NextLink href={`/accommodations/${id}`} passHref>
        <Link display="block" flex="1 1 0%" _hover={{ textDecoration: 'none' }}>
          <Heading as="h3" fontSize="25px" fontWeight="semibold" my={2}>
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

        <Button variant="primary" leftIcon={<FiBookmark />}>
          Book
        </Button>
      </Flex>
    </Card>
  )
}
