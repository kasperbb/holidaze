import { Container, Flex, Heading } from '@chakra-ui/react'

import { Herobar } from '@components/FrontPage/Herobar'

export function HeroSection() {
  return (
    <Flex
      alignItems="center"
      backgroundImage="linear-gradient(180deg, rgba(56,58,78,.6) 0%, rgba(11,12,18,.4) 100%), url('/hero2.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      width="full"
      height="100vh"
    >
      <Container>
        <Heading as="h1" color="white" fontSize={['4xl', '5xl', '6xl', '7xl']} textAlign="center" fontWeight={500} mb={10}>
          Reserve your Holidaze
        </Heading>

        <Herobar />
      </Container>
    </Flex>
  )
}
