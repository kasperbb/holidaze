import { Badge, Flex, Heading, Link, Text, chakra } from '@chakra-ui/react'

import { Accommodation } from '@interfaces/accommodation'
import { Card } from './Card'
import NextLink from 'next/link'

export function HorizontalAccommodationCard({ id, name, images, price }: Accommodation) {
  return (
    <Card
      key={id}
      variant="horizontal"
      imageSrc={images ? images[0] : '/placeholder.png'}
      imageAlt="Holidaze"
      mb={4}
      contentProps={{ width: 'full', display: 'flex', flexDirection: 'column' }}
    >
      <NextLink href={`/accommodations/${id}`} passHref>
        <Link display="block" flex="1 1 0%" _hover={{ textDecoration: 'none' }} mb={4}>
          <Heading as="h3" fontSize="25px" fontWeight="semibold">
            {name}
          </Heading>
        </Link>
      </NextLink>

      <Flex align="center" justify="space-between" gap={10}>
        <Flex align="center" color="orange.800" fontWeight="bold" fontSize="sm" gap={2} aria-label="Average rating">
          <Badge display="flex" alignItems="center" fontSize="sm" borderRadius="md" colorScheme="orange" px={1}>
            4/5
          </Badge>
          Average
        </Flex>
        <Text fontSize="20px" fontWeight="semibold" color="success.500" whiteSpace="nowrap">
          €{price}
          <chakra.span fontSize="14px" color="text.secondary" fontWeight="normal" ml={2}>
            per night
          </chakra.span>
        </Text>
      </Flex>
    </Card>
  )
}
