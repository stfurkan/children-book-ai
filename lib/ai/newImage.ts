"use server";
import OpenAI from 'openai';
import { auth } from '@/auth';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const createNewImage = async ({ description }: { description: string; }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `"${description}", children's book illustration.`,
    n: 1,
    size: "1024x1024",
    response_format: "url", // default is "url"
    user: session.user.id
  });
  
  return response.data[0].url;
}
  