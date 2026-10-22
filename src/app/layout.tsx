import type { Metadata } from 'next'
import '../styles/globals.css'
import InteractiveRepoBackground from '@/components/InteractiveRepoBackground'

export const metadata: Metadata = {
  title: 'Thejas KS - Tech Enthusiast & ROM Developer',
  description:
    'Portfolio of Thejas KS - passionate tech enthusiast, ROM developer, and software engineer.',
  keywords: ['Thejas KS', 'ROM developer', 'software engineer', 'tech enthusiast'],
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
        <script
          src="https://www.paypal.com/sdk/js?client-id=BAA9qgjXvMKO0gUqRnE9zWoXHh1f9iMBnGXHnr7fvjEGQWSAkAndZ56iXS3zMLNrwXp-HThuLasLH8l5JM&components=hosted-buttons&disable-funding=venmo&currency=USD"
        ></script>
      </head>
      <body>
        <InteractiveRepoBackground />
        {children}
      </body>
    </html>
  )
}
