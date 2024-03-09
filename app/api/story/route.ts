import { NextResponse } from 'next/server'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
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
}
