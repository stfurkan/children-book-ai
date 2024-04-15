import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { SignInComponent } from "@/components/Auth/SignIn";
import { auth } from "@/auth";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL('https://childrensbookai.net'),
    title: t('signIn.title'),
    description: t('signIn.description'),
    openGraph: {
      type: "website",
      url: "https://childrensbookai.net",
      title: t('signIn.title'),
      description: t('signIn.description'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
          width: 1024,
          height: 1024,
          alt: t('signIn.title'),
        },
      ],
    },
  };
}

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect('/');
  }

  return (
    <SignInComponent />
  );
}
