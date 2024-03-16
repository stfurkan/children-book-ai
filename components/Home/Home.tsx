"use client";
import Link from "next/link";
import { Session } from "next-auth";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signInGitHub } from "@/lib/auth/authHelpers";

export default function Home({ user }: { user?: Session['user'] }) {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="font-mono text-3xl font-bold mb-4">Bring Your Children&rsquo;s Stories to Life</h1>
        <p className="text-lg mb-8">Craft unique and personalized children&rsquo;s books with the help of AI.</p>
        {user ? (
          <Link href="/new-book" className="inline-block">
            <Button size="lg">Start Creating Now</Button>
          </Link>
        ) : (
          <Button size="lg" onClick={() => signInGitHub()}>
            <Github className="mr-2" /> Sign in to Start
          </Button>
        )}
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <h2 className="font-mono text-3xl font-bold text-center mb-8">~ How It Works ~</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </div>
  );
}
