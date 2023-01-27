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
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  {
    selector: (row) => row.period,
    name: 'Periodo',
    sortable: true,
    maxWidth: '0'
  },
  {
    selector: (row) => {
      return moment(row.periodYear).format('YYYY')
    },
    name: 'Año del Periodo',
    sortable: true
  },
  {
    selector: (row) => {
      return row.isActive ? 'Activo' : 'Inactivo'
    },
    name: 'Estado del Periodo'
  },
  {
    selector: (row) => {
      return row.isClosed ? 'Cerrado' : 'Abierto'
    },
    name: 'Vigencia del Periodo'
  },
  { cell: (row) => <MenuComponent row={row} />, name: 'Acciones' }
]

const MenuComponent = ({ row }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  const isMutating = isFetching || isPending

  const handleUpdate = async ({ id, isActive, isClosed }) => {
    setIsFetching(true)
    try {
      const res = await axios.post('/api/periods/update-status', { id, isActive, isClosed })
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

  const handleDelete = async ({ id }) => {
    setIsFetching(true)
    try {
      const res = await axios.post('/api/periods/delete', { id })
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

  const closeOpenText = row?.isClosed ? 'Abrir Periodo' : 'Cerrar Periodo'
  const deactiveActiveText = row?.isActive ? 'Desactivar Periodo' : 'Activar Periodo'

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} disabled={isPending}>
        Opciones
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem onClick={() => handleUpdate({ id: row?.id, isActive: !row?.isActive, isClosed: row?.isClosed })}>{deactiveActiveText}</MenuItem>
          <MenuItem onClick={() => handleUpdate({ id: row?.id, isActive: row?.isActive, isClosed: !row?.isClosed })}>{closeOpenText}</MenuItem>
          {/* <MenuItem onClick={() => handleDelete({ id: row?.id })}>Eliminar Periodo</MenuItem> */}
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
