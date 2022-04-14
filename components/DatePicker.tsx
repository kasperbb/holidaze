import { chakra, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { forwardRef, LegacyRef, useState } from 'react'
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker'
import { FiCalendar } from 'react-icons/fi'

interface DatePickerProps extends ReactDatePickerProps {
  isOutline?: boolean
}

export const DatePicker = ({ isOutline, selected, onChange, isClearable = false, showPopperArrow = false, ...props }: DatePickerProps) => {
  const [date, setDate] = useState<Date>(selected ?? new Date())

  const handleChange = (date: Date, event: React.SyntheticEvent<any, Event> | undefined) => {
    setDate(date)
    onChange(date, event)
  }

  return (
    <ReactDatePicker
      selected={date}
      onChange={handleChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      customInput={<CustomDatePickerInput />}
      {...props}
    />
  )
}

interface CustomDatePickerInputProps {
  value?: string | undefined
  onClick?: () => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomDatePickerInput = forwardRef(({ value, onClick, onChange }: CustomDatePickerInputProps, ref) => (
  <InputGroup>
    <InputLeftElement pointerEvents="none">
      <FiCalendar color="gray.300" />
    </InputLeftElement>
    <Input
      borderRadius="lg"
      placeholder="Select or type date"
      fontSize="sm"
      onClick={onClick}
      onChange={onChange}
      ref={ref as LegacyRef<HTMLInputElement> | undefined}
      value={value}
    />
  </InputGroup>
))

CustomDatePickerInput.displayName = 'CustomDatePickerInput'
