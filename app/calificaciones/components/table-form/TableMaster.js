'use client'
import { Box, FormControl, FormLabel, Select, Flex, Input, Button } from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState, useTransition } from 'react'
import DataTable from 'react-data-table-component'

const ExpandedComponent = ({ data, dataStudent }) => {
  const router = useRouter()
  const [inscriptions, setInscriptions] = useState([])
  const [subjects, setSubjects] = useState([])
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  // const isMutating = isFetching || isPending

  const filterStudent = useCallback((studentId) => {
    const filterData = [...dataStudent]
    const students = filterData.find(student => student.id === Number(studentId))
    setInscriptions(students?.Inscriptions)
  }, [dataStudent])

  const filterSubjects = useCallback((periodId) => {
    const filterData = dataStudent[0]
    const inscription = filterData?.Califications?.filter(period => period.Subjects.periodId === Number(periodId))

    setSubjects(inscription)
  }, [dataStudent])

  const handleDelete = async ({ subjects }) => {
    console.log(subjects)

    setIsFetching(true)
    try {
      const res = await axios.post('/api/califications/delete', { subjects })
      setIsFetching(false)

      if (res.statusText === 'OK') {
        startTransition(() => {
          router.refresh()
        })
        return res.data
      }

      return 'Falló actualizando el estado, vuelva a intentarlo.'
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    filterStudent(data.data.id)
  }, [data.data.id, filterStudent])

  return (
    <Flex
      align='center'
      justify='center'
    >
      <Box width='80%'>
        <FormControl mr='5%'>
          <FormLabel htmlFor='periodId' fontWeight='bold' textOverflow='ellipsis'>
            Periodo
          </FormLabel>
          <Flex>
            <Select
              placeholder='Selecciona'
              onClick={(e) => filterSubjects(e.target.value)}
            >
              {inscriptions?.map(insc => (
                <option key={insc?.Periods?.id} value={insc?.Periods?.id}>{insc?.Periods?.period} Periodo {moment(insc?.Periods?.periodYear).format('YYYY')}</option>
              ))}
            </Select>
            {subjects.length > 0 && <Button onClick={() => handleDelete({ subjects })}>Eliminar</Button>}
          </Flex>
        </FormControl>

        <FormControl mr='5%'>
          <Flex
            align='center'
            justify='center'
          >

            <Flex>
              <FormControl mr='5%'>
                <FormLabel htmlFor='subjectId' fontWeight='bold' textOverflow='ellipsis'>
                  Materia
                </FormLabel>
                {subjects?.map(subject => (
                  <Input
                    disabled
                    defaultValue={subject.Subjects.subjectName}
                    key={subject.Subjects.id}
                    placeholder='Materia'
                  />
                ))}
              </FormControl>

              <FormControl mr='5%'>
                <FormLabel fontWeight='bold' textOverflow='ellipsis'>
                  Calificacion
                </FormLabel>
                {subjects?.map((item, i) => (
                  <Input
                    disabled
                    defaultValue={item.calification}
                    key={item.Subjects.id}
                    placeholder='Calificacion'
                  />
                ))}

              </FormControl>
            </Flex>

          </Flex>

        </FormControl>

      </Box>
    </Flex>

  )
}

const columns = [
  { selector: (row) => row?.studentName, name: 'Estudiante', sortable: true }
]

const TableMaster = ({ data, dataPeriods }) => {
  return (
    <Box
      rounded='md'
      shadow='1px 1px 3px rgba(0,0,0,0.2)'
      p={6}
      m='30px'
      marginX={250}
      as='form'
      backgroundColor='white'
    >
      <DataTable
        title='Listado'
        columns={columns}
        data={data}
        pagination
        expandableRows
        expandableRowsComponent={(values) => <ExpandedComponent data={values} dataStudent={data} dataPeriods={dataPeriods} />}
      />
    </Box>
  )
}

export default TableMaster
