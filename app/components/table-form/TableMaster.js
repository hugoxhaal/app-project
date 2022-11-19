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

const TableMaster = ({ columns = [], data = [] }) => {
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
              {columns.map((col, i) => (
                <Th key={i} isNumeric={col.isNumeric}>{col.name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, i) =>
              <Tr key={i}>
                {columns.map((col, j) =>
                  <Td key={j}>{row[col.dataIndex]}</Td>
                )}
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TableMaster
