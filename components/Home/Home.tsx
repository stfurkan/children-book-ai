/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Session } from "next-auth";
import { useTranslations } from 'next-intl';
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCardType } from "@/types/dbTypes";
import { FeaturedBooks } from "./FeaturedBooks";

export function Home(
  {
    user,
    allBooks
  }: {
    user?: Session['user'];
    allBooks?: BookCardType[];
  }
) {
  const t = useTranslations('Home');

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center pb-12">
        <img
          src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/home-image.png`}
          alt="Home page image of children's book AI"
          className="mx-auto w-3/4 md:w-1/3"
          loading="lazy"
        />
        <h1 className="font-mono text-2xl md:text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg mb-8">{t('subtitle')}</p>
        {user ? (
          <Link href="/new-book" className="inline-block">
            <Button size="lg">{t('ctaCreate')}</Button>
          </Link>
        ) : (
          <Link href="/signin">
            <Button size="lg">
              {t('ctaSignIn')} <LogIn className="ml-2" /> 
            </Button>
          </Link>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-8">~ {t('howItWorks.title')} ~</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {
            t.raw('howItWorks.steps').map((step: { title: string; description: string; }, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {step.description}
                </CardContent>
              </Card>
            ))
          }
        </div>
      </section>

      {/* Featured Books Section */}
      <FeaturedBooks allBooks={allBooks} />
    </div>
  );
}
