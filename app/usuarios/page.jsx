import React from 'react'
import DataTable from 'react-data-table-component'
import Register from '../components/register-form/Register'

const columns = [
  { selector: row => row.email, name: 'Nombre del Estudiante' },
  { selector: row => row.fullName, name: 'Cedula' },
  { selector: row => row.rol, name: 'Rol' }
]

const data = [
  { email: 'Pedro Perez', fullName: '12.123.123', rol: 'admin' }
]

export default function page () {
  return (
    <>
      <Register />
      <DataTable columns={columns} data={data} />
    </>
  )
}
