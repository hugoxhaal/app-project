import React from 'react'
import Link from 'next/link'

import {
  Box,
  HStack
} from '@chakra-ui/react'

const Logo = ({ links }) => {
  return (
    <HStack spacing={8} alignItems='center'>
      <Box>Logo</Box>
      <HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
        {links.map((link, i) => (
          <Link key={i} href={link.path}>{link.name}</Link>
        ))}
      </HStack>
    </HStack>
  )
}

export default Logo
