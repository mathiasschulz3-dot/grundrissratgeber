import './globals.css'

export const metadata = {
  title: 'GrundrissRatgeber.de - Dein Traumhaus digital planen',
  description: 'Plane dein Traumhaus in 2D & 3D, finde Möbel und verbinde dich mit Bauträgern',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
