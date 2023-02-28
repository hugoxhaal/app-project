'use client'
import React, { useEffect, useState } from 'react'
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
import moment from 'moment'

const Register = ({ dataStudents }) => {
  const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm()
  const { fields, append, remove } = useFieldArray({ name: 'subjects', control })

  const [subjects, setSubjects] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [dataPeriods, setDataPeriods] = useState([])

  const router = useRouter()
  const onSubmit = async (data) => {
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

  const filterSubjects = (periodId) => {
    const filterData = [...dataPeriods]
    const inscription = filterData.find(period => period.id === Number(periodId))
    setSubjects(inscription?.Subjects)
  }

  useEffect(() => {
    async function loadPeriodsByStudent () {
      try {
        const res = await axios.get(`/api/periods/periods-without-califications/${selectedStudent}`)

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
            onClick={(e) => setSelectedStudent(e.target.value)}
          >
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
            disabled={!dataPeriods || dataPeriods?.length === 0}
            placeholder='Selecciona'
            {...register('periodId', {
              required: 'Campo requerido'
            })}
            onClick={(e) => filterSubjects(e.target.value)}
          >
            {dataPeriods?.map(insc => (
              <option key={insc?.id} value={insc?.id}>{insc?.period} Periodo {moment(insc?.Periods?.periodYear).format('YYYY')} - {insc?.semester}</option>
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
              min={0}
              max={5}
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
