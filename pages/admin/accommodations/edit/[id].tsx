import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Textarea,
  chakra,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  Spinner,
} from '@chakra-ui/react'
import { FiEdit, FiSearch } from 'react-icons/fi'

import { Card } from '@components/Cards/Card'
import { type ImageListType } from 'react-images-uploading'
import { enforceAuth } from '@utils/enforceAuth'
import { useEffect, useState } from 'react'
import { BackButton } from '@components/BackButton'
import { useForm } from 'react-hook-form'
import { AddAccommodation } from '@interfaces/accommodation'
import { Map } from '@components/Map'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { getAccommodation } from '@queries/accommodations'
import { PropsWithId } from '@interfaces/common'
import { useUpdateAccommodation } from '@hooks/accommodations/useUpdateAccommodation'
import { ImageUploadInput } from '@components/Forms/Inputs/ImageUploadInput'
import { downloadImages } from '@queries/upload'
import { useLocationState } from '@hooks/useLocationState'

export const getServerSideProps = enforceAuth(async ctx => {
  const queryClient = new QueryClient()
  const id = Number(ctx.params?.id)

  await queryClient.prefetchQuery(['accommodation', id], () => getAccommodation(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
})

const EditIcon = chakra(FiEdit)

export default function AdminEditAccommodation({ id }: PropsWithId) {
  const { data } = useQuery(['accommodation', id], () => getAccommodation(id))

  const [images, setImages] = useState<ImageListType>([])
  const [files, setFiles] = useState<File[]>([])

  const { register, watch, handleSubmit } = useForm<AddAccommodation>({
    defaultValues: {
      name: data?.name,
      description: data?.description,
      location: data?.location,
      price: data?.price,
      rooms: data?.rooms,
      images: files,
    },
  })

  const [latitude, longitude] = [data?.location[0] ?? 60.3914191, data?.location[1] ?? 5.3248788]
  const [locationQuery, setLocationQuery] = useState('')
  const { location, setLocation, isFetching, ref: mapRef } = useLocationState(locationQuery, [latitude, longitude])

  const mutation = useUpdateAccommodation(data?.id, { ...watch(), location, images: files }, true)

  useEffect(() => {
    ;(async () => {
      const downloadedFiles = await downloadImages(data?.images)
      if (downloadedFiles) setImages(downloadedFiles)
    })()
  }, [data?.images])

  function onChange(imageList: ImageListType) {
    const files = imageList.map(image => image.file) as File[]
    setFiles(files)
    setImages(imageList)
  }

  const onSubmit = handleSubmit(() => {
    mutation.mutate()
  })

  return (
    <Container maxWidth="7xl">
      <Card as="div" maxWidth="full" width="full">
        <Flex align="center" gap={5}>
          <BackButton variant="primary" aria-label="Go back" />
          <Heading as="h1" fontSize="24px" fontWeight={500}>
            Edit {data?.name}
          </Heading>
        </Flex>
      </Card>

      <Card variant="no-padding" maxWidth="full" width="full" my={10}>
        <Flex align="center" borderBottom="1px solid" borderColor="muted" py={6} px={8} gap={4}>
          <EditIcon width="20px" height="20px" />
          <Heading as="h2" fontSize="24px" fontWeight={500}>
            Listing Information
          </Heading>
        </Flex>

        <Grid as="form" onSubmit={onSubmit} templateColumns="repeat(4, 1fr)" gap={6} p={8}>
          <FormControl gridColumn={['span 4 / span 4', 'span 2 / span 2']}>
            <FormLabel htmlFor="name" color="text.primary">
              Business name
            </FormLabel>
            <Input id="name" type="text" {...register('name')} />
          </FormControl>

          <FormControl gridColumn={['span 4 / span 4', 'span 1 / span 1']}>
            <FormLabel htmlFor="rooms" color="text.primary">
              Rooms
            </FormLabel>
            <Input id="rooms" type="text" {...register('rooms')} />
          </FormControl>

          <FormControl gridColumn={['span 4 / span 4', 'span 1 / span 1']}>
            <FormLabel htmlFor="price" color="text.primary">
              Price per night
            </FormLabel>
            <Input id="price" type="number" {...register('price')} />
          </FormControl>

          <FormControl gridColumn="span 4 / span 4">
            <FormLabel htmlFor="description" color="text.primary">
              Description
            </FormLabel>
            <Textarea id="description" rows={5} {...register('description')} />
          </FormControl>

          <FormControl gridColumn="span 4 / span 4">
            <FormLabel htmlFor="location" color="text.primary">
              Location
            </FormLabel>

            <InputGroup mb={2}>
              <InputLeftElement pointerEvents="none">{isFetching ? <Spinner width={3} height={3} /> : <FiSearch color="gray.300" />}</InputLeftElement>
              <Input type="search" placeholder="Search location" onChange={e => setLocationQuery(e.target.value)} />
            </InputGroup>

            <Map
              markerList={[{ latitude: location[0], longitude: location[1] }]}
              onClick={({ lngLat }) => setLocation([lngLat.lat, lngLat.lng])}
              style={{ height: 250 }}
              ref={mapRef}
            />
            <FormHelperText>Search or click on the map to set location.</FormHelperText>
          </FormControl>

          <FormControl gridColumn="span 4 / span 4">
            <FormLabel htmlFor="images" color="text.primary">
              Images
            </FormLabel>
            <ImageUploadInput multiple value={images} onChange={onChange} maxNumber={10} inputProps={{ id: 'images', name: 'images' }} dataURLKey="dataURL" />
            <FormHelperText>Recommended minimum width: 750px.</FormHelperText>
          </FormControl>

          <Button type="submit" variant="primary" gridColumn="span 4 / span 4" isLoading={mutation.isLoading}>
            Update Accommodation
          </Button>
        </Grid>
      </Card>
    </Container>
  )
}
