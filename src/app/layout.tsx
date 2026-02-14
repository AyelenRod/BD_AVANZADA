import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sistema de Reportes",
  description: "Reportes de BD Avanzada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ borderBottom: '2px solid #f06292', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: '#e91e63', color: 'white', padding: '5px 10px', borderRadius: '8px', fontWeight: 'bold' }}>R</div>
            <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: '#880e4f' }}>
              Sistema de Reportes
            </Link>
          </header>
          <main>
            {children}
          </main>
          <footer style={{ marginTop: '40px', paddingTop: '10px', borderTop: '1px solid #eeccee', fontSize: '12px', color: '#ad1457' }}>
          ≽^• ˕ • ྀི≼
          </footer>
        </div>
      </body>
    </html>
  );
}
