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
