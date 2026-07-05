import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Growth Readiness and Maturity Index',
  description:
    'Understand where your organization stands on AI & analytics maturity. Know where to go next.',
  keywords: ['AI maturity', 'analytics maturity', 'GenAI assessment', 'BFSI', 'Martech'],
  openGraph: {
    title: 'AI Growth Readiness and Maturity Index',
    description: 'Assess your organization\'s AI & analytics maturity in minutes.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-[#0A1628] text-white antialiased">{children}</body>
    </html>
  )
}
