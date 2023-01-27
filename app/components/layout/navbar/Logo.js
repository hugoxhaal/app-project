import React from 'react'
import Link from 'next/link'

import {
  HStack
} from '@chakra-ui/react'

const Logo = ({ links }) => {
  return (
    <HStack spacing={8} alignItems='center'>
      <HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
        {links.map((link, i) => (
          <Link key={i} href={link.path}><b>{link.name}</b></Link>
        ))}
      </HStack>
    </HStack>
  )
}

export default Logo
