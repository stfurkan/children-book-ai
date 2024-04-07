import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://childrensbookai.net'),
  title: "Children’s Book AI",
  description: "Children’s Book AI is a platform for authors to write and publish children’s books. We use AI to help authors write and publish books faster.",
  openGraph: {
    type: "website",
    url: "https://childrensbookai.net",
    title: "Children’s Book AI",
    description: "Children’s Book AI is a platform for authors to write and publish children’s books. We use AI to help authors write and publish books faster.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
        width: 1024,
        height: 1024,
        alt: "Children’s Book AI",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
