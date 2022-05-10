import { Badge, RangeSlider, RangeSliderFilledTrack, RangeSliderProps, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { UseControllerProps, useController } from 'react-hook-form'

import React from 'react'

interface PriceRangeInputProps extends Omit<RangeSliderProps, 'onChange'> {
  min?: number
  max?: number
  step?: number
}

export function PriceRangeInput<T>(props: UseControllerProps<T> & PriceRangeInputProps) {
  const {
    field: { onChange, onBlur, name, ref, value },
  } = useController<T>(props)

  return (
    <>
      <Badge colorScheme="twitter" fontWeight="normal" fontSize="sm" borderRadius="sm" py={1} px={2} mb={1}>
        €{(value as number[])[0]} - €{(value as number[])[1]}
      </Badge>

      <RangeSlider
        {...props}
        onChange={range => onChange(range)}
        onBlur={onBlur}
        name={name}
        id={name}
        ref={ref}
        value={value as number[]}
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
