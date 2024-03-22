"use server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/db";
import { books, pages } from "@/db/schema";

export async function createBookWithPages(bookData: { [key: string]: string }) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated.');
    return;
  }
  let bookId: string = '';

  try {
    // Start a transaction
    await db.transaction(async (tx) => {
      // Insert the book
      const book = await tx.insert(books).values({
        title: bookData.title,
        shortDescription: bookData.shortSummary,
        author: user.id,
        published: false,
      }).returning({ id: books.id});

      bookId = book[0].id;

      // Prepare and insert pages
      const totalPages = Object.keys(bookData).length; // Total number of pages in the bookData object
      for (let i = 1; i <= totalPages; i++) {
        const pageContent = bookData[`page${i}`];
        if (!pageContent) break; // Exit loop if there's no more content

        await tx.insert(pages).values({
          bookId: bookId,
          pageNumber: i,
          content: pageContent,
        });
      }
    });

    console.log('Book and its pages have been successfully created.');
  } catch (error) {
    console.error('Failed to create book and pages:', error);
  }

  if (bookId) {
    redirect(`/book/${bookId}`);
  }
}
