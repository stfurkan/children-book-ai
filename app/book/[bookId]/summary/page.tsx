import { notFound } from "next/navigation";
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

export default async function BookPageSummary({ params: { bookId } }: BookPageProps) {
  const session = await auth();
  const book = await fetchBook(bookId);

  if (!book) {
    notFound();
  }

  return (
    <BookSummary
      book={book}
      user={session?.user}
    />
  );
}
