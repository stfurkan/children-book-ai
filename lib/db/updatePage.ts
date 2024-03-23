"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { pages, books } from "@/db/schema";

export async function updatePageContent(pageId: string, content: string) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated.');
    return;
  }

  const book = await db
    .select()
    .from(pages)
    .where(eq(pages.id, pageId));

  if (book.length === 0) {
    console.error('Page not found.');
    return;
  }

  const bookId = book[0].bookId;

  const bookDetails = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId));

  if (bookDetails.length === 0) {
    console.error('Book not found.');
    return;
  }

  if (bookDetails[0].author !== user.id) {
    console.error('User is not the author of this book.');
    return;
  }

  try {
    const updatedPage = await db
      .update(pages)
      .set({
        content: content,
      })
      .where(eq(pages.id, pageId))
      .returning();

    console.log('Page content has been successfully updated.'); 

    return updatedPage;
  } catch (error) {
    console.error('Failed to update page content:', error);
  }

  revalidatePath(`/book/${bookId}`);
}

// update page image

export async function updatePageImage(pageId: string, image: string) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated.');
    return;
  }

  const book = await db
    .select()
    .from(pages)
    .where(eq(pages.id, pageId));

  if (book.length === 0) {
    console.error('Page not found.');
    return;
  }

  const bookId = book[0].bookId;

  const bookDetails = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId));

  if (bookDetails.length === 0) {
    console.error('Book not found.');
    return;
  }

  if (bookDetails[0].author !== user.id) {
    console.error('User is not the author of this book.');
    return;
  }

  try {
    const updatedPage = await db
      .update(pages)
      .set({
        image: image,
      })
      .where(eq(pages.id, pageId))
      .returning();

    console.log('Page image has been successfully updated.');

    return updatedPage;
  } catch (error) {
    console.error('Failed to update page image:', error);
  }

  revalidatePath(`/book/${bookId}`);
}
