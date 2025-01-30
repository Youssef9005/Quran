import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
        className={` w-full min-h-screen`}
      >
        <Toaster position="bottom-right"/>
        {children}
      </body>
    </html>
  );
}
