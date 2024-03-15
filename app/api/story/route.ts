import { NextResponse } from 'next/server'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  const { page, story } = await request.json();
  
  /*
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
          - The JSON response should be in the following format: { "page1": "content", "page2": "content", ...}
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

  return NextResponse.json({
    story: response.choices[0].message.content
  });
  */

  const mockResponse = "{\n  \"page1\": \"Once upon a time, in a land far, far away, there lived a monster who had a very big dream. Unlike other monsters who liked to scare, this monster wanted to create.\",\n  \"page2\": \"This wasn't just any dream. The monster wanted to become a software engineer! It loved computers, codes, and solving complex problems with a few clicks and taps.\",\n  \"page3\": \"With dedication and hard work, the monster started learning. It read books, watched tutorials, and practiced day and night. Soon, it became a skilled software engineer.\",\n  \"page4\": \"The monster then had a brilliant idea. It would start its own startup! It worked on its project, coding away with excitement and hope, dreaming of what it could become.\",\n  \"page5\": \"The startup was a success! It grew and grew, becoming more popular each day. People were amazed at what the monster had created, and the company became a unicorn.\",\n  \"page6\": \"One day, a competitor saw the value in the monster's company and made an offer to buy it. The monster thought hard and decided to sell, dreaming of new adventures.\",\n  \"page7\": \"With the money from the sale, the monster did something unexpected. It didn't buy a castle or treasures. Instead, it started a VC firm to help other dreamers like itself.\",\n  \"page8\": \"The VC firm helped many new startups, funding their dreams and helping them grow. The monster felt joy in seeing others achieve their dreams, just like it had.\",\n  \"page9\": \"The monster's efforts changed the land. Where there was once fear of the unknown, there was now excitement for innovation and creation, all thanks to one monster's dream.\",\n  \"page10\": \"And so, the monster lived happily, surrounded by the success of many startups. It had become more than a software engineer; it had become a bringer of dreams.\"\n}"
  
  return NextResponse.json({
    story: mockResponse
  });
}
