import React from 'react'
import Register from '../components/register-form/Register'
import TableMaster from '../components/table-form/TableMaster'

const columns = [
  { dataIndex: 'studentName', name: 'Nombre del Estudiante' },
  { dataIndex: 'cedula', name: 'Cedula' },
  { dataIndex: 'registerDate', name: 'Fecha de Registro', isNumeric: true }
]

const data = [
  { studentName: 'Pedro Perez', cedula: '12.123.123', registerDate: Date() },
  { studentName: 'Manuel Lopez', cedula: '21.123.123', registerDate: Date() }
]

export default function page () {
  return (
    <>
      <Register />
      <TableMaster columns={columns} data={data} />
    </>
  )
}
