import {
  integer,
  sqliteTable,
  text,
  primaryKey,
  unique
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { createId } from '@paralleldrive/cuid2';

export const books = sqliteTable("books", {
  id: text("id").notNull().primaryKey().$defaultFn(() => createId()),
  title: text("title").notNull(),
  shortDescription: text("shortDescription").notNull(),
  image: text("image"),
  author: text("author").notNull().references(() => users.id, { onDelete: "cascade" }),
  published: integer("published", { mode: 'boolean'}).notNull().default(false),
});

export const authorDetails = sqliteTable("author_details", {
  id: text("id").notNull().primaryKey().$defaultFn(() => createId()),
  authorId: text("authorId").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  authorName: text("name").notNull(),
  bio: text("bio").notNull(),
  image: text("image"),
  aiKey: text("aiKey"),
  keyIv: text("keyIv"),
  keyAuthTag: text("keyAuthTag"),
});

export const pages = sqliteTable("pages", {
  id: text("id").notNull().primaryKey().$defaultFn(() => createId()),
  bookId: text("bookId").notNull().references(() => books.id, { onDelete: "cascade" }),
  pageNumber: integer("pageNumber").notNull(),
  content: text("content").notNull(),
  image: text("image"),
}, (t) => ({
  unq: unique().on(t.bookId, t.pageNumber),
  })
);

// Below is the schema for the SQLite database used by the NextAuth adapter.
export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = sqliteTable(
 "account",
 {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccount["type"]>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
 },
 (account) => ({
   compoundKey: primaryKey({
       columns: [account.provider, account.providerAccountId],
     }),
 })
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
