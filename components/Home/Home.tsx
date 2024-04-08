/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Session } from "next-auth";
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
        <h1 className="font-mono text-2xl md:text-3xl font-bold mb-4">Bring Your Children&rsquo;s Stories to Life</h1>
        <p className="text-lg mb-8">Craft unique and personalized children&rsquo;s books with the help of AI.</p>
        {user ? (
          <Link href="/new-book" className="inline-block">
            <Button size="lg">Start Creating Now</Button>
          </Link>
        ) : (
          <Link href="/signin">
            <Button size="lg">
              Sign in to Start <LogIn className="ml-2" /> 
            </Button>
          </Link>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-8">~ How It Works ~</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Write Your Adventure</CardTitle>
            </CardHeader>
            <CardContent>
              Give us your story idea, and our AI will craft a unique and personalized children&rsquo;s book.
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card>
            <CardHeader>
              <CardTitle>Personalize Your Story</CardTitle>
            </CardHeader>
            <CardContent>
              Add characters, names, and special messages to make your story truly one-of-a-kind.
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
          <CardHeader>
            <CardTitle>Bring It to Life</CardTitle>
          </CardHeader>
            <CardContent>
              Watch as our AI illustrates your story. Customize further with our intuitive editing tools.
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card>
            <CardHeader>
              <CardTitle>Share the Magic</CardTitle>
            </CardHeader>
            <CardContent>
              Download your story, print it, or share it digitally. Create moments that last a lifetime.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Books Section */}
      <FeaturedBooks allBooks={allBooks} />
    </div>
  );
}
