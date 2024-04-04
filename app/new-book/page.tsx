import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { NewBookForm } from "@/components/Forms/NewBookForm";
import { getAuthorDetails } from "@/lib/db/author";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "New Book | Children's Book AI",
  description: "New Book is a page where authors can create a new book.",
  openGraph: {
    type: "website",
    url: "https://childrensbookai.net/new-book",
    title: "New Book | Children's Book AI",
    description: "New Book is a page where authors can create a new book.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/book-placeholder.png`,
        width: 1024,
        height: 1024,
        alt: "New Book | Children's Book AI",
      },
    ],
  },
};

export default async function NewBookPage() {
  const session = await auth();
  const userHasAuthorDetails = !!(await getAuthorDetails(session?.user?.id!));

  if (!userHasAuthorDetails) {
    return (
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-full items-center">
          <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
            ~ Create a new book ~
          </h1>
          <p className="text-red-500 text-sm md:text-base font-semibold">
            You need to create an author profile before you can create a book.
          </p>
          <Link href="/profile" className="mt-8">
            <Button>
              Create author profile
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
          ~ Create a new book ~
        </h1>
        <NewBookForm />
      </div>
    </div>
  );
}
