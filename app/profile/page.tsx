import type { Metadata } from "next";
import { auth } from "@/auth";
import { AutherDetailsForm } from "@/components/Forms/AuthorDetailsForm";
import { getAuthorDetails } from "@/lib/db/author";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Author Profile | Children's Book AI",
  description: "Author Profile is a page where authors can update their details.",
  openGraph: {
    type: "website",
    url: "https://childrensbookai.net/profile",
    title: "Author Profile | Children's Book AI",
    description: "Author Profile is a page where authors can update their details.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/book-placeholder.png`,
        width: 1024,
        height: 1024,
        alt: "Author Profile | Children's Book AI",
      },
    ],
  },
};

export default async function UserProfile() {
  const session = await auth();
  const userAuthorDetails = await getAuthorDetails(session?.user?.id!);

  if (!session) {
    notFound();
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
          ~ Author Profile ~
        </h1>
        <AutherDetailsForm
          user={session.user}
          userAuthorDetails={userAuthorDetails}
        />
      </div>
    </div>
  );
}
