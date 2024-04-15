import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AllBooks } from "@/components/Books/AllBooks";
import { fetchBooks, totalBookCount } from "@/lib/db/fetchBook";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('books.title'),
    description: t('books.description'),
    openGraph: {
      type: "website",
      url: "https://childrensbookai.net/books",
      title: t('books.title'),
      description: t('books.description'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
          width: 1024,
          height: 1024,
          alt: t('books.title'),
        },
      ],
    },
  };
}

type BooksPageProps = {
  searchParams: {
    [key: string]: string;
  };
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const search = searchParams?.search || '';
  const bookCount = (await totalBookCount(search)) || 0;
  const pageSize = 9;
  const totalPages = Math.ceil(bookCount / pageSize);

  const pageParam = searchParams?.page ? parseInt(searchParams?.page, 10) : undefined;
  const page = (pageParam && pageParam > 0 && pageParam <= totalPages)
    ? parseInt(searchParams.page, 10)
    : undefined;
  
  const allBooks = await fetchBooks(page || 1, pageSize, search);

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full items-center">
        <AllBooks
          totalBooks={bookCount}
          allBooks={allBooks}
          totalPages={totalPages}
          page={page || 1}
        />
      </div>
    </div>
  );
}
