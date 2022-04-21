import { Button, Container, Flex, FormControl, FormLabel, Grid, Heading, Image, Input, Textarea, chakra, FormHelperText } from '@chakra-ui/react'
import { FiEdit, FiUpload } from 'react-icons/fi'

import { Card } from '@components/Card'
import ImageUpload, { type ImageListType } from 'react-images-uploading'
import { enforceAuth } from '@utils/enforceAuth'
import { useState } from 'react'
import { BackButton } from '@components/BackButton'
import { useForm } from 'react-hook-form'
import { UpdateAccommodation } from '@interfaces/accommodation'
import { useCreateAccommodation } from '@hooks/accommodations/useCreateAccommodation'
import { Map } from '@components/Map'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { getAccommodation } from '@queries/accommodations'
import { PropsWithId } from '@interfaces/common'

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
const UploadIcon = chakra(FiUpload)

export default function AdminEditAccommodation({ id }: PropsWithId) {
  const { data } = useQuery(['accommodation', id], () => getAccommodation(id))
  const { register, watch, handleSubmit } = useForm<UpdateAccommodation>({
    defaultValues: { ...data },
  })

  const [images, setImages] = useState<ImageListType>([])
  const [files, setFiles] = useState<File[]>([])

  const [latitude, longitude] = [data?.location[0] ?? 60.3914191, data?.location[1] ?? 5.3248788]

  const [location, setLocation] = useState<[latitude: number, longitude: number]>([latitude, longitude])

  const mutation = useCreateAccommodation({ ...watch(), location, images: files })

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
          <FormControl gridColumn="span 2 / span 2">
            <FormLabel htmlFor="name" color="text.primary">
              Business name
            </FormLabel>
            <Input id="name" type="text" {...register('name')} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="rooms" color="text.primary">
              Total number of rooms & suites
            </FormLabel>
            <Input id="rooms" type="text" {...register('rooms')} />
          </FormControl>

          <FormControl>
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
            <Map
              markerList={[{ latitude, longitude }]}
              lat={latitude}
              long={longitude}
              onClick={({ lngLat }) => setLocation([lngLat.lat, lngLat.lng])}
              style={{ height: 250 }}
            />
            <FormHelperText>Click on the map to set location.</FormHelperText>
          </FormControl>

          <FormControl gridColumn="span 4 / span 4">
            <FormLabel htmlFor="images" color="text.primary">
              Images
            </FormLabel>
            <ImageUpload multiple value={images} onChange={onChange} maxNumber={10} inputProps={{ id: 'images', name: 'images' }} dataURLKey="data_url">
              {({ imageList, onImageUpload, dragProps }) => (
                <Flex
                  justify={imageList.length ? 'start' : 'center'}
                  align="center"
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius="md"
                  p={8}
                  cursor="pointer"
                  onClick={onImageUpload}
                  tabIndex={-1}
                  {...dragProps}
                >
                  {!imageList.length && (
                    <Flex align="center" gap={4}>
                      <UploadIcon width={7} height={7} />
                      Click or drag images here to upload
                    </Flex>
                  )}

                  {Boolean(imageList.length) && (
                    <Flex gap={4}>
                      {imageList.map((image, index) => (
                        <Image key={image.file?.name} src={image.data_url} alt={`${index + 1}. uploaded image`} maxHeight={24} />
                      ))}
                    </Flex>
                  )}
                </Flex>
              )}
            </ImageUpload>
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
