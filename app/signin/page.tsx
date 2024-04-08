import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignInComponent } from "@/components/Auth/SignIn";
import { auth } from "@/auth";

export const metadata: Metadata = {
  metadataBase: new URL('https://childrensbookai.net'),
  title: "Sign In | Children’s Book AI",
  description: "Sign in to Children’s Book AI.",
  openGraph: {
    type: "website",
    url: "https://childrensbookai.net",
    title: "Sign In | Children’s Book AI",
    description: "Sign in to Children’s Book AI.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/logo-square.png`,
        width: 1024,
        height: 1024,
        alt: "Children’s Book AI",
      },
    ],
  },
};

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return redirect('/');
  }

  return (
    <SignInComponent />
  );
}
