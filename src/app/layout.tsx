import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Udilovic Tech | Web Development & QA Services',
  description: 'Udilovic Tech specializes in creating high-performing web applications and software solutions that help businesses grow in the digital landscape.',
  keywords: 'web development, QA services, software testing, React, Next.js, TypeScript, Node.js',
  authors: [{ name: 'Udilovic Tech' }],
  creator: 'Udilovic Tech',
  publisher: 'Udilovic Tech',
  openGraph: {
    title: 'Udilovic Tech | Web Development & QA Services',
    description: 'Professional web development and QA services for modern businesses',
    url: 'https://udilovictech.it.com',
    siteName: 'Udilovic Tech',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Udilovic Tech | Web Development & QA Services',
    description: 'Professional web development and QA services for modern businesses',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 