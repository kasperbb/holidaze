import { Badge, Flex, Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Skeleton, Text, chakra } from '@chakra-ui/react'
import { FiEdit, FiMoreHorizontal, FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi'

import { Accommodation } from '@interfaces/accommodation'
import { Card } from './Card'
import NextLink from 'next/link'
import { routes } from '@constants/routes'
import { useAuth } from '@context/AuthContext'
import { useDeleteAccommodation } from '@hooks/accommodations/useDeleteAccommodation'
import { useToggleFeatured } from '@hooks/accommodations/useToggleFeatured'

interface HorizontalAccommodationCardProps extends Accommodation {
  showEditButton?: boolean
}

export function HorizontalAccommodationCard({ id, name, images, price, rating, user_id, featured, showEditButton }: HorizontalAccommodationCardProps) {
  const { user } = useAuth()

  const averageRating = rating && rating.toFixed(0) !== 'NaN' ? rating?.toFixed(0) : 0
  const shouldShowActionsButton = showEditButton && user?.id === user_id

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
        {shouldShowActionsButton && <ActionsButton id={id} featured={featured} name={name} />}
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

export function HorizontalAccommodationCardSkeleton() {
  return (
    <Flex width="full" height="125px" borderRadius="2xl" overflow="hidden" bg="white" boxShadow="rgba(0, 0, 0, 0.04) 0px 2px 48px 0px" mb={4}>
      <Skeleton variant="rect" width="200px" height="full" />
      <Flex direction="column" width="full" p={6}>
        <Skeleton variant="rect" width="200px" height="30px" mb={4} />
        <Flex justify="space-between" align="flex-end" width="full">
          <Skeleton variant="rect" width="100px" height="21px" />
          <Skeleton variant="rect" width="110px" height="30px" />
        </Flex>
      </Flex>
    </Flex>
  )
}

function ActionsButton({ id, featured, name }: Pick<Accommodation, 'id' | 'featured' | 'name'>) {
  const { mutate: toggle, isLoading } = useToggleFeatured({ id, featured, name })
  const { mutate: remove } = useDeleteAccommodation(id)

  return (
    <Menu>
      <MenuButton as={IconButton} aria-label="Options" icon={<FiMoreHorizontal />} variant="outline" isLoading={isLoading} />
      <MenuList>
        <NextLink href={`${routes.admin.accommodations.edit}/${id}`} passHref>
          <MenuItem as="a" icon={<FiEdit />}>
            Edit
          </MenuItem>
        </NextLink>
        <MenuItem icon={featured ? <FiToggleRight /> : <FiToggleLeft />} onClick={() => toggle()}>
          {featured ? 'Unset featured' : 'Set featured'}
        </MenuItem>
        <MenuItem icon={<FiTrash2 />} onClick={() => remove()}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
