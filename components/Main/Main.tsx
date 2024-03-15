"use client";
import React, { useState } from 'react';
import { NewBookForm } from '../Forms/NewBookForm';

export default function Main() {
  const [story, setStory] = useState<{ [key: string]: string }>({});

  // if story is empty, show the input form
  if (Object.keys(story).length === 0) {
    return (
      <NewBookForm setStory={setStory} />
    );
  }

  // convert story object to array object
  const storyArray = Object.entries(story).map(([page, text]) => ({ page, text }));


  return (
    <div>
      <h1 className="font-semibold text-4xl">Story</h1>
      {storyArray.map((item, index) => {
        return (
          <div key={index}>
            <p>
              <span className="font-semibold">Page {item.page.match(/\d+/)}:</span> {item.text}
            </p>
          </div>
        );
        })
      }
    </div>
  );
}
