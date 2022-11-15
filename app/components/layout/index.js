'use client'
import { ChakraProvider, Box } from '@chakra-ui/react'

export default function Layout ({ children }) {
  return (
    <ChakraProvider>
      <Box w='100%' h='100%' align='center' justify='center'>
        {children}
      </Box>
    </ChakraProvider>
  )
}
