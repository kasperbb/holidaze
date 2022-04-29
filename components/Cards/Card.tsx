import { Box, BoxProps, Image, ImageProps, useMultiStyleConfig } from '@chakra-ui/react'

interface CardProps extends BoxProps {
  children: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  imageProps?: ImageProps
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: string
  contentProps?: BoxProps
}

export function Card({ children, imageSrc, imageAlt, imageProps, size, variant, contentProps, ...rest }: CardProps) {
  const styles = useMultiStyleConfig('Card', { size, variant })

  return (
    <Box as="article" __css={styles.card} {...rest}>
      {imageSrc && <Image src={imageSrc ?? '/placeholder.png'} alt={imageAlt ?? ''} __css={styles.image} {...imageProps} />}
      <Box __css={styles.content} {...contentProps}>
        {children}
      </Box>
    </Box>
  )
}
