import axios from 'axios'
import React from 'react'
import Register from './components/register-form/Register'
import TableMaster from './components/table-form/TableMaster'

const getData = async () => {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/califications`)
    if (res.statusText === 'OK') {
      return res.data
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
  }
}

const loadStudents = async () => {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/registered-students`)
    if (res.statusText === 'OK') {
      return res.data
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
  }
}

export default async function page () {
  const data = await getData()
  const dataStudents = await loadStudents()

  return (
    <>
      <Register dataStudents={dataStudents} />
      <TableMaster data={data} />
    </>
  )
}
