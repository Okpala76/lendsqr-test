import QueryProvider from "@/components/QueryProvider";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "lendsqr",
  description: "Test UI build out of an admin flow on lendsqr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
