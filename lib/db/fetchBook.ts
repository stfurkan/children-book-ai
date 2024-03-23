"use server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { authorDetails, books, pages } from "@/db/schema";

export async function fetchBook(bookId: string) {
  try {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    const bookPages = await db
      .select()
      .from(pages)
      .where(eq(pages.bookId, bookId));

    const author = await db
      .select()
      .from(authorDetails)
      .where(eq(authorDetails.authorId, book[0].author));

    return {
      author: author[0],
      book: book[0],
      pages: bookPages,
    };
  } catch (error) {
    console.error('Failed to fetch book:', error);
  }
}
