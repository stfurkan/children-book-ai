import React from 'react';
import { BookCard } from "@/components/Books/BookCard";
import { PaginationComponent } from "@/components/Pagination/PaginationComponent";
import { BookCardType } from '@/types/dbTypes';

export function AllBooks({
  allBooks,
  totalPages,
  page
}: {
  allBooks?: BookCardType[];
  totalPages: number;
  page: number;
}) {
  return (
    <div className="flex flex-col justify-between items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allBooks?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="mt-8">
        <PaginationComponent totalPages={totalPages} currentPage={page || 1} />
      </div>
    </div>
  )
}
