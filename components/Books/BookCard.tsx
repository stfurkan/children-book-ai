/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useImagePreload } from '@/hooks/useImagePreload';
import { BookCardType } from '@/types/dbTypes';

export function BookCard({ book, currentUser = false }: { book: BookCardType; currentUser?: boolean;}) {
  const t = useTranslations('BookCard');

  const imageSrc = useImagePreload(book.image || '');

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
              loading="lazy"
            />
          </div>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>{t('author', { author: book.authorName })}</CardDescription>
        </CardHeader>
        {currentUser && (
          <CardFooter className="flex flex-col items-end">
            <Separator className="my-2" />
            <Badge
              variant="outline"
            >
              {book.published ? t('published') : t('draft')}
            </Badge>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
