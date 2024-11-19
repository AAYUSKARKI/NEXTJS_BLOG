import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import Navbar from "@/components/Navbar";
import {SessionProvider} from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSIT HELP",
  description: "A blog Web App For CSIT students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html lang="en">   
      <body className={inter.className}>
        <Navbar/>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
    </SessionProvider>
  );
}
