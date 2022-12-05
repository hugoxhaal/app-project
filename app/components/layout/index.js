'use client'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { ProvideAuth, useAuth } from '../../hooks/useAuth'
import { useHasMounted } from '../../hooks/useHasMounted'

import NavBar from './navbar'

export default function Layout ({ children }) {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return null
  }

  const AuthLayout = ({ children }) => {
    const { user } = useAuth()

    if (!user) {
      return (
        <Box w='100%' h='calc(100vh)'>
          {children}
        </Box>
      )
    } else {
      return (
        <Box w='100%' h='calc(100vh)' bg='rgba(240, 240, 240, 0.4)'>
          <NavBar>{children}</NavBar>
        </Box>
      )
    }
  }

  return (
    <ProvideAuth>
      <ChakraProvider>
        <AuthLayout>{children}</AuthLayout>
      </ChakraProvider>
    </ProvideAuth>

  )
}
