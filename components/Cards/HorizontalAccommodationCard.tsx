import { Badge, Button, ButtonGroup, Flex, FormControl, FormLabel, Heading, IconButton, Link, Skeleton, Switch, Text, chakra } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Accommodation } from '@interfaces/accommodation'
import { Card } from './Card'
import { FiTrash2 } from 'react-icons/fi'
import NextLink from 'next/link'
import { routes } from '@constants/routes'
import { useAuth } from '@context/AuthContext'
import { useDeleteAccommodation } from '@hooks/accommodations/useDeleteAccommodation'
import { useToggleFeatured } from '@hooks/accommodations/useToggleFeatured'

interface HorizontalAccommodationCardProps extends Accommodation {
  isEditMode?: boolean
}

export function HorizontalAccommodationCard({ id, name, images, price, rating, user_id, featured, isEditMode }: HorizontalAccommodationCardProps) {
  const { user } = useAuth()

  const averageRating = rating && rating.toFixed(0) !== 'NaN' ? rating?.toFixed(0) : 0
  const shouldShowActionsButton = isEditMode && (user?.id === user_id || user?.role === 'admin')

  const cardStyles = {
    width: 'full',
    display: 'flex',
    flexDirection: { base: 'column', lg: 'row' },
    justifyContent: 'space-between',
    alignItems: { base: 'flex-start', lg: 'flex-end' },
    gap: 6,
  } as const

  const imageStyles = {
    maxHeight: { base: '200px', lg: '150px' },
  }

  if (shouldShowActionsButton) {
    return (
      <Card
        key={id}
        variant="horizontal"
        imageSrc={images ? images[0].url : '/placeholder.png'}
        imageAlt="Holidaze"
        contentProps={cardStyles}
        imageProps={imageStyles}
        mb={4}
      >
        <Flex direction="column" gap={4}>
          <Heading as="h3" fontSize="25px" fontWeight="semibold">
            {name}
          </Heading>

          <Flex align="center" color="orange.800" fontWeight="bold" fontSize="sm" gap={2} aria-label="Average rating">
            <Badge display="flex" alignItems="center" fontSize="sm" borderRadius="md" colorScheme="orange" px={1}>
              {averageRating}/5
            </Badge>
            Average
          </Flex>
        </Flex>

        <ActionButtons id={id} featured={featured} name={name} />
      </Card>
    )
  }

  return (
    <NextLink href={`/accommodations/${id}`} passHref>
      <Link borderRadius="2xl" width="full" mb={4}>
        <Card key={id} variant="horizontal" imageSrc={images ? images[0].url : '/placeholder.png'} imageAlt="Holidaze" contentProps={cardStyles}>
          <Flex direction="column" gap={4}>
            <Heading as="h3" fontSize="25px" fontWeight="semibold">
              {name}
            </Heading>

            <Flex align="center" color="orange.800" fontWeight="bold" fontSize="sm" gap={2} aria-label="Average rating">
              <Badge display="flex" alignItems="center" fontSize="sm" borderRadius="md" colorScheme="orange" px={1}>
                {averageRating}/5
              </Badge>
              Average
            </Flex>
          </Flex>

          <Text fontSize="20px" fontWeight="semibold" color="success.500" whiteSpace="nowrap">
            €{price}
            <chakra.span fontSize="14px" color="text.secondary" fontWeight="normal" ml={2}>
              per night
            </chakra.span>
          </Text>
        </Card>
      </Link>
    </NextLink>
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

function ActionButtons({ id, featured, name }: Pick<Accommodation, 'id' | 'featured' | 'name'>) {
  const { mutate: toggle, isError } = useToggleFeatured({ id, featured, name })
  const { mutate: remove, isLoading } = useDeleteAccommodation(id)

  const [isFeatured, setIsFeatured] = useState(featured)

  useEffect(() => {
    if (isError) setIsFeatured(prev => !prev)
  }, [isError])

  function handleToggle() {
    toggle()
    setIsFeatured(prev => !prev)
  }

  return (
    <Flex align="center">
      <ButtonGroup size="sm" variant="outline" mr={4} isAttached>
        <NextLink href={`${routes.admin.accommodations.edit}/${id}`} passHref>
          <Button as="a" borderRightRadius={0} borderRight={0}>
            Edit
          </Button>
        </NextLink>
        <IconButton borderLeftRadius={0} height="34px" aria-label={`Delete ${name}`} icon={<FiTrash2 />} onClick={() => remove()} isLoading={isLoading} />
      </ButtonGroup>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="featured" mb="0">
          Featured:
        </FormLabel>
        <Switch id="featured" isChecked={isFeatured} onChange={handleToggle} />
      </FormControl>
    </Flex>
  )
}
