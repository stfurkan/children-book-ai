/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import { Textarea } from '@/components/ui/textarea';
import { BookNav } from './BookNav';
import { BookTitle } from './BookTitle';
import { updatePageContent, updatePageImage } from '@/lib/db/updatePage';
import { AuthorType, BookType, PageType } from '@/types/dbTypes';
import { createNewImage } from '@/lib/ai/newImage';
import { useImagePreload } from '@/hooks/useImagePreload';

export function BookContent(
  { book, user, page }: {
    book: {
      author: AuthorType;
      book: BookType;
      pages: PageType[];
    };
    user?: Session['user']; 
    page?: number;
  }
) {
  const router = useRouter();
  const { author, book: bookDetails, pages } = book;
  const [currentPage, setCurrentPage] = useState(page ? pages[page - 1] : pages[0]);
  const [isContentEditing, setIsContentEditing] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPageContent, setCurrentPageContent] = useState(page ? pages[page - 1].content : pages[0].content);
  const [imageDescription, setImageDescription] = useState('');

  const fallbackImage = '/book-placeholder.png';
  const imageSrc = useImagePreload(currentPage.image || '', fallbackImage);

  const isUserAuthor = user && bookDetails.author === user.id;

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    setCurrentPageContent(page.content);

    // update page search param
    router.push(`/book/${bookDetails.id}/read?page=${page.pageNumber}`);
  }

  useEffect(() => {
    if (page) {
      const newPage = pages[page - 1];
      if (newPage) {
        handlePageChange(newPage);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <BookTitle
        bookId={bookDetails.id}
        title={bookDetails.title}
        author={author.authorName}
        authorId={author.authorId}
        status={bookDetails.published}
        isUserAuthor={isUserAuthor}
      />
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <BookNav bookId={bookDetails.id} pages={pages} />
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              {isUserAuthor && (
                <AlertDialog open={isImageEditing} onOpenChange={setIsImageEditing}>
                  <AlertDialogTrigger asChild>
                    <Button>
                      {currentPage.image ? 'Change Image' : 'Add Image'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {currentPage.image ? 'Change image' : 'Create new image'}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {isEditError && (
                          <span className="inline-block font-semibold text-red-500 pb-1">
                            Image description can not be empty.
                          </span>
                        )}
                        {error && (
                          <span className="inline-block font-semibold text-red-500 pb-1">
                            {error}
                          </span>
                        )}
                        <Textarea
                          value={imageDescription}
                          onChange={(e) => setImageDescription(e.target.value)}
                          disabled={isEditLoading}
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => {
                          setImageDescription('');
                          setIsEditError(false);
                        }}
                        disabled={isEditLoading}
                      >
                        Cancel
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

                            const updatedPage = await updatePageImage(currentPage.id, newImage);
                            if (updatedPage) handlePageChange(updatedPage[0]);

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
                        {currentPage.image ? 'Update' : 'Create'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardHeader>
            <CardContent>

              {currentPage.image && (
                <div className="flex justify-center mb-8">
                  <img
                    src={imageSrc}
                    alt="Page image"
                    className="w-2/3 rounded-xl"
                  />
                </div>
              )}

              {currentPage.content}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="flex flex-row items-center justify-between flex-grow">
                <div />
                <div className="flex flex-row items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const previousPage = pages.find((page) => page.pageNumber === currentPage.pageNumber - 1);
                      if (previousPage) {
                        handlePageChange(previousPage);
                      }
                    }}
                    disabled={currentPage.pageNumber === 1}
                  >
                    <ChevronLeft />
                  </Button>
                  <div>
                    Page {currentPage.pageNumber} of {pages.length}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const nextPage = pages.find((page) => page.pageNumber === currentPage.pageNumber + 1);
                      if (nextPage) {
                        handlePageChange(nextPage);
                      }
                    }}
                    disabled={currentPage.pageNumber === pages.length}
                  >
                    <ChevronRight />
                  </Button>
                </div>
                {isUserAuthor ? (
                  <AlertDialog open={isContentEditing} onOpenChange={setIsContentEditing}>
                    <AlertDialogTrigger asChild>
                      <Button>
                        Edit
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Update page content</AlertDialogTitle>
                        <AlertDialogDescription>
                          {isEditError && (
                            <span className="inline-block font-semibold text-red-500 pb-1">
                              Page content can not be empty.
                            </span>
                          )}
                          <Textarea
                            value={currentPageContent}
                            onChange={(e) => setCurrentPageContent(e.target.value)}
                            disabled={isEditLoading}
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => {
                            setCurrentPageContent(currentPage.content);
                            setIsEditError(false);
                          }}
                        >
                          Cancel
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

                            if (currentPageContent === currentPage.content) {
                              setIsEditLoading(false);
                              setIsContentEditing(false);
                              return;
                            }

                            const updatedPage = await updatePageContent(currentPage.id, currentPageContent);
                            if (updatedPage) handlePageChange(updatedPage[0]);
                            setIsEditLoading(false);
                            setIsContentEditing(false);
                            setIsEditError(false);
                            router.refresh();
                          }}
                        >
                          Update
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
