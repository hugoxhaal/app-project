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
import React from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  { selector: row => row.Periods.period, name: 'Periodo', sortable: true },
  { selector: row => row.Students.studentName, name: 'Estudiante', sortable: true },
  { cell: (row) => <MenuComponent row={row} />, name: 'Acciones' }
]

const MenuComponent = ({ row }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Opciones
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>Eliminar Inscripcion</MenuItem>
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
