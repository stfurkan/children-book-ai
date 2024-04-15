'use client';
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInGitHub, signInGoogle } from "@/lib/auth/authHelpers";

export function SignInComponent() {
  const t = useTranslations('SignIn');

  const termsLink = (
    <Link href="/terms-of-service" className="text-primary hover:underline">
      {t('terms')}
    </Link>
  );

  const privacyLink = (
    <Link href="/privacy-policy" className="text-primary hover:underline">
      {t('privacy')}
    </Link>
  );

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <img
          src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/home-image.png`}
          alt="Home page image of children's book AI"
          className="mx-auto"
          loading="lazy"
        />
        <CardTitle className="text-2xl">{t('title')}</CardTitle>
        <CardDescription>
          {t('subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            className="w-full"
            onClick={() => signInGitHub()}
          >
            {t('github')}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signInGoogle()}
          >
            {t('google')}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          {t.rich('agreement', { terms: termsLink as any, privacy: privacyLink as any })}
        </div>
      </CardContent>
    </Card>
  );
}
