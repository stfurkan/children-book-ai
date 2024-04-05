"use server";
import { and, count, desc, eq, like } from "drizzle-orm";
import { db } from "@/db";
import { authorDetails, books, pages } from "@/db/schema";
import { auth } from "@/auth";

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
      .select({
        id: authorDetails.id,
        authorId: authorDetails.authorId,
        authorName: authorDetails.authorName,
        bio: authorDetails.bio,
        image: authorDetails.image,
      })
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

export async function totalBookCount(search: string = '') {
  try {
    const totalBooks = await db
      .select({ count: count() })
      .from(books)
      .where(and(
        eq(books.published, true),
        search ? like(books.title, `%${search}%`) : undefined,
      ));

    return totalBooks[0].count;
  } catch (error) {
    console.error('Failed to fetch total book count:', error);
  }
}

export async function fetchBooks(page: number = 1, pageSize: number = 9, search: string = '') {
  try {
    const allBooks = await db
      .select({
        id: books.id,
        title: books.title,
        authorId: books.author,
        image: books.image,
        shortDescription: books.shortDescription,
        authorName: authorDetails.authorName,
      })
      .from(books)
      .leftJoin(authorDetails, eq(books.author, authorDetails.authorId))
      .where(and(
        eq(books.published, true),
        search ? like(books.title, `%${search}%`) : undefined,
      ))
      .orderBy(desc(books.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    return allBooks;
  } catch (error) {
    console.error('Failed to fetch books:', error);
  }
}

export async function totalBookCountForUser(userId: string, search: string = '') {
  try {
    const totalBooks = await db
      .select({ count: count() })
      .from(books)
      .where(and(
        eq(books.author, userId),
        eq(books.published, true),
        search ? like(books.title, `%${search}%`) : undefined,
      ));

    return totalBooks[0].count;
  } catch (error) {
    console.error('Failed to fetch total book count for user:', error);
  }
}

export async function fetchBooksForUser(userId: string, page: number = 1, pageSize: number = 9, search: string = '') {
  try {
    const allBooks = await db
      .select()
      .from(books)
      .where(and(
        eq(books.author, userId),
        eq(books.published, true),
        search ? like(books.title, `%${search}%`) : undefined,
      ))
      .orderBy(desc(books.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    return allBooks;
  } catch (error) {
    console.error('Failed to fetch books for user:', error);
  }
}

export async function totalBookCountForCurrentUser(userId: string, search: string = '') {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated.');
    return;
  }

  if (userId !== user.id) {
    console.error('User is not the current user.');
    return;
  }

  try {
    const totalBooks = await db
      .select({ count: count() })
      .from(books)
      .where(and(
        eq(books.author, userId),
        search ? like(books.title, `%${search}%`) : undefined,
      ));

    return totalBooks[0].count;
  } catch (error) {
    console.error('Failed to fetch total book count for current user:', error);
  }
}

export async function fetchBooksForCurrentUser(userId: string, page: number = 1, pageSize: number = 9, search: string = '') {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated.');
    return;
  }

  if (userId !== user.id) {
    console.error('User is not the current user.');
    return;
  }

  try {
    const allBooks = await db
      .select()
      .from(books)
      .where(and(
        eq(books.author, userId),
        search ? like(books.title, `%${search}%`) : undefined,
      ))
      .orderBy(desc(books.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    return allBooks;
  } catch (error) {
    console.error('Failed to fetch books for current user:', error);
  }
}
