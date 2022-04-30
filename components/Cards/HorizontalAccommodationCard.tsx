import { Badge, Flex, Heading, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text, chakra } from '@chakra-ui/react'
import { FiEdit, FiMoreHorizontal, FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi'

import { Accommodation } from '@interfaces/accommodation'
import { Card } from './Card'
import NextLink from 'next/link'
import { routes } from '@constants/routes'
import { useAuth } from '@context/AuthContext'
import { useDeleteAccommodation } from '@hooks/accommodations/useDeleteAccommodation'
import { useIsDesktop } from '@hooks/useIsDesktop'
import { useToggleFeatured } from '@hooks/accommodations/useToggleFeatured'

interface HorizontalAccommodationCardProps extends Accommodation {
  showEditButton?: boolean
}

export function HorizontalAccommodationCard({ id, name, images, price, rating, user_id, featured, showEditButton }: HorizontalAccommodationCardProps) {
  const { user } = useAuth()
  const isDesktop = useIsDesktop()

  const averageRating = rating && rating.toFixed(0) !== 'NaN' ? rating?.toFixed(0) : 0
  const shouldShowActionsButton = showEditButton && user?.id === user_id

  return (
    <Card
      key={id}
      variant={isDesktop ? 'horizontal' : undefined}
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
