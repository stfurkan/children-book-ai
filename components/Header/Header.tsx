"use client";
import Link from "next/link";
import { Session } from "next-auth"
import {
  Book,
  Github,
  LibraryBig,
  LogOut,
  PenLine,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signInGitHub, signOutUser } from "@/lib/auth/authHelpers";


export function Header({ user }: { user?: Session['user']}) {
  return (
    <div className="flex justify-between items-center mx-2 sm:mx-8">
      <div className="flex flex-row items-center space-x-2 sm:space-x-8">
        <Link href="/" className="font-mono font-semibold text-sm sm:text-md md:text-2xl hover:text-transparent/80">
          Children&rsquo;s Book AI
        </Link>
        <Link href="/books" className="group">
          <Button variant="unset" className="group-hover:underline group-hover:border rounded">
            <Book className="mr-2" /> Browse Books 
          </Button>
      </Link>
      </div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-2 p-2 border rounded-xl hover:cursor-pointer hover:bg-slate-100">
              <Avatar>
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback>{user.name?.slice(0,2)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block font-semibold">{user.name}</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                >
                  Profile
                  <DropdownMenuShortcut><User className="h-4 w-4" /></DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href={`/books/${user.id}`}>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                >
                  My Books
                  <DropdownMenuShortcut><LibraryBig className="h-4 w-4" /></DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
              <Link href={`/new-book`}>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                >
                  Create New Book
                  <DropdownMenuShortcut><PenLine className="h-4 w-4" /></DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => signOutUser()}
            >
              Log out
              <DropdownMenuShortcut><LogOut className="h-4 w-4" /></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
