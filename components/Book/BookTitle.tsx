import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { updateBookStatus } from '@/lib/db/updateBook';

export function BookTitle(
  {
    bookId,
    title,
    author,
    authorId,
    status,
    isUserAuthor
  }: {
    bookId: string;
    title: string;
    author: string;
    authorId: string;
    status: boolean;
    isUserAuthor?: boolean;
  }
) {
  const router = useRouter();
  
  const setBookStatus = async (bookStatus: string) => {
    if (bookStatus === 'draft' && status) {
      await updateBookStatus(bookId, false);
      router.refresh();
    }

    if (bookStatus === 'published' && !status) {
      await updateBookStatus(bookId, true);
      router.refresh();
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <Link
        href={`/books/${authorId}`}
        className="text-lg font-mono hover:underline"
      >
        by {author}
      </Link>

      {isUserAuthor && (
        <div className="flex flex-row justify-end items-center">
          <span className="font-semibold mr-1">Book Status:</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="unset"
                size="unset"
              >
                <Badge
                  variant="outline"
                  className="hover:bg-slate-100 cursor-pointer"
                >
                  {status ? 'Published' : 'Draft'}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Book Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={status ? 'published' : 'draft'}
                onValueChange={setBookStatus}
              >
                <DropdownMenuRadioItem value="draft" className="cursor-pointer">Draft</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="published" className="cursor-pointer">Published</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
