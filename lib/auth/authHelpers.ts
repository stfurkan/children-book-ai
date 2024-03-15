"use server";
import { signIn, signOut } from "@/auth";

export const signInGitHub = async () => {
  await signIn('github');
};

export const signOutUser = async () => {
  await signOut();
};
