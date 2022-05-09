import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { forwardRef, LegacyRef, useState } from 'react'
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker'
import { useController, UseControllerProps } from 'react-hook-form'
import { FiCalendar } from 'react-icons/fi'

interface DatePickerProps<WithRange extends boolean | undefined = undefined> extends ReactDatePickerProps<never, WithRange> {
  name: string
  isOutline?: boolean
}

type DateRange = [start: Date | null | undefined, end: Date | null | undefined]

export function DatePicker({ name, isOutline, selected, onChange, isClearable = false, showPopperArrow = false, ...rest }: DatePickerProps) {
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
      customInput={<CustomDatePickerInput name={name} id={name} />}
      calendarStartDay={1}
      dateFormat="yyyy/MM/dd"
      {...rest}
    />
  )
}

interface ControlledDatePickerProps extends Omit<DatePickerProps<true>, 'onChange'> {
  defaultValue?: DateRange
  excludedDates?: Date[]
}

export function ControlledDatePicker<T>(props: UseControllerProps<T> & ControlledDatePickerProps) {
  const {
    field: { onChange, onBlur, name, ref, value },
  } = useController<T>(props)

  const [start, end] = value as DateRange

  return (
    <ReactDatePicker
      {...props}
      startDate={start}
      endDate={end}
      onChange={dates => onChange(dates)}
      onBlur={onBlur}
      name={name}
      ref={ref}
      isClearable={true}
      showPopperArrow={true}
      customInput={<CustomDatePickerInput />}
      calendarStartDay={1}
      excludeDates={props.excludedDates}
      selectsStart
      selectsRange
      dateFormat="yyyy/MM/dd"
    />
  )
}

export function RangeDatePicker({ name, id, isOutline, onChange, isClearable = false, showPopperArrow = false, ...rest }: DatePickerProps<true>) {
  const [dates, setDates] = useState<DateRange>([new Date(), new Date()])

  const handleChange = (dates: [Date | null, Date | null], event: React.SyntheticEvent<any, Event> | undefined) => {
    setDates(dates)
    onChange(dates, event)
  }

  const [start, end] = dates

  return (
    <ReactDatePicker
      startDate={start}
      endDate={end}
      onChange={handleChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      customInput={<CustomDatePickerInput name={name} id={id} />}
      calendarStartDay={1}
      selectsStart
      selectsRange
      dateFormat="yyyy/MM/dd"
      {...rest}
    />
  )
}

interface CustomDatePickerInputProps {
  name?: string
  id?: string
  value?: string | undefined
  onClick?: () => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomDatePickerInput = forwardRef(({ name, id, value, onClick, onChange }: CustomDatePickerInputProps, ref) => (
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
      name={name}
      id={id}
    />
  </InputGroup>
))

CustomDatePickerInput.displayName = 'CustomDatePickerInput'
