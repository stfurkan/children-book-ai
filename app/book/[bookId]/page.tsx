import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';
import { auth } from "@/auth";
import { fetchBook } from "@/lib/db/fetchBook";
import { BookSummary } from "@/components/Book/BookSummary";

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
) {
  const book = await fetchBook(bookId);
  if (!book) {
    return notFound();
  }

  return {
    title: `${book.book.title} | Children's Book AI`,
    description: book.book.shortDescription,
    openGraph: {
      images: [
        book.book.image,
      ],
    },
  };
}

export default async function BookPageSummary({ params: { bookId } }: BookPageProps) {
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

  return (
    <BookSummary
      book={book}
      user={session?.user}
    />
  );
}
