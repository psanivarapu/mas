import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Growth Readiness Assessment — Hong Leong Group',
  description:
    'Understand where your company stands on AI readiness across Governance, Technology, People, and Culture.',
  keywords: ['AI readiness', 'AI maturity', 'Hong Leong Group', 'TransformTechX'],
  openGraph: {
    title: 'AI Growth Readiness Assessment — Hong Leong Group',
    description: 'Assess your company\'s AI readiness in minutes.',
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
