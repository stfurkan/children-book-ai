'use client';
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
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
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <img
          src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/home-image.png`}
          alt="Home page image of children's book AI"
          className="mx-auto"
          loading="lazy"
        />
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          to continue to Children’s Book AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            className="w-full"
            onClick={() => signInGitHub()}
          >
            Login with GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signInGoogle()}
          >
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          By signing in, you agree to our{" "}
          <Link href="/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </Link> and{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
