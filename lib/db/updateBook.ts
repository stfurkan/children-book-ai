"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { books } from "@/db/schema";
import { deleteImageFromR2 } from "@/lib/r2/deleteFromR2";

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

  const currentImage = book[0].image;
  const currentImageKey = currentImage?.replace(`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/`, '');
  if (currentImageKey) {
    await deleteImageFromR2(process.env.R2_BUCKET!, currentImageKey);
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

export async function updateBookStatus(bookId: string, status: boolean) {
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
        published: status,
      })
      .where(eq(books.id, bookId))
      .returning();

    console.log('Book status has been successfully updated.');

    return updatedBook;
  } catch (error) {
      console.error('Failed to update book status:', error);
  }
  
  revalidatePath(`/book/${bookId}/summary`);
  revalidatePath(`/book/${bookId}/read`);
}
