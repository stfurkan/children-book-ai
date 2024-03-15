"use client";
import Link from "next/link";
import { Session } from "next-auth"
import { Github, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signInGitHub, signOutUser } from "@/lib/auth/authHelpers";

export function Header({ user }: { user?: Session['user']}) {
  return (
    <div className="flex justify-between items-center mx-8">
      <Link href="/" className="font-mono font-semibold text-md md:text-2xl hover:text-transparent/80">
        Children&rsquo;s Book AI
      </Link>
      {user ? (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback>{user.name?.slice(0,2)}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block font-semibold">{user.name}</div>
          <Button variant="ghost" size="icon" onClick={() => signOutUser()}>
            <LogOut />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => signInGitHub()}
        >
          <Github className="mr-2" /> <span className="font-semibold">Sign in</span>
        </Button>)
      }
    </div>
  );
}
