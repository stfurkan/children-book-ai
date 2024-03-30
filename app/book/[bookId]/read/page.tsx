import { notFound } from "next/navigation";
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
