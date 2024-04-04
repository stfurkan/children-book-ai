import type { Metadata } from "next";
import { auth } from "@/auth";
import { Home } from "@/components/Home/Home";
import { fetchBooks } from "@/lib/db/fetchBook";

export const metadata: Metadata = {
  metadataBase: new URL('https://childrensbookai.net'),
  title: "Children’s Book AI",
  description: "Children’s Book AI is a platform for authors to write and publish children’s books. We use AI to help authors write and publish books faster.",
  openGraph: {
    type: "website",
    url: "https://childrensbookai.net",
    title: "Children’s Book AI",
    description: "Children’s Book AI is a platform for authors to write and publish children’s books. We use AI to help authors write and publish books faster.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/book-placeholder.png`,
        width: 1024,
        height: 1024,
        alt: "Children’s Book AI",
      },
    ],
  },
};

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
