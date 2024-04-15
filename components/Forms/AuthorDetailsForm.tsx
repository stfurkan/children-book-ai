"use client"
import { useState } from "react";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('AuthorProfile');

  const FormSchema = z.object({
    authorName: z
      .string()
      .min(5, {
        message: t('form.name.minError'),
      })
      .max(150, {
        message: t('form.name.maxError'),
      }),
    authorBio: z
      .string()
      .min(10, {
        message: t('form.bio.minError'),
      })
      .max(300, {
        message: t('form.bio.maxError'),
      }),
    aiKey: z
      .string()
      .optional()
  });

  const [loading, setLoading] = useState(false);

  const openAIDoc = (
    <a
      href="https://platform.openai.com/docs/quickstart"
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-700 underline hover:no-underline"
    >
      {t('openAILink')}
    </a>
  );

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

    let toastText = t('toast.created');

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
      toastText = t('toast.updated');
    }

    toast({
      title: toastText,
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="block text-white">
            {t('toast.description')}
          </code>
        </div>
      ),
    });
  
    setLoading(false);
  }

  if (loading) {
    return (
      <>
        <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
          ~ {t('title')} ~
        </h1>
      
        <div className="flex flex-col space-y-3">
          <h2 className="font-semibold text-2xl">{t('loading')}</h2>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </>
    );
  }
 
  return (
    <>
      <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
        ~ {t('title')} ~
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('form.name.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.name.placeholder')}
                    type="text"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('form.name.description')}
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
                  {t('form.bio.label')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('form.bio.placeholder')}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('form.bio.description')}
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
                  {t('form.aiKey.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.aiKey.placeholder')}
                    type="password"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t.rich('form.aiKey.description', { openAIDoc: openAIDoc as any})}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {t('save')}
          </Button>
        </form>
      </Form>
    </>
  );
}
