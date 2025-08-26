import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

// Import Inter for body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Define the Satoshi font for headings
export const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  display: 'swap',
  variable: '--font-satoshi',
}) 