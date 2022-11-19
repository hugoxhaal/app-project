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
        <Box w='100%' h='calc(100vh)'>
          {children}
        </Box>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider>
      <Box w='100%' h='calc(100vh)' bg='rgba(240, 240, 240, 0.4)'>
        <NavBar>{children}</NavBar>
      </Box>
    </ChakraProvider>
  )
}
