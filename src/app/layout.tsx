import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeatioLogo from "@/components/logos/Heatio";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heatio To-Do",
  description: "Heatio To-Do is a simple to-do list app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-heatio-mid-blue`}
      >
        <header className="w-full bg-heatio-dark-blue text-white py-10 border-b-2 border-heatio-dividing-line">
          <div className="container mx-auto px-4">
            <HeatioLogo />
          </div>
        </header>
        <div className="container mx-auto px-4">{children}</div>
        <ToastContainer theme="colored" />
      </body>
    </html>
  );
}
