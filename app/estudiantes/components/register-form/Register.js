'use client'
import React from 'react'
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Center,
  Spinner
} from '@chakra-ui/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const Register = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const router = useRouter()
  const onSubmit = async (data) => {
    if (errors.length > 0) return
    try {
      const res = await axios.post('/api/students/create', { ...data, createdBy: 'admin' })
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
        Estudiantes
      </Heading>
      <Flex>

        <FormControl mr='5%'>
          <FormLabel htmlFor='studentName' fontWeight='bold' textOverflow='ellipsis'>
            Estudiante
          </FormLabel>
          <Input
            placeholder='Nombre del estudiante' {...register('studentName', {
              required: 'Campo requerido',
              minLength: { value: 2, message: 'El campo debe tener minimo 2 caracteres' }
            })}
          />

        </FormControl>
        <FormControl mr='5%'>
          <FormLabel htmlFor='cedula' fontWeight='bold' textOverflow='ellipsis'>
            Cedula
          </FormLabel>
          <Input
            type='number'
            placeholder='Cedula' {...register('cedula', {
              required: 'Campo requerido',
              minLength: { value: 6, message: 'El campo debe tener minimo 6 caracteres' }
            })}
          />
        </FormControl>

        <Center h='100px' color='white'>
          <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>Registrar</Button>
        </Center>
      </Flex>

    </Box>

  )
}

export default Register
