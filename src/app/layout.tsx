import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adarsh Santhosh - Developer Portfolio",
  description: "An interactive portfolio of Adarsh Santhosh, a B.Tech Computer Science Student and Aspiring Software Developer.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark text-white`}>
        {children}
      </body>
    </html>
  );
}
