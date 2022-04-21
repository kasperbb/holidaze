import { Badge, Button, Flex, Heading, Link, Text, chakra } from '@chakra-ui/react'

import { Accommodation } from '@interfaces/accommodation'
import { Card } from './Card'
import { FiEdit } from 'react-icons/fi'
import NextLink from 'next/link'
import { routes } from '@constants/routes'
import { useAuth } from '@context/AuthContext'

interface HorizontalAccommodationCardProps extends Accommodation {
  showEditButton?: boolean
}

export function HorizontalAccommodationCard({ id, name, images, price, rating, user_id, showEditButton }: HorizontalAccommodationCardProps) {
  const { user } = useAuth()

  const averageRating = rating && rating.toFixed(0) !== 'NaN' ? rating?.toFixed(0) : 0
  const shouldShowEditButton = showEditButton && user?.id === user_id

  return (
    <Card
      key={id}
      variant="horizontal"
      imageSrc={images ? images[0].url : '/placeholder.png'}
      imageAlt="Holidaze"
      mb={4}
      contentProps={{ width: 'full', display: 'flex', flexDirection: 'column' }}
    >
      <Flex align="center" justify="space-between" gap={10}>
        <NextLink href={`/accommodations/${id}`} passHref>
          <Link display="block" mb={4}>
            <Heading as="h3" fontSize="25px" fontWeight="semibold">
              {name}
            </Heading>
          </Link>
        </NextLink>
        {shouldShowEditButton && (
          <NextLink href={`${routes.admin.accommodations.edit}/${id}`} passHref>
            <Button as="a" leftIcon={<FiEdit />} variant="outline" size="sm">
              Edit
            </Button>
          </NextLink>
        )}
      </Flex>

      <Flex align="center" justify="space-between" gap={10}>
        <Flex align="center" color="orange.800" fontWeight="bold" fontSize="sm" gap={2} aria-label="Average rating">
          <Badge display="flex" alignItems="center" fontSize="sm" borderRadius="md" colorScheme="orange" px={1}>
            {averageRating}/5
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
