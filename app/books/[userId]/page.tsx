import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  totalBookCountForUser,
  fetchBooksForUser,
  totalBookCountForCurrentUser,
  fetchBooksForCurrentUser,
} from "@/lib/db/fetchBook";
import { getAuthorDetails } from "@/lib/db/author";
import { AllBooks } from "@/components/Books/AllBooks";
import { Separator } from "@/components/ui/separator";

type UserBooksPageProps = {
  params: {
    userId: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

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
      <div className="my-8 p-4 border border-gray-200 rounded-lg shadow-sm">
        <h1 className="font-mono font-semibold text-xl mb-2 text-center">
          ~ Author ~
        </h1>
        <Separator />
        <div className="flex items-center space-x-6 mt-2">
          <div className="flex-shrink-0">
            <Avatar className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
              <AvatarImage src={authorDetails.image || ''} alt={authorDetails.authorName} className="w-full h-full object-cover" />
              <AvatarFallback className="flex items-center justify-center text-xl font-semibold text-gray-500 bg-gray-200">
                {authorDetails.authorName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow space-y-2">
            <h3 className="text-lg font-bold text-gray-900">{authorDetails.authorName}</h3>
            <p className="text-sm text-gray-700">
              {authorDetails.bio}
            </p>
          </div>
        </div>
      </div>

        <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
          ~ Books ~
        </h1>
        
        <AllBooks allBooks={allBooks} totalPages={totalPages} page={page || 1} />
      </div>
    </div>
  );
}
