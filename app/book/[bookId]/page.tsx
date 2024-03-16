type BookPageProps = {
  params: {
    bookId: string;
  };
};

export default function BookPage({ params: { bookId } }: BookPageProps) {
  return (
    <div className="flex flex-row justify-center">
      Book ID: {bookId}
    </div>
  );
}
