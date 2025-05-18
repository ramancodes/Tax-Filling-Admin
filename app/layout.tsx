import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/headerFooter/header";
import ReduxProvider from "./reduxProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Toaster position="bottom-right"/>
            <Header />
              {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
