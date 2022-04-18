import { Radio, RadioGroup, VisuallyHidden, chakra } from '@chakra-ui/react'
import { UseControllerProps, useController } from 'react-hook-form'

import { AiFillStar } from 'react-icons/ai'
import { useKeyPress } from '@hooks/useKeyPress'
import { useState } from 'react'

interface FormValues {
  rating: string
}

const StarIcon = chakra(AiFillStar, {
  baseStyle: {
    color: '#E9EDFB',
  },
})

export function StarRatingInput(props: UseControllerProps<FormValues>) {
  const {
    field: { onChange, onBlur, name, value, ref },
  } = useController(props)

  const [ratingValue, setRatingValue] = useState(0)
  const [isFocused, setIsFocused] = useState(false)

  useKeyPress('ArrowLeft', () => handleKeyPress('decrement'))
  useKeyPress('ArrowRight', () => handleKeyPress('increment'))

  function handleKeyPress(action: 'increment' | 'decrement') {
    if (!isFocused) return

    if (action === 'increment') {
      setRatingValue(prev => (prev >= 5 ? prev : prev + 1))
    }

    if (action === 'decrement') {
      setRatingValue(prev => (prev <= 0 ? prev : prev - 1))
    }
  }

  function getSizeProps() {
    return { width: 4, height: 4 }
  }

  function handleClick(num: number) {
    onChange(num)
    setRatingValue(num)
  }

  return (
    <RadioGroup
      sx={{
        '& > svg:hover path': {
          color: 'orange.500',
        },
        '& > svg:hover ~ svg path': {
          color: 'orange.500',
        },
      }}
      display="flex"
      flexDirection="row-reverse"
      justifyContent="flex-end"
      onChange={onChange}
      onBlur={() => {
        setIsFocused(false)
        onBlur()
      }}
      onFocus={() => {
        setIsFocused(true)
      }}
      value={value}
      ref={ref}
      tabIndex={0}
      _focus={{
        border: '5px solid black',
      }}
    >
      {Array.from({ length: 5 })
        .map((_, index) => (
          <>
            <VisuallyHidden>
              <Radio value={index + 1} name={name}>
                {index + 1} stars
              </Radio>
            </VisuallyHidden>

            <chakra.label>
              <VisuallyHidden>{index + 1} stars</VisuallyHidden>
              <StarIcon
                key={index}
                color={ratingValue >= index + 1 ? 'orange.500' : 'gray.200'}
                cursor="pointer"
                onClick={() => handleClick(index + 1)}
                {...getSizeProps()}
              />
            </chakra.label>
          </>
        ))
        .reverse()}
    </RadioGroup>
  )
}
