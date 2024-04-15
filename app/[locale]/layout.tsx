import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";


const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params: { locale }}: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    metadataBase: new URL('https://childrensbookai.net'),
    title: t('home.title'),
    description: t('home.description'),
    keywords: t('home.keywords'),
    openGraph: {
      type: "website",
      url: "https://childrensbookai.net",
      title: t('home.title'),
      description: t('home.description'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
          width: 1024,
          height: 1024,
          alt: t('home.title'),
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Layout>
            {children}
          </Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
