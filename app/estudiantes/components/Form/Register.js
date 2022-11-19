'use client'
import React, { useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Center

} from '@chakra-ui/react'

const Register = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Box
      rounded='md'
      shadow='1px 1px 3px rgba(0,0,0,0.2)'
      p={6}
      m='30px'
      as='form'
      marginX={300}
      backgroundColor='white'
    >
      <Box>
        <Heading w='100%' textAlign='center' fontWeight='bold' mb='3%' fontSize={32}>
          Registrar Estudiante
        </Heading>
        <Flex>
          <FormControl mr='5%'>
            <FormLabel htmlFor='first-name' fontWeight='bold'>
              Nombre del Estudiante
            </FormLabel>
            <Input id='first-name' placeholder='First name' />
          </FormControl>

          <FormControl mr='5%'>
            <FormLabel htmlFor='last-name' fontWeight='bold'>
              Cedula
            </FormLabel>
            <Input id='last-name' placeholder='First name' />
          </FormControl>

          <FormControl>
            <Center h='100px' color='white'>
              <Button colorScheme='teal'>Registrar </Button>
            </Center>
          </FormControl>
        </Flex>

      </Box>
    </Box>

  )
}

export default Register
