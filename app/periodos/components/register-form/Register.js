'use client'
import React from 'react'
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Center,
  Spinner,
  Select
} from '@chakra-ui/react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import DatePicker from '../../../components/date-picker'

const Register = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm()
  const router = useRouter()
  const onSubmit = async (data) => {
    console.log(data)
    if (errors.length > 0) return
    try {
      const res = await axios.post('/api/periods/create', { ...data, createdBy: 'admin' })

      if (res.statusText === 'OK') {
        router.refresh()
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      console.log(error.response)
      if (error?.response?.data?.code === 'P2002') {
        console.log('El registro no se puede duplicar')
      }
    }
  }

  if (isSubmitting) {
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )
  }

  return (
    <Box
      rounded='md'
      shadow='1px 1px 3px rgba(0,0,0,0.2)'
      p={6}
      m='30px'
      as='form'
      marginX={250}
      backgroundColor='white'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading w='100%' textAlign='center' fontWeight='bold' mb='3%' fontSize={32}>
        Periodo
      </Heading>
      <Flex>

        <FormControl mr='5%'>
          <FormLabel htmlFor='periodYear' fontWeight='bold' textOverflow='ellipsis'>
            Año del Periodo
          </FormLabel>

          <Controller
            control={control}
            name='periodYear'
            render={
              ({ field: { onChange, value } }) => (
                <DatePicker
                  value={value}
                  onChange={onChange}
                />
              )
          }
          />

        </FormControl>

        <FormControl mr='5%'>
          <FormLabel htmlFor='period' fontWeight='bold' textOverflow='ellipsis'>
            Periodo
          </FormLabel>
          <Select
            placeholder='Selecciona'
            {...register('period', {
              required: 'Campo requerido'
            })}
          >
            {[1, 2, 3, 4, 5, 6].map((el, i) => (
              <option key={i} value={el}>{el} Periodo</option>
            ))}
          </Select>
        </FormControl>

        <Center h='100px' color='white'>
          <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>Registrar</Button>
        </Center>
      </Flex>

    </Box>

  )
}

export default Register
