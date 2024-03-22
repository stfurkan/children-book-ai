"use server";
import OpenAI from 'openai';
import { auth } from '@/auth';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const createNewBook = async ({ page, story }: { page: number; story: string; }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  /*
  const { page, story } = await request.json();
  
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        "role": "system",
        "content": `
          You will be provided with a short story. Your tasks are to:
          - Write a children's book based on the story
          - The should be ${page} pages long
          - Each page should have no less than 100 characters and no more than 300 characters
          - The JSON response should be in the following format: { "title": "book title", "shortSummary": "max 200 char summary", "page1": "content", "page2": "content", ...}
          Only return JSON response and do not include any other information in the response.
        `
      },
      {
        "role": "user",
        "content": story
      }
    ],
    response_format: { type: "json_object" },
    // temperature: 0.7,
    // max_tokens: 64,
    // top_p: 1,
  });

  return {
    story: response.choices[0].message.content
  };
  */

  const mockResponse = `{
    "title": "Milo the Monster's Tech Dream",
    "shortSummary": "Milo, a monster with a dream to become a software engineer, achieves his goal, builds a unicorn startup, and then becomes a VC.",
    "page1": "In a town not too far away, lived a friendly monster named Milo. Unlike other monsters who liked to scare, Milo had a unique dream.",
    "page2": "Milo wanted to be a software engineer. He loved computers, coding, and solving puzzles. But being a monster, this was no easy dream.",
    "page3": "Despite the challenges, Milo didn’t give up. He practiced coding every day, learning from videos and books in the town library.",
    "page4": "Slowly but steadily, Milo started getting better at coding. He could fix bugs and write programs that made everyone’s life easier.",
    "page5": "One day, Milo decided it was time. He started his own company right in his cozy cave. It was the beginning of something big.",
    "page6": "Milo worked day and night, coding away on his trusty computer. His startup began to grow, attracting attention from far and wide.",
    "page7": "With a team of talented friends, Milo’s startup created something magical. It solved problems nobody else could, becoming incredibly popular.",
    "page8": "Before long, Milo’s company became known as a 'unicorn,' a rare and successful venture that was valued at over a billion jewels!",
    "page9": "The success was overwhelming but exciting. Milo knew, however, there was more he wanted to explore.",
    "page10": "He made a bold decision. Milo sold his unicorn company to a friendly competitor, who promised to take good care of it.",
    "page11": "With the treasure chest from the sale, Milo embarked on a new adventure. He decided to help other dreamers like himself.",
    "page12": "Milo founded a venture capital firm, using his jewels to fund exciting new startups. He was determined to bring more dreams to life.",
    "page13": "As a VC, Milo traveled far and wide, meeting many hopeful inventors and creators. He shared his wisdom and resources generously.",
    "page14": "Each startup Milo supported brought new innovations that made the world a better place. He was proud of every project he touched.",
    "page15": "Milo proved that no matter how unusual your dream, with hard work and dedication, you can achieve anything you set your heart on.",
    "page16": "Through his journey, Milo inspired monsters and humans alike. Everyone began to believe that dreams, no matter how big, could come true.",
    "page17": "The town celebrated Milo not just as a tech genius, but as a kind-hearted monster who changed the world with his generosity and vision.",
    "page18": "And Milo, with a heart as big as his brain, continued dreaming, building, and supporting, proving that even monsters can make dreams come true."
  }`;
  
  return {
    story: mockResponse
  };
};
