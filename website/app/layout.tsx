import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "./layoutwrapper";
import "./globals.css";
import React from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bewerbung für einen Job als Werkstudent",
  description: "Bewerbung für einen Job als Werkstudent",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {

return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >  
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

