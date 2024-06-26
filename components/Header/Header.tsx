"use client";
import Link from "next/link";
import { Session } from "next-auth"
import { useTranslations } from 'next-intl';
import {
  Book,
  LibraryBig,
  LogIn,
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
import { signOutUser } from "@/lib/auth/authHelpers";


export function Header({ user }: { user?: Session['user']}) {
  const t = useTranslations('Header');

  return (
    <div className="flex justify-between items-center mx-2 sm:mx-8">
      <div className="flex flex-row items-center space-x-2 sm:space-x-8">
        <Link href="/" className="font-mono font-semibold text-sm sm:text-md md:text-2xl hover:text-transparent/80">
          Children&rsquo;s Book AI
        </Link>
        <Link href="/books" className="group">
          <Button variant="unset" className="group-hover:underline group-hover:border rounded">
            <Book className="mr-2" /> {t('browseBooks')} 
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
            <DropdownMenuLabel>{t('menu')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                >
                  {t('profile')}
                  <DropdownMenuShortcut><User className="h-4 w-4" /></DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href={`/books/${user.id}`}>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                >
                  {t('myBooks')}
                  <DropdownMenuShortcut><LibraryBig className="h-4 w-4" /></DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
              <Link href={`/new-book`}>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                >
                  {t('newBook')}
                  <DropdownMenuShortcut><PenLine className="h-4 w-4" /></DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => signOutUser()}
            >
              {t('signOut')}
              <DropdownMenuShortcut><LogOut className="h-4 w-4" /></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/signin">
          <Button
            variant="outline"
          >
            <span className="font-semibold">{t('signIn')}</span> <LogIn className="ml-2" />
          </Button>
        </Link>
      )}
    </div>
  );
}
