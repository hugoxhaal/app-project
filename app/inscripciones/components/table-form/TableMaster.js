'use client'
import {
  Box

} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import DataTable from 'react-data-table-component'

const columns = [
  { selector: row => row.Students.studentName, name: 'Estudiante', sortable: true },
  { selector: row => moment(row.Periods.periodYear).format('YYYY'), name: 'Año', sortable: true },
  { selector: row => { return row.Periods.period + ' Periodo ' }, name: 'Periodo', sortable: true },
  { selector: row => row.Periods.semester, name: 'Semestre', sortable: true }
]

// const MenuComponent = ({ row }) => {
//   return (
//     <Menu>
//       <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//         Opciones
//       </MenuButton>
//       <Portal>
//         <MenuList>
//           <MenuItem>Eliminar Inscripcion</MenuItem>
//         </MenuList>
//       </Portal>
//     </Menu>
//   )
// }

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
