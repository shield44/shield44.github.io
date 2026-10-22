import type { Metadata } from 'next'
import Script from 'next/script'
import StartupLoader from '@/components/StartupLoader'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Thejas KS - Tech Enthusiast & ROM Developer',
  description:
    'Portfolio of Thejas KS, a second-year CSE student at RVCE and open-source ROM developer.',
  keywords: ['Thejas KS', 'RVCE', 'CSE student', 'ROM developer', 'open source'],
  authors: [{ name: 'Thejas KS' }],
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
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js" strategy="beforeInteractive" />
        <script
          src="https://www.paypal.com/sdk/js?client-id=BAA9qgjXvMKO0gUqRnE9zWoXHh1f9iMBnGXHnr7fvjEGQWSAkAndZ56iXS3zMLNrwXp-HThuLasLH8l5JM&components=hosted-buttons&disable-funding=venmo&currency=USD"
        ></script>
      </head>
      <body>
        <StartupLoader />
        {children}
      </body>
    </html>
  )
}
