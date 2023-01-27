'use client'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  { selector: row => row.subjectName, name: 'Materia', sortable: true },
  { selector: row => row.Periods.period, name: 'Periodo', sortable: true },
  { cell: (row) => <MenuComponent row={row} />, name: 'Acciones' }
]

const MenuComponent = ({ row }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  const handleDelete = async ({ id }) => {
    setIsFetching(true)
    try {
      const res = await axios.post('/api/subjects/delete', { id })
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
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} disabled={isPending}>
        Opciones
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem onClick={() => handleDelete({ id: row?.id })}>Eliminar Materia</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}
const TableMaster = ({ data }) => {
  console.log(data)

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
      <DataTable title='Listado' columns={columns} data={data} pagination />
    </Box>
  )
}

export default TableMaster
