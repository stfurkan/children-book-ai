import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { AuthorType } from '@/types/dbTypes';

export function AuthorDetails({ authorDetails }: { authorDetails: Omit<AuthorType, 'id' | 'authorId'> }) {
  return (
    <div className="my-8 p-4 border border-gray-200 rounded-lg shadow-sm w-full">
      <h1 className="font-mono font-semibold text-xl mb-2 text-center">
        ~ Author ~
      </h1>
      <Separator />
      <div className="flex items-center space-x-6 mt-2">
        <div className="flex-shrink-0">
          <Avatar className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
            <AvatarImage src={authorDetails.image || ''} alt={authorDetails.authorName} className="w-full h-full object-cover" />
            <AvatarFallback className="flex items-center justify-center text-xl font-semibold text-gray-500 bg-gray-200">
              {authorDetails.authorName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow space-y-2">
          <h3 className="text-lg font-bold text-gray-900">{authorDetails.authorName}</h3>
          <p className="text-sm text-gray-700">
            {authorDetails.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
