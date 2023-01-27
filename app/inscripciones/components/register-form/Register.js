'use client'
import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Center,
  Select

} from '@chakra-ui/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import moment from 'moment'

const Register = ({ dataStudents }) => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [selectedStudent, setSelectedStudent] = useState('')
  const [dataPeriods, setDataPeriods] = useState([])

  const onSubmit = async (data) => {
    if (errors.length > 0) return
    try {
      const res = await axios.post('/api/inscriptions/create', { ...data, userId: 3, createdBy: 'admin' })
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

  console.log('periodsd, ', dataPeriods)

  useEffect(() => {
    async function loadPeriodsByStudent () {
      console.log('x', selectedStudent)
      try {
        const res = await axios.get(`/api/periods/periods-by-student/${selectedStudent}`)
        if (res.statusText === 'OK') {
          setDataPeriods(res.data)
        } else {
          setDataPeriods([])
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (selectedStudent !== '') { loadPeriodsByStudent(selectedStudent) }
  }, [selectedStudent])

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
        Inscripciones
      </Heading>
      <Flex>

        <FormControl mr='5%'>
          <FormLabel htmlFor='studentId' fontWeight='bold' textOverflow='ellipsis'>
            Estudiante
          </FormLabel>
          <Select
            {...register('studentId', {
              required: 'Campo requerido'
            })}
            onClick={(e) => setSelectedStudent(e.target.value)}
          >
            <option value=''>Selecciona</option>
            {dataStudents.map(student => (
              <option key={student.id} value={student.id}>{student.studentName}</option>

            ))}
          </Select>
        </FormControl>
        <FormControl mr='5%'>
          <FormLabel htmlFor='periodId' fontWeight='bold' textOverflow='ellipsis'>
            Periodo
          </FormLabel>
          <Select
            {...register('periodId', {
              required: 'Campo requerido'
            })}
          >
            {dataPeriods?.map(el => (
              <option key={el.id} value={el.id}>{el?.period} Periodo {moment(el.periodYear).format('YYYY')}</option>
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
