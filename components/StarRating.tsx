import { Flex, chakra } from '@chakra-ui/react'

import { AiFillStar } from 'react-icons/ai'

type ThresholdTuple = [firstStar: number, secondStar: number, thirdStar: number, fourthStar: number, fifthStar: number]

interface StarRatingProps {
  rating: number
  ratingThresholds?: ThresholdTuple
  size?: number
  hoverEffect?: boolean
}

const StarIcon = chakra(AiFillStar, {
  baseStyle: {
    color: '#E9EDFB',
  },
})

const defaultRatingThresholds: ThresholdTuple = [0.5, 1.5, 2.5, 3.5, 4.5]

export function StarRating({ rating, ratingThresholds = defaultRatingThresholds, size = 4, ...rest }: StarRatingProps) {
  function getSizeProps() {
    return { width: size ?? 4, height: size ?? 4 }
  }

  return (
    <Flex
      sx={{
        '& > svg:hover path': {
          color: 'orange.500',
        },
        '& > svg:hover ~ svg path': {
          color: 'orange.500',
        },
      }}
      direction="row-reverse"
      justify="start"
    >
      {ratingThresholds
        .map(threshold => (rating >= threshold ? <StarIcon color="orange.500" {...getSizeProps()} {...rest} /> : <StarIcon {...getSizeProps()} {...rest} />))
        .reverse()}
    </Flex>
  )
}
