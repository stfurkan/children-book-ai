import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import {
  totalBookCountForUser,
  fetchBooksForUser,
  totalBookCountForCurrentUser,
  fetchBooksForCurrentUser,
} from "@/lib/db/fetchBook";
import { getAuthorDetails } from "@/lib/db/author";
import { AllBooks } from "@/components/Books/AllBooks";

type UserBooksPageProps = {
  params: {
    userId: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

export async function generateMetadata({ params: { userId } }: UserBooksPageProps): Promise<Metadata> {
  const authorDetails = await getAuthorDetails(userId);

  if (!authorDetails) {
    return notFound();
  }

  return {
    title: `${authorDetails.authorName} | Children's Book AI`,
    description: `Books by ${authorDetails.authorName}`,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/book-placeholder.png`,
          width: 1024,
          height: 1024,
          alt: `${authorDetails.authorName} | Children's Book AI`,
        },
      ],
    },
  };
}

export default async function UserBooksPage({ params: { userId }, searchParams }: UserBooksPageProps) {
  const session = await auth();
  const pageSize = 9;
  const pageParam = searchParams?.page ? parseInt(searchParams?.page, 10) : undefined;
  let bookCount;
  let allBooks;
  let totalPages;
  let page;

  const authorDetails = await getAuthorDetails(userId);

  if (!authorDetails) {
    return notFound();
  }

  if (session?.user.id === userId) {
    bookCount = (await totalBookCountForCurrentUser(userId)) || 0;
    totalPages = Math.ceil(bookCount / pageSize);

    page = (pageParam && pageParam > 0 && pageParam <= totalPages)
      ? parseInt(searchParams.page, 10)
      : undefined;

    allBooks = await fetchBooksForCurrentUser(userId, page || 1, pageSize);
  } else {
    bookCount = (await totalBookCountForUser(userId)) || 0;
    totalPages = Math.ceil(bookCount / pageSize);

    page = (pageParam && pageParam > 0 && pageParam <= totalPages)
      ? parseInt(searchParams.page, 10)
      : undefined;

    allBooks = await fetchBooksForUser(userId, page || 1, pageSize);
  }

  allBooks = allBooks?.map((book) => ({
    ...book,
    authorId: userId,
    authorName: authorDetails.authorName,
  }));

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col w-full items-center">
        <AllBooks
          allBooks={allBooks}
          authorDetails={authorDetails}
          totalPages={totalPages}
          page={page || 1}
        />
      </div>
    </div>
  );
}
