import QueryProvider from "@/components/QueryProvider";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "lendsqr",
  description: "Test UI build out of an admin flow on lendsqr",
};

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col  ${workSans.className}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
