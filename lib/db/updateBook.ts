"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { books } from "@/db/schema";

export async function updateBookSummary(bookId: string, summary: string) {
  const session = await auth();
  const user = session?.user;
  
  if (!user) {
    console.error('User is not authenticated.');
    return;
  }
  
  const book = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId));
  
  if (book.length === 0) {
    console.error('Book not found.');
    return;
  }
  
  if (book[0].author !== user.id) {
    console.error('User is not the author of this book.');
    return;
  }
  
  try {
    const updatedBook = await db
      .update(books)
      .set({
          shortDescription: summary,
      })
      .where(eq(books.id, bookId))
      .returning();

    console.log('Book summary has been successfully updated.');

    return updatedBook;
  } catch (error) {
      console.error('Failed to update book summary:', error);
  }
  
  revalidatePath(`/book/${bookId}/summary`);
}

export async function updateBookImage(bookId: string, image: string) {
  const session = await auth();
  const user = session?.user;
  
  if (!user) {
    console.error('User is not authenticated.');
    return;
  }
  
  const book = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId));
  
  if (book.length === 0) {
    console.error('Book not found.');
    return;
  }
  
  if (book[0].author !== user.id) {
    console.error('User is not the author of this book.');
    return;
  }
  
  try {
    const updatedBook = await db
      .update(books)
      .set({
          image: image,
      })
      .where(eq(books.id, bookId))
      .returning();

    console.log('Book image has been successfully updated.');

    return updatedBook;
  } catch (error) {
      console.error('Failed to update book image:', error);
  }
  
  revalidatePath(`/book/${bookId}/summary`);
}
