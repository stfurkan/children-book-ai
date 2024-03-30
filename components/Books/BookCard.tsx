/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useImagePreload } from '@/hooks/useImagePreload';
import { BookCardType } from '@/types/dbTypes';

export function BookCard({ book }: { book: BookCardType }) {
  const fallbackImage = '/book-placeholder.png';
  const imageSrc = useImagePreload(book.image || '', fallbackImage);

  return (
    <Link 
      href={`/book/${book.id}`}
    >
      <Card className="hover:bg-slate-50 hover:shadow h-full max-w-64">
        <CardHeader>
          <div className="flex flex-col items-center">
            <img
              src={imageSrc}
              alt={book.title}
              className="rounded-xl"
            />
          </div>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>by {book.authorName}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
