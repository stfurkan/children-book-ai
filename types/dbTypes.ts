export type AuthorType = {
  id: string;
  image: string | null;
  authorName: string;
  authorId: string;
  bio: string;
};

export type BookType = {
  author: string;
  id: string;
  title: string;
  image: string | null;
  shortDescription: string;
  published: boolean;
};

export type PageType = {
  id: string;
  bookId: string;
  pageNumber: number;
  content: string;
  image: string | null;
};

export type BookCardType = {
  id: string;
  title: string;
  authorId: string;
  image: string | null;
  shortDescription: string | null;
  authorName: string | null;
  published: boolean;
};
