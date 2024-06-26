/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookNav } from './BookNav';
import { BookTitle } from './BookTitle';
import { AuthorType, BookType, PageType } from '@/types/dbTypes';
import { createNewImage } from '@/lib/ai/newImage';
import { updateBookImage, updateBookSummary } from '@/lib/db/updateBook';
import { useImagePreload } from '@/hooks/useImagePreload';

export function BookSummary(
  { book, user }: {
    book: {
      author: AuthorType;
      book: BookType;
      pages: PageType[];
    };
    user?: Session['user'];
  }
) {
  const t = useTranslations('BookPage');

  const router = useRouter();
  const { author, book: bookDetails, pages } = book;
  const [isContentEditing, setIsContentEditing] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPageContent, setCurrentPageContent] = useState(bookDetails.shortDescription);
  const [imageDescription, setImageDescription] = useState('');

  const imageSrc = useImagePreload(bookDetails.image || '');

  const isUserAuthor = user && bookDetails.author === user.id;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <BookTitle
        book={book}
        bookId={bookDetails.id}
        title={bookDetails.title}
        author={author.authorName}
        authorId={author.authorId}
        status={bookDetails.published}
        isUserAuthor={isUserAuthor}
      />
      <div className="mx-auto flex flex-col-reverse md:grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <BookNav bookId={bookDetails.id} pages={pages} />
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center md:text-3xl mb-4">
                ~ {t('summary')} ~
              </CardTitle>
              {isUserAuthor && (
                <AlertDialog open={isImageEditing} onOpenChange={setIsImageEditing}>
                  <AlertDialogTrigger asChild>
                    <Button>
                      {bookDetails.image ? t('changeImage') : t('createNewImage')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{bookDetails.image ? t('changeImage') : t('createNewImage')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {isEditError && (
                          <span className="inline-block font-semibold text-red-500 pb-1">
                            {t('imageError')}
                          </span>
                        )}
                        {error && (
                          <span className="inline-block font-semibold text-red-500 pb-1">
                            {error}
                          </span>
                        )}
                        {isEditLoading && (
                          <span className="inline-block font-semibold text-blue-500 pb-1">
                            {t('imageLoading')}
                          </span>
                        )}
                        <span className="grid w-full gap-1.5">
                          <Label htmlFor="image-description">
                            {t('imageLabel')}
                          </Label>
                          <Textarea
                            id="image-description"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                            disabled={isEditLoading}
                          />
                        </span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => {
                          setImageDescription('');
                          setIsEditError(false);
                          setError(null);
                        }}
                        disabled={isEditLoading}
                      >
                        {t('cancel')}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async (e) => {
                          e.preventDefault();
                          setIsEditLoading(true);
                          if (!imageDescription) {
                            setIsEditError(true);
                            setIsEditLoading(false);
                            return;
                          }
                          
                          try {
                            const newImage = await createNewImage({ description: imageDescription });

                            if (!newImage) {
                              setIsEditLoading(false);
                              setIsEditError(true);
                              return;
                            }

                            await updateBookImage(bookDetails.id, newImage);

                            setIsEditLoading(false);
                            setIsImageEditing(false);
                            setIsEditError(false);
                            setImageDescription('');
                            router.refresh();
                          } catch (error: any) {
                            setError(error.message);
                            setIsEditLoading(false);
                          }
                        }}
                        disabled={isEditLoading}
                      >
                        {bookDetails.image ? t('update') : t('create')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardHeader>
            <CardContent>
              {bookDetails.image && (
                <div className="flex justify-center mb-8">
                  <img
                    src={imageSrc}
                    alt="Page image"
                    className="w-2/3 rounded-xl"
                    loading="lazy"
                  />
                </div>
              )}

              {bookDetails.shortDescription}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="flex flex-row items-center justify-between flex-grow">
                <div />
                <div className="">
                  <Link href={`/book/${bookDetails.id}/read`}>
                    <Button>
                      {t('startReading')}
                    </Button>
                  </Link>
                </div>
                {isUserAuthor ? (
                  <AlertDialog open={isContentEditing} onOpenChange={setIsContentEditing}>
                    <AlertDialogTrigger asChild>
                      <Button>
                        {t('edit')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t('updateSummary')}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {isEditError && (
                            <span className="inline-block font-semibold text-red-500 pb-1">
                              {t('summaryError')}
                            </span>
                          )}
                          <Textarea
                            value={currentPageContent || ''}
                            onChange={(e) => setCurrentPageContent(e.target.value)}
                            disabled={isEditLoading}
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => {
                            setCurrentPageContent(bookDetails.shortDescription);
                            setIsEditError(false);
                          }}
                        >
                          {t('cancel')}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async (e) => {
                            e.preventDefault();
                            setIsEditLoading(true);
                            if (!currentPageContent) {
                              setIsEditError(true);
                              setIsEditLoading(false);
                              return;
                            }

                            if (currentPageContent === bookDetails.shortDescription) {
                              setIsEditLoading(false);
                              setIsContentEditing(false);
                              return;
                            }

                            await updateBookSummary(bookDetails.id, currentPageContent);
                            setIsEditLoading(false);
                            setIsContentEditing(false);
                            setIsEditError(false);
                            router.refresh();
                          }}
                        >
                          {t('update')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (<div />)}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
