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
  { selector: (row) => row.studentName, name: 'Estudiante', sortable: true },
  { selector: (row) => row.cedula, name: 'Cedula', sortable: true },
  {
    selector: (row) => {
      return row.isActive ? 'Activo' : 'Inactivo'
    },
    name: 'Estado'
  },
  { cell: (row) => <MenuComponent row={row} />, name: 'Acciones' }
]

const MenuComponent = ({ row }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  const handleUpdate = async ({ id, isActive }) => {
    setIsFetching(true)
    try {
      const res = await axios.post('/api/students/update-status', {
        id,
        isActive
      })
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

  const deactiveActiveText = row?.isActive ? 'Desactivar Estudiante' : 'Activar Estudiante'

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Opciones
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem
            onClick={() =>
              handleUpdate({ id: row?.id, isActive: !row?.isActive })}
          >
            {deactiveActiveText}
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

const TableMaster = ({ data }) => {
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
