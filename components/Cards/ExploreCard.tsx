import { Button, Heading, Text } from '@chakra-ui/react'

import { Card } from '@components/Cards/Card'
import { useIsDesktop } from '@hooks/useIsDesktop'

export function ExploreCard() {
  const isDesktop = useIsDesktop()
  return (
    <Card
      variant={isDesktop ? 'horizontal' : undefined}
      imageSrc="/explore.jpg"
      imageAlt="Holidaze"
      mb={4}
      contentProps={{ width: 'full', display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 4, p: 12 }}
      imageProps={{ maxWidth: '350px', maxHeight: 'full', minWidth: '350px', height: 'unset' }}
    >
      <Heading as="h2" size="xl">
        Explore the city
      </Heading>

      <Text flex="1 1 0%">
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or
        randomised words which don&apos;t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure.
      </Text>

      <Button variant="secondary">Browse locations</Button>
    </Card>
  )
}
