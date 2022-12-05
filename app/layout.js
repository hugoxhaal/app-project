import Providers from './providers'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <head />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
