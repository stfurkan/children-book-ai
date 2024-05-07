import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { AutherDetailsForm } from "@/components/Forms/AuthorDetailsForm";
import { getAuthorDetails } from "@/lib/db/author";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('profile.title'),
    description: t('profile.description'),
    openGraph: {
      type: "website",
      url: "https://childrensbookai.net/profile",
      title: t('profile.title'),
      description: t('profile.description'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
          width: 1024,
          height: 1024,
          alt: t('profile.title'),
        },
      ],
    },
  };
}

export default async function AuthorProfile() {
  const session = await auth();

  if (!session) {
    notFound();
  }
  
  const userAuthorDetails = await getAuthorDetails(session?.user?.id!);

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full items-center">
        <AutherDetailsForm
          user={session.user}
          userAuthorDetails={userAuthorDetails}
        />
      </div>
    </div>
  );
}
