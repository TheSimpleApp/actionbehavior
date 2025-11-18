import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABC Summit 2025",
  description: "Event management system for ABC Summit 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
