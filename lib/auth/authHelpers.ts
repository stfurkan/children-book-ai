"use server";
import { signIn, signOut } from "@/auth";

export const signInGitHub = async () => {
  await signIn('github');
};

export const signInGoogle = async () => {
  await signIn('google');
};

export const signOutUser = async () => {
  await signOut();
};
