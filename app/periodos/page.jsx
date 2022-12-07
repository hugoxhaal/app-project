import axios from 'axios'
import React from 'react'
import Register from './components/register-form/Register'
import TableMaster from './components/table-form/TableMaster'

const getData = async () => {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/periods`)
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

  return (
    <>
      <Register />
      <TableMaster data={data} />
    </>
  )
}
