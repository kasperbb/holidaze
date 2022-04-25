import { Radio, RadioGroup, VisuallyHidden, chakra } from '@chakra-ui/react'
import { UseControllerProps, useController } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'

import { AiFillStar } from 'react-icons/ai'
import { useKeyPress } from '@hooks/useKeyPress'

const StarIcon = chakra(AiFillStar, {
  baseStyle: {
    color: '#E9EDFB',
  },
})

interface StarRatingProps {
  size?: number
}

export function StarRatingInput<T>(props: UseControllerProps<T> & StarRatingProps) {
  const {
    field: { onChange, onBlur, name, ref, value },
  } = useController<T>(props)

  const [ratingValue, setRatingValue] = useState(0)
  const focusRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setRatingValue(value as number)
  }, [value])

  useKeyPress('ArrowLeft', () => handleKeyPress('decrement'), focusRef)
  useKeyPress('ArrowRight', () => handleKeyPress('increment'), focusRef)

  function handleKeyPress(action: 'increment' | 'decrement') {
    if (action === 'increment') {
      onChange((prev: number) => (prev >= 5 ? prev : prev + 1))
    }

    if (action === 'decrement') {
      onChange((prev: number) => (prev <= 0 ? prev : prev - 1))
    }
  }

  function getSizeProps() {
    return { width: props.size ?? 4, height: props.size ?? 4 }
  }

  return (
    <RadioGroup
      sx={{
        '& > label:hover svg path': {
          color: 'orange.500',
        },
        '& > label:hover ~ label svg path': {
          color: 'orange.500',
        },
      }}
      display="flex"
      flexDirection="row-reverse"
      justifyContent="flex-end"
      onChange={val => onChange(Number(val))}
      onBlur={onBlur}
      value="checked"
      ref={e => {
        focusRef.current = e
        ref(e)
      }}
      tabIndex={0}
    >
      {Array.from({ length: 5 })
        .map((_, index) => (
          <chakra.label key={name + index} htmlFor={name}>
            <StarIcon color={ratingValue >= index + 1 ? 'orange.500' : 'gray.200'} cursor="pointer" {...getSizeProps()} />

            <VisuallyHidden>
              <Radio value={index + 1} name={name} id={name}>
                {index + 1} stars
              </Radio>
            </VisuallyHidden>
          </chakra.label>
        ))
        .reverse()}
    </RadioGroup>
  )
}
