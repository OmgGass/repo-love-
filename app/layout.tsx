import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "@/components/ClientLayout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Memories - Site do Amor",
  description: "Um site especial feito com amor",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
