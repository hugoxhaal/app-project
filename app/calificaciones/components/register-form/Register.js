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
  Center,
  Select
} from '@chakra-ui/react'
import axios from 'axios'
import { useForm, useFieldArray } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const Register = ({ dataStudents }) => {
  const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm()
  const { fields, append, remove } = useFieldArray({ name: 'subjects', control })

  const [subjects, setSubjects] = useState([])
  const router = useRouter()
  const onSubmit = async (data) => {
    console.log('ata', data)
    if (errors.length > 0) return
    try {
      const res = await axios.post('/api/califications/create', { ...data, userId: 3, createdBy: 'admin' })
      if (res.statusText === 'OK') {
        router.refresh()
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const filterStudent = (studentId) => {
    console.log('studentId: ', studentId)
    const filterData = [...dataStudents]
    const students = filterData.find(student => student.id === Number(studentId))
    setSubjects(students?.Inscriptions[0].Periods.Subjects)
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
        Calificaciones
      </Heading>
      <Flex>

        <FormControl mr='5%'>
          <FormLabel htmlFor='studentId' fontWeight='bold' textOverflow='ellipsis'>
            Estudiante
          </FormLabel>
          <Select
            placeholder='Selecciona'
            {...register('studentId', {
              required: 'Campo requerido'
            })}
            onClick={(e) => filterStudent(e.target.value)}
          >
            {dataStudents.map(student => (
              <option key={student.id} value={student.id}>{student.studentName}</option>
            ))}
          </Select>

        </FormControl>

        <FormControl mr='5%'>
          <FormLabel htmlFor='subjectId' fontWeight='bold' textOverflow='ellipsis'>
            Materia
          </FormLabel>
          {subjects?.map(subject => (
            <Input
              disabled
              defaultValue={subject.subjectName}
              key={subject.id}
              placeholder='subjectId'
            />
          ))}
        </FormControl>

        <FormControl mr='5%'>
          <FormLabel fontWeight='bold' textOverflow='ellipsis'>
            Calificacion
          </FormLabel>
          {subjects?.map((item, i) => (
            <Input
              key={item.id}
              {...register(`subjects[${i}].calification`)}
              name={`subjects[${i}].calification`}
              type='number'
              placeholder='Calificacion'
              onChange={() => setValue(`subjects[${i}].subjectId`, item.id)}
            />
          ))}

        </FormControl>

      </Flex>
      <Center h='100px' color='white'>
        <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>Registrar</Button>
      </Center>
    </Box>

  )
}

export default Register
