import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Indie Sleaze Portfolio',
  description: 'A personal website with 2010s Indie Sleaze album cover aesthetics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}