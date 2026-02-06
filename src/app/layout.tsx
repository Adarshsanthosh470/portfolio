import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import the Script component
import PageTransition from "@/components/PageTransition";
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
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V3G5DX0Y8T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-V3G5DX0Y8T');
          `}
        </Script>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}