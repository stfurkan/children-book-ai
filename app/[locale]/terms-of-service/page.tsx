import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TermsOfServiceEN } from "@/components/TermsOfService/TermsOfServiceEN";
import { TermsOfServiceTR } from "@/components/TermsOfService/TermsOfServiceTR";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL('https://childrensbookai.net'),
    title: t('terms.title'),
    description: t('terms.description'),
    openGraph: {
      type: "website",
      url: "https://childrensbookai.net",
      title: t('terms.title'),
      description: t('terms.description'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
          width: 1024,
          height: 1024,
          alt: t('terms.title'),
        },
      ],
    },
  };
}

export default function TermsOfService({ params }: { params: { locale: string } }) {
  return params?.locale === "tr" ?  <TermsOfServiceTR /> : <TermsOfServiceEN />;
}
