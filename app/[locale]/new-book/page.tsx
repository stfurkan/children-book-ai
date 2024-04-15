import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { NewBookForm } from "@/components/Forms/NewBookForm";
import { getAuthorDetails } from "@/lib/db/author";
import { Button } from "@/components/ui/button";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('newBook.title'),
    description: t('newBook.description'),
    openGraph: {
      type: "website",
      url: "https://childrensbookai.net/new-book",
      title: t('newBook.title'),
      description: t('newBook.description'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
          width: 1024,
          height: 1024,
          alt: t('newBook.title'),
        },
      ],
    },
  };
}

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
    <NewBookForm />
  );
}
