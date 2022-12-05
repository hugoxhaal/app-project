'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ProvideAuth } from './hooks/useAuth'
import Layout from './components/Layout'

export default function Providers ({ children }) {
  return (
    <ProvideAuth>
      <ChakraProvider>
        <Layout>
          {children}
        </Layout>
      </ChakraProvider>
    </ProvideAuth>
  )
}
