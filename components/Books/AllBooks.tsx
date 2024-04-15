import React from 'react';
import { useTranslations } from 'next-intl';
import { BookCard } from "@/components/Books/BookCard";
import { BookSearch } from "@/components/Books/BookSearch";
import { PaginationComponent } from "@/components/Pagination/PaginationComponent";
import { AuthorType, BookCardType } from '@/types/dbTypes';
import { AuthorDetails } from '../Author/AuthorDetails';
import { Separator } from '@/components/ui/separator';

export function AllBooks({
  totalBooks,
  allBooks,
  totalPages,
  page,
  authorDetails,
  currentUser = false,
}: {
  totalBooks: number;
  allBooks?: BookCardType[];
  totalPages: number;
  page: number;
  authorDetails?: Omit<AuthorType, 'id' | 'authorId'>;
  currentUser?: boolean;
}) {
  const t = useTranslations('AllBooks');

  return (
    <div className="flex flex-col justify-between items-center">
      {authorDetails && (
        <AuthorDetails authorDetails={authorDetails} />
      )}
      <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
        ~ {t('books')} ~
      </h1>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-4 w-full">
        {totalBooks > 0 && (
          <p className="text-sm md:text-base text-nowrap">
            {t('totalBooks', { count: totalBooks })}
          </p>
        )}
        <BookSearch />
      </div>
      <Separator className="mt-2 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allBooks && allBooks.length > 0 && allBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            currentUser={currentUser}
          />
        ))}
      </div>

      {(!allBooks || allBooks.length === 0) && (
        <p className="text-muted-foreground">{t('notFound')}</p>
      )}

      <div className="mt-8">
        <PaginationComponent totalPages={totalPages} currentPage={page || 1} />
      </div>
    </div>
  )
}
