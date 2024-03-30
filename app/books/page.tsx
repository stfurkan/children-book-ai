/* eslint-disable @next/next/no-img-element */
import { AllBooks } from "@/components/Books/AllBooks";
import { fetchBooks, totalBookCount } from "@/lib/db/fetchBook";

type BooksPageProps = {
  searchParams: {
    [key: string]: string;
  };
};

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const bookCount = (await totalBookCount()) || 0;
  const pageSize = 9;
  const totalPages = Math.ceil(bookCount / pageSize);

  const pageParam = searchParams?.page ? parseInt(searchParams?.page, 10) : undefined;
  const page = (pageParam && pageParam > 0 && pageParam <= totalPages)
    ? parseInt(searchParams.page, 10)
    : undefined;
    
  const allBooks = await fetchBooks(page || 1, pageSize);

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
          ~ Books ~
        </h1>
        
        <AllBooks allBooks={allBooks} totalPages={totalPages} page={page || 1} />
      </div>
    </div>
  );
}
