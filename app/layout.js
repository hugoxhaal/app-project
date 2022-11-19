import Layout from './components/layout'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <head />
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
