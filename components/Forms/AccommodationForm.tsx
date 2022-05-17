import * as Yup from 'yup'

import { Accommodation, AddAccommodation } from '@interfaces/accommodation'
import { Button, FormControl, FormHelperText, FormLabel, Grid, Input, InputGroup, InputLeftElement, Spinner, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import { FormHelperError } from './FormHelperError'
import { ImageListType } from 'react-images-uploading'
import { ImageUploadInput } from './Inputs/ImageUploadInput'
import { MAP_LOCATION } from '@constants/map'
import { Map } from '@components/Map'
import { downloadImages } from '@queries/upload'
import { useCreateAccommodation } from '@hooks/accommodations/useCreateAccommodation'
import { useForm } from 'react-hook-form'
import { useLocationState } from '@hooks/useLocationState'
import { useUpdateAccommodation } from '@hooks/accommodations/useUpdateAccommodation'
import { yupResolver } from '@hookform/resolvers/yup'

interface AccommodationFormProps {
  accommodation?: Accommodation
}

const formSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.').min(3, 'Name must be at least 3 characters long.'),
  description: Yup.string().required('Description is required.').min(20, 'Description must be at least 20 characters long.'),
  price: Yup.string().required('Price is required.').min(0, 'Price must be at least 0.').max(500, 'Price must be 500 or lower.'),
  rooms: Yup.string().required('Rooms is required.'),
})

export function AccommodationForm({ accommodation }: AccommodationFormProps) {
  const [images, setImages] = useState<ImageListType>([])
  const [files, setFiles] = useState<File[]>([])

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddAccommodation>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: accommodation?.name,
      description: accommodation?.description,
      location: accommodation?.location,
      price: accommodation?.price,
      rooms: accommodation?.rooms,
      images: files,
    },
  })

  const [locationQuery, setLocationQuery] = useState('')
  const { location, setLocation, isFetching, ref: mapRef } = useLocationState(locationQuery, accommodation ? accommodation.location : MAP_LOCATION)

  const { mutate: create, isLoading: createLoading } = useCreateAccommodation({ ...watch(), location, images: files })
  const { mutate: update, isLoading: updateLoading } = useUpdateAccommodation(accommodation?.id, { ...watch(), location, images: files }, true)

  useEffect(() => {
    ;(async () => {
      if (accommodation) {
        const downloadedFiles = await downloadImages(accommodation.images)

        if (downloadedFiles) {
          setImages(downloadedFiles)
          setFiles(downloadedFiles.map(({ file }) => file))
        }
      }
    })()
  }, [accommodation, setLocation])

  function onChange(imageList: ImageListType) {
    const files = imageList.map(image => image.file) as File[]
    setFiles(files)
    setImages(imageList)
  }

  const onSubmit = handleSubmit(() => {
    if (!location) setError('location', { message: 'Location is required.' })
    if (!images.length) setError('images', { message: 'You must upload at least one image.' })
    return accommodation ? update() : create()
  })

  const [longitude, latitude] = location

  return (
    <Grid as="form" onSubmit={onSubmit} templateColumns="repeat(4, 1fr)" gap={6} p={8}>
      <FormControl gridColumn={['span 4 / span 4', 'span 2 / span 2']} isInvalid={Boolean(errors.name)} isRequired>
        <FormLabel htmlFor="name" color="text.primary">
          Business name
        </FormLabel>
        <Input id="name" type="text" {...register('name')} />
        <FormHelperError error={errors.name}>{errors.name?.message}</FormHelperError>
      </FormControl>

      <FormControl gridColumn={['span 4 / span 4', 'span 1 / span 1']} isInvalid={Boolean(errors.rooms)} isRequired>
        <FormLabel htmlFor="rooms" color="text.primary">
          Rooms
        </FormLabel>
        <Input id="rooms" type="text" {...register('rooms')} />
      </FormControl>

      <FormControl gridColumn={['span 4 / span 4', 'span 1 / span 1']} isInvalid={Boolean(errors.price)} isRequired>
        <FormLabel htmlFor="price" color="text.primary">
          Price per night
        </FormLabel>
        <Input id="price" type="number" {...register('price')} />
      </FormControl>

      <FormControl gridColumn="span 4 / span 4" isInvalid={Boolean(errors.description)} isRequired>
        <FormLabel htmlFor="description" color="text.primary">
          Description
        </FormLabel>
        <Textarea id="description" rows={5} {...register('description')} />
        <FormHelperError error={errors.description}>Minimum 20 characters.</FormHelperError>
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
          markerList={[{ longitude, latitude }]}
          long={longitude}
          lat={latitude}
          onClick={({ lngLat }) => setLocation([lngLat.lng, lngLat.lat])}
          style={{ height: 250 }}
          ref={mapRef}
        />

        <FormHelperText>Search or click on the map to set location.</FormHelperText>
      </FormControl>

      <FormControl gridColumn="span 4 / span 4" isInvalid={Boolean(errors.images)} isRequired>
        <FormLabel htmlFor="images" color="text.primary">
          Images
        </FormLabel>
        <ImageUploadInput
          multiple
          value={images}
          onChange={onChange}
          maxNumber={10}
          initialMode="edit"
          inputProps={{ id: 'images', name: 'images' }}
          dataURLKey="dataURL"
        />
        <FormHelperText>Recommended minimum width: 650px.</FormHelperText>
      </FormControl>

      <Button type="submit" variant="primary" gridColumn="span 4 / span 4" isLoading={createLoading || updateLoading}>
        {accommodation ? 'Update' : 'Add'} Accommodation
      </Button>
    </Grid>
  )
}
