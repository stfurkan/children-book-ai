import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { auth } from "@/auth";
import { fetchBook } from "@/lib/db/fetchBook";
import { BookContent } from "@/components/Book/BookContent";

type BookPageProps = {
  params: {
    bookId: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

export async function generateMetadata(
  { params: { bookId } }: BookPageProps,
): Promise<Metadata> {
  const book = await fetchBook(bookId);
  if (!book) {
    return notFound();
  }

  return {
    title: `${book.book.title} | Children's Book AI`,
    description: book.book.shortDescription,
    openGraph: {
      images: [
        {
          url: book.book.image || `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/book-placeholder.png`,
          width: 1024,
          height: 1024,
          alt: book.book.title,
        }
      ],
    },
    twitter: {
      images: [
        {
          url: book.book.image || `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/book-placeholder.png`,
          width: 1024,
          height: 1024,
          alt: book.book.title,
        }
      ],
    },
  };
}

export default async function BookPageRead({ params: { bookId }, searchParams }: BookPageProps) {
  const session = await auth();
  const book = await fetchBook(bookId);
  const bookStatus = book?.book.published;
  const isUserAuthor = session?.user && book?.book.author === session.user.id;

  if (!book) {
    notFound();
  }

  if (!bookStatus && !isUserAuthor) {
    notFound();
  }

  const pageParam = searchParams?.page ? parseInt(searchParams?.page, 10) : undefined;
  const page = (pageParam && pageParam > 0 && pageParam <= book.pages.length)
    ? parseInt(searchParams.page, 10)
    : undefined;

  return (
    <BookContent
      book={book}
      user={session?.user}
      page={page}
    />
  );
}
