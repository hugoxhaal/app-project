'use client'
import { Box } from '@chakra-ui/react'
import React from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  { selector: row => row.periodName, name: 'Periodo', sortable: true }
]

const data = [
  { id: 1, periodName: '1 Periodo' },
  { id: 2, periodName: '1 Periodo' },
  { id: 3, periodName: '1 Periodo' },
  { id: 4, periodName: '1 Periodo' }
]

const TableMaster = () => {
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
