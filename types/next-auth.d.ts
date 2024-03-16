import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// You can overwrite next-auth types in this file!
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id */
      id: string;
      /** The user's status */
      status: string;
    } & DefaultSession["user"];
  };

  interface User {
    /** The user's id */
    id?: string;
    /** The user's status */
    status: string;
  };
};
