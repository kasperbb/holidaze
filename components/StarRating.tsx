import { Flex, chakra } from '@chakra-ui/react'

import { AiFillStar } from 'react-icons/ai'

type ThresholdTuple = [firstStar: number, secondStar: number, thirdStar: number, fourthStar: number, fifthStar: number]

interface StarRatingProps {
  rating: number | undefined
  ratingThresholds?: ThresholdTuple
  size?: number
  onClick?: (rating: number) => void
}

const StarIcon = chakra(AiFillStar, {
  baseStyle: {
    color: '#E9EDFB',
  },
})

const defaultRatingThresholds: ThresholdTuple = [0.5, 1.5, 2.5, 3.5, 4.5]

export function StarRating({ rating = 0, ratingThresholds = defaultRatingThresholds, size = 4, onClick, ...rest }: StarRatingProps) {
  function getSizeProps() {
    return { width: size ?? 4, height: size ?? 4 }
  }

  if (onClick) {
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
        justify="flex-end"
      >
        {ratingThresholds
          .map((threshold, index) =>
            rating >= threshold ? (
              <StarIcon key={threshold} color="orange.500" cursor="pointer" onClick={() => onClick(index + 1)} {...getSizeProps()} {...rest} />
            ) : (
              <StarIcon key={threshold} cursor="pointer" onClick={() => onClick(index + 1)} {...getSizeProps()} {...rest} />
            )
          )
          .reverse()}
      </Flex>
    )
  }

  return (
    <Flex direction="row-reverse" justify="start">
      {ratingThresholds
        .map(threshold =>
          rating >= threshold ? (
            <StarIcon key={threshold} color="orange.500" {...getSizeProps()} {...rest} />
          ) : (
            <StarIcon key={threshold} {...getSizeProps()} {...rest} />
          )
        )
        .reverse()}
    </Flex>
  )
}
