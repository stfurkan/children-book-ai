"use server";
import OpenAI from 'openai';
import { auth } from '@/auth';
import { decrypt } from '@/lib/encryption';
import { getAuthorKey } from '@/lib/db/author';

export const createNewImage = async ({ description }: { description: string; }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const authorKeyDetails = await getAuthorKey(session.user.id);
  
  if (!authorKeyDetails.aiKey || !authorKeyDetails.keyIv || !authorKeyDetails.keyAuthTag) {
    throw new Error("Author's OpenAI key not found! Please add your OpenAI key in the Author Profile page.");
  }

  const authorKey = decrypt(authorKeyDetails.aiKey, authorKeyDetails.keyIv, authorKeyDetails.keyAuthTag);

  const openai = new OpenAI({
    apiKey: authorKey
  });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `"${description}", children's book illustration.`,
    n: 1,
    size: "1024x1024",
    quality: "standard",
    response_format: "url", // default is "url"
    user: session.user.id
  });
  
  return response.data[0].url;
}
  