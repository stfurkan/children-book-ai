"use server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { authorDetails } from "@/db/schema";
import { encrypt } from "../encryption";

export async function getAuthorDetails(userId: string) {
  const author = await db
    .select({
      authorName: authorDetails.authorName,
      bio: authorDetails.bio,
      image: authorDetails.image,
    })
    .from(authorDetails)
    .where(eq(authorDetails.authorId, userId))
    .limit(1);
  
  return author[0];
}

type AuthorDetails = {
  userId: string;
  name: string;
  bio: string;
  image?: string;
  aiKey?: string;
};

export async function getAuthorKey(userId: string) {
  const author = await db
    .select({
      aiKey: authorDetails.aiKey,
      keyIv: authorDetails.keyIv,
      keyAuthTag: authorDetails.keyAuthTag,
    })
    .from(authorDetails)
    .where(eq(authorDetails.authorId, userId))
    .limit(1);

  return author[0];
}

export async function createAuthorDetails(authorData: AuthorDetails) {
  let encryptedKey = null;
  if (authorData.aiKey) {
    encryptedKey = encrypt(authorData.aiKey);
  }

  const author = await db
    .insert(authorDetails)
    .values({
      authorId: authorData.userId,
      authorName: authorData.name,
      bio: authorData.bio,
      image: authorData.image ? authorData.image : null,
      aiKey: authorData.aiKey ? encryptedKey?.encryptedData : null,
      keyIv: authorData.aiKey ? encryptedKey?.iv : null,
      keyAuthTag: authorData.aiKey ? encryptedKey?.authTag : null,
    }).returning({ id: authorDetails.id});

  return author[0];
}

export async function updateAuthorDetails(authorData: AuthorDetails) {
  let encryptedKey = null;
  if (authorData.aiKey) {
    encryptedKey = encrypt(authorData.aiKey);
  }

  const author = await db
    .update(authorDetails)
    .set({
      authorName: authorData.name,
      bio: authorData.bio,
      image: authorData.image ? authorData.image : null,
      aiKey: authorData.aiKey ? encryptedKey?.encryptedData : undefined,
      keyIv: authorData.aiKey ? encryptedKey?.iv : undefined,
      keyAuthTag: authorData.aiKey ? encryptedKey?.authTag : undefined,
    })
    .where(eq(authorDetails.authorId, authorData.userId))
    .returning({ id: authorDetails.id });

  return author[0];
}
