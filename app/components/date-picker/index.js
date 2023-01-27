'use client'
import { Input } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <Input
    placeholder='Selecciona un periodo'
    readOnly
    value={value}
    onClick={onClick}
    ref={ref}
  />
))

const DatePicker = ({ value, onChange }) => {
  console.log('val', value)
  return (
    <ReactDatePicker
      selected={value}
      onChange={onChange}
      customInput={<CustomInput />}
      showYearPicker
      dateFormat='yyyy'
      yearItemNumber={2}
    />
  )
}

export default DatePicker
