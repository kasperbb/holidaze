import { Box, Button, Flex, Grid, GridItem, IconButton, Image, SimpleGrid, Text, chakra } from '@chakra-ui/react'
import { FiUpload, FiX } from 'react-icons/fi'
import ImageUpload, { ImageUploadingPropsType } from 'react-images-uploading'

import { useState } from 'react'

const UploadIcon = chakra(FiUpload)

interface ImageUploadInputProps extends ImageUploadingPropsType {
  initialMode?: 'edit'
}

export function ImageUploadInput({ value, onChange, initialMode }: ImageUploadInputProps) {
  const [isEditMode, setIsEditMode] = useState(initialMode === 'edit')

  function handleReplaceImages(removeImagesFn: () => void, addImagesFn: () => void) {
    removeImagesFn()
    addImagesFn()
    setIsEditMode(true)
  }

  return (
    <ImageUpload multiple value={value} onChange={onChange} maxNumber={10} inputProps={{ id: 'images', name: 'images' }} dataURLKey="dataURL">
      {({ imageList, dragProps, onImageUpload, onImageUpdate, onImageRemove, onImageRemoveAll }) => (
        <Grid
          gridTemplateColumns={Boolean(imageList.length) ? ['repeat(1, 1fr)', 'repeat(2, 1fr)'] : 'repeat(1, 1fr)'}
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          placeItems="center"
        >
          {Boolean(imageList.length) && (
            <GridItem width="full" p={8}>
              <SimpleGrid justifyContent="start" columns={[1, 3]} spacing={4}>
                {imageList.map((image, index) => (
                  <Box key={image.file?.name} position="relative">
                    <Flex gap={1} position="absolute" top={-1} right={-2}>
                      {isEditMode && (
                        <>
                          <IconButton
                            variant="solid"
                            colorScheme="blackAlpha"
                            borderRadius="full"
                            height={5}
                            width={5}
                            minWidth="unset"
                            icon={<FiUpload size={13} />}
                            aria-label="Update image"
                            onClick={() => onImageUpdate(index)}
                          />
                          <IconButton
                            variant="solid"
                            colorScheme="blackAlpha"
                            borderRadius="full"
                            height={5}
                            width={5}
                            minWidth="unset"
                            icon={<FiX />}
                            aria-label="Remove image"
                            onClick={() => onImageRemove(index)}
                          />
                        </>
                      )}
                    </Flex>
                    <Image src={image.dataURL} alt={image.file?.name} maxHeight={24} width="full" objectFit="cover" borderRadius="lg" shadow="md" />
                  </Box>
                ))}
              </SimpleGrid>
            </GridItem>
          )}

          {isEditMode ? (
            <GridItem width="full" height="full" cursor="pointer" p={8} onClick={onImageUpload} {...dragProps}>
              <Flex direction={['column', 'row']} align="center" justify="center" height="full" gap={4}>
                <UploadIcon width={6} height={6} color="text.secondary" />
                <Text>Click or drag images here to upload</Text>
              </Flex>
            </GridItem>
          ) : (
            <GridItem width="full" height="full" p={[4, 8]}>
              <Flex align="center" justify="center" height="full" gap={4}>
                <Button variant="outline" width="full" height="full" onClick={() => handleReplaceImages(onImageRemoveAll, onImageUpload)}>
                  Replace images
                </Button>
              </Flex>
            </GridItem>
          )}
        </Grid>
      )}
    </ImageUpload>
  )
}
