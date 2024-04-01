import NextAuth, { Session, User } from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db";

export const authOptions = {
  callbacks: {
    async session({ session, user }: { session: Session, user: User }) {
      session.user.id = user.id || '';
      return session;
    }
  },
  providers: [ GitHub ],
  adapter: DrizzleAdapter(db),
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authOptions,
});
