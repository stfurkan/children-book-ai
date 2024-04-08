"use client"
import { useState } from "react";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { createAuthorDetails, updateAuthorDetails } from "@/lib/db/author";

const FormSchema = z.object({
  authorName: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters.",
    })
    .max(150, {
      message: "Name must not be longer than 150 characters.",
    }),
  authorBio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(300, {
      message: "Bio must not be longer than 300 characters.",
    }),
  aiKey: z
    .string()
    .optional()
})
 
export function AutherDetailsForm(
  {
    user,
    userAuthorDetails
  }: {
    user?: Session['user'];
    userAuthorDetails?: {
      authorName: string;
      bio: string;
    };
  }
) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      authorName: userAuthorDetails?.authorName || "",
      authorBio: userAuthorDetails?.bio || "",
      aiKey: "",
    }
  });
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    let toastText = "Author details saved!";

    if (!userAuthorDetails){
      await createAuthorDetails({
        userId: user?.id!,
        name: data.authorName,
        bio: data.authorBio,
        image: user?.image || undefined,
        aiKey: data.aiKey || undefined,
      });
    } else {
      await updateAuthorDetails({
        userId: user?.id!,
        name: data.authorName,
        bio: data.authorBio,
        image: user?.image || undefined,
        aiKey: data.aiKey || undefined,
      });
      toastText = "Author details updated!";
    }

    toast({
      title: toastText,
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="block text-white">
            Your author details have been saved successfully.
          </code>
        </div>
      ),
    });
  
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
      <h2 className="font-semibold text-2xl">Loading...</h2>
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    );
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="authorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Author Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  type="text"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your name will be displayed on your book.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Author Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your bio"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A short description about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your OpenAI API Key
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your OpenAI API key"
                  type="password"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is optional, but it will be used to generate content for your book.
                If you don&rsquo;t want to update it, leave it empty. It will use your existing key.
                If your key does not work, you cannot generate content. If you don&rsquo;t know how 
                to get an OpenAI API key, please visit {' '}
                <a
                  href="https://platform.openai.com/docs/quickstart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 underline hover:no-underline"
                >
                  the OpenAI quick start guide
                </a>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Save Details
        </Button>
      </form>
    </Form>
  );
}
