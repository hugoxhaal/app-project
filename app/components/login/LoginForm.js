'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightElement
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur'
  })
  const router = useRouter()

  const [_, setUser] = useLocalStorage('user')
  const [_2, setLoginDate] = useLocalStorage('loginDate')

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShow = () => setShowPassword(!showPassword)

  const onSubmit = data => {
    setUser(data.email)
    setLoginDate(new Date())
    router.push('/estudiantes')
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl'>Inicia sesion con tu cuenta</Heading>
          <Text fontSize='lg' color='gray.600'>
            para ingresar al <Link color='blue.400'>sistema</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  autoComplete='off' {...register('email', {
                    required: { value: true, message: 'Este campo es requerido' },
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Debe ingresar un correo electrónico válido' }
                  })}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    {...register('password', {
                      required: { value: true, message: 'Este campo es requerido' }
                    })}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClickShow}>
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align='start'
                  justify='space-between'
                >
                  <Link color='blue.400'>Olvidaste tu contraseña ?</Link>
                </Stack>
                <Button
                  bg='blue.400'
                  color='white'
                  _hover={{
                    bg: 'blue.500'
                  }}
                  type='submit'
                >
                  Iniciar sesion
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default LoginForm
