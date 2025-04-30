import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/resizable-navbar";
import Footer from "@/component/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PDFYN",
  description: "Generated Types of Certificates for Employees or anyone in PDF or different formats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
       <Navbar/>
        <div style={{paddingTop: '80px'}}>

        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
