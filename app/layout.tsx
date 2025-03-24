import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getSession } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Neon Kicks | Premium Sneakers",
  description: "Shop the latest sneakers with a neon twist",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  const isLoggedIn = !!session

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-black grid-pattern`}>
        <Header isLoggedIn={isLoggedIn} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

