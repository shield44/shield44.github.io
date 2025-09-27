import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'shield44 - Tech Enthusiast & ROM Developer',
  description: 'Portfolio of shield44 (Thejas KS) - Passionate tech enthusiast, ROM developer, and software engineer',
  keywords: ['shield44', 'ROM developer', 'software engineer', 'tech enthusiast', 'Thejas KS'],
  authors: [{ name: 'shield44' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}