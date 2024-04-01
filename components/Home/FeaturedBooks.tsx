import { BookCardType } from '@/types/dbTypes';
import { BookCard } from '../Books/BookCard';

export function FeaturedBooks({ allBooks }: { allBooks?: BookCardType[] }) {
  return (
    <section className="flex flex-col items-center py-12">
      <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-8">~ Featured Books ~</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {allBooks?.map((book) => (
            <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
