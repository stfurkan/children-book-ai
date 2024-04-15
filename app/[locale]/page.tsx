import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { Home } from "@/components/Home/Home";
import { fetchBooks } from "@/lib/db/fetchBook";


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

export default async function HomePage() {
  const session = await auth();

  const allBooks = await fetchBooks(1, 4);

  return (
    <div className="flex flex-row justify-center">
      <Home
        user={session?.user}
        allBooks={allBooks}
      />
    </div>
  );
}
