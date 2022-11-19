'use client'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { useHasMounted } from '../../hooks/useHasMounted'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import NavBar from './navbar'

export default function Layout ({ children }) {
  const hasMounted = useHasMounted()
  const [storedValue] = useLocalStorage('user')

  if (!hasMounted) {
    return null
  }

  if (!storedValue) {
    return (
      <ChakraProvider>
        <Box w='100%' h='100%'>
          {children}
        </Box>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider>
      <Box w='100%' h='100%' backgroundColor='rgba(239, 243, 243, 0.4)'>
        <NavBar>{children}</NavBar>
      </Box>
    </ChakraProvider>
  )
}
