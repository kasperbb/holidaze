import { Badge, RangeSlider, RangeSliderFilledTrack, RangeSliderProps, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

interface PriceRangeInputProps extends Omit<RangeSliderProps, 'onChange'> {
  min?: number
  max?: number
  step?: number
}

export function PriceRangeInput<T>(props: UseControllerProps<T> & PriceRangeInputProps) {
  const {
    field: { onChange, onBlur, name, ref, value },
  } = useController<T>(props)

  const [priceRange, setPriceRange] = useState(value as number[])

  const handleChange = (range: number[]) => {
    setPriceRange(range)
    onChange(range)
  }

  return (
    <>
      <Badge colorScheme="twitter" fontWeight="normal" fontSize="sm" borderRadius="sm" py={1} px={2} mb={1}>
        €{priceRange[0]} - €{priceRange[1]}
      </Badge>

      <RangeSlider
        {...props}
        onChange={handleChange}
        onBlur={onBlur}
        name={name}
        id={name}
        ref={ref}
        value={priceRange}
        min={props.min ?? 0}
        max={props.max ?? 500}
        step={props.step ?? 5}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </>
  )
}
