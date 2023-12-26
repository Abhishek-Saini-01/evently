import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/lib/SessionProvider'
import { getServerSession } from 'next-auth'
import './globals.css'



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Evently',
  description: 'Evently is a platform for event management.',
  icons: {
    icon: '/assets/images/logo.svg'
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
      <html lang="en">
        <AuthProvider>
          <body className={poppins.variable}>
            {children}
          <Toaster />

          </body>
        </AuthProvider>
      </html>
  )
}