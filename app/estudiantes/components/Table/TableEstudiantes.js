'use client'
import React from 'react'
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody
} from '@chakra-ui/react'

const TableEstudiantes = () => {
  return (
    <Box
      rounded='md'
      shadow='1px 1px 3px rgba(0,0,0,0.2)'
      p={6}
      m='30px'
      as='form'
      backgroundColor='white'
    >
      <TableContainer marginX={30} marginY={30}>
        <Table size='md'>
          <Thead>
            <Tr>
              <Th>Nombre del Estudiante</Th>
              <Th>Cédula</Th>
              <Th isNumeric>Fecha de Inscripción</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>{Date()}</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>{Date()}</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>{Date()}</Td>
            </Tr>
          </Tbody>

        </Table>
      </TableContainer>
    </Box>
  )
}

export default TableEstudiantes
