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

  if (!book) {
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
