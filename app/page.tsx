import { auth } from "@/auth";
import { Home } from "@/components/Home/Home";
import { fetchBooks } from "@/lib/db/fetchBook";

export default async function HomePage() {
  const session = await auth();

  const allBooks = await fetchBooks(1, 4);

  return (
    <div className="flex flex-row justify-center">
      <Home
        user={session?.user}
        allBooks={allBooks}
      />
    </div>
  );
}
