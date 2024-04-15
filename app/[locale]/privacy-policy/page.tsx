import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrivacyPolicyEN } from "@/components/PrivacyPolicy/PrivacyPolicyEN";
import { PrivacyPolicyTR } from "@/components/PrivacyPolicy/PrivacyPolicyTR";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL('https://childrensbookai.net'),
    title: t('privacy.title'),
    description: t('privacy.description'),
    openGraph: {
      type: "website",
      url: "https://childrensbookai.net",
      title: t('privacy.title'),
      description: t('privacy.description'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
          width: 1024,
          height: 1024,
          alt: t('privacy.title'),
        },
      ],
    },
  };
}

export default function PrivacyPolicy({ params }: { params: { locale: string } }) {
  return params?.locale === "tr" ?  <PrivacyPolicyTR /> : <PrivacyPolicyEN />;
}
