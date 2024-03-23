export type AuthorType = {
  id: string;
  image: string | null;
  name: string;
  authorId: string;
  bio: string;
};

export type BookType = {
  author: string;
  id: string;
  title: string;
  image: string | null;
  shortDescription: string | null;
  published: boolean;
};

export type PageType = {
  id: string;
  bookId: string;
  pageNumber: number;
  content: string;
  image: string | null;
};
