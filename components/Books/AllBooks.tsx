import React from 'react';
import { BookCard } from "@/components/Books/BookCard";
import { PaginationComponent } from "@/components/Pagination/PaginationComponent";
import { AuthorType, BookCardType } from '@/types/dbTypes';
import { AuthorDetails } from '../Author/AuthorDetails';

export function AllBooks({
  allBooks,
  totalPages,
  page,
  authorDetails,
}: {
  allBooks?: BookCardType[];
  totalPages: number;
  page: number;
  authorDetails?: Omit<AuthorType, 'id' | 'authorId'>;
}) {
  return (
    <div className="flex flex-col justify-between items-center">
      {authorDetails && (
        <AuthorDetails authorDetails={authorDetails} />
      )}
      <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
        ~ Books ~
      </h1>
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
