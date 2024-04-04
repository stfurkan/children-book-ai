import { BookCardType } from '@/types/dbTypes';
import { BookCard } from '@/components/Books/BookCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function FeaturedBooks({ allBooks }: { allBooks?: BookCardType[] }) {
  return (
    <section className="flex flex-col items-center py-12">
      <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-8">~ Featured Books ~</h2>
      <div className="max-w-sm md:max-w-3xl px-4">
        <Carousel>
          <CarouselContent>
            {allBooks?.map((book) => (
                <CarouselItem key={book.id} className="basis-1/2 md:basis-1/3">
                  <BookCard book={book} />
                </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
