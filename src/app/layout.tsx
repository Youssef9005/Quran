import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "قرآن كريم",
  description: "موقع متكامل لقراءة القرآن الكريم وتحميله، مع توفير تجربة مميزة للمستخدمين للاستمتاع بتلاوة آيات القرآن مع تيسير الوصول إليها في أي وقت وأي مكان.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
