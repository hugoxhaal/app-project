import React from 'react'
import Link from 'next/link'

import {
  Box,
  HStack
} from '@chakra-ui/react'

const NavLink = ({ children }) => <Link href='#'>{children}</Link>

const Logo = ({ links }) => {
  return (
    <HStack spacing={8} alignItems='center'>
      <Box>Logo</Box>
      <HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
        {links.map((link) => (
          <NavLink key={link}>{link}</NavLink>
        ))}
      </HStack>
    </HStack>
  )
}

export default Logo
