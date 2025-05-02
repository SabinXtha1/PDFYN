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
  title: "PDFYN | Online Certificate Generator & PDF Maker",
  description:
    "Create, customize, and download professional certificates online. Generate employment, achievement, appreciation, training, academic, and more certificate types as high-quality PDFs. Free, fast, and easy certificate maker for employees, students, and organizations.",
  keywords: [
    "certificate generator",
    "PDF certificate",
    "online certificate maker",
    "employment certificate",
    "achievement certificate",
    "training certificate",
    "academic certificate",
    "appreciation certificate",
    "download certificate PDF",
    "custom certificate",
    "free certificate template",
    "employee certificate",
    "student certificate",
    "award certificate",
    "membership certificate",
    "professional certificate",
    "domain registration letter"
  ],
  openGraph: {
    title: "PDFYN | Online Certificate Generator & PDF Maker",
    description:
      "Create, customize, and download professional certificates online. Generate employment, achievement, appreciation, training, academic, and more certificate types as high-quality PDFs. Free, fast, and easy certificate maker for employees, students, and organizations.",
    url: "https://pdfyn.com/",
    siteName: "PDFYN",
    images: [
      {
        url: "/n1.png",
        width: 1200,
        height: 630,
        alt: "PDFYN Certificate Generator Preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFYN | Online Certificate Generator & PDF Maker",
    description:
      "Create, customize, and download professional certificates online. Generate employment, achievement, appreciation, training, academic, and more certificate types as high-quality PDFs. Free, fast, and easy certificate maker for employees, students, and organizations.",
    site: "@pdfyn",
    images: [
      {
        url: "/n1.png",
        alt: "PDFYN Certificate Generator Preview"
      }
    ]
  }
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
