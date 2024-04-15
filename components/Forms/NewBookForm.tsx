"use client"
import { useState } from "react";
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
import { createBookWithPages } from "@/lib/db/newBook";
import { createNewBook } from "@/lib/ai/newBook";
 
export function NewBookForm(
  { setStory }: { setStory?: React.Dispatch<React.SetStateAction<{}>> }
) {
  const t = useTranslations('NewBook');

  const FormSchema = z.object({
    page: z
      .coerce.number()
      .int({ 
        message: t('form.page.typeError'),
      })
      .min(1, {
        message: t('form.page.minError'),
      })
      .max(24, {
        message: t('form.page.maxError'),
      }),
    story: z
      .string()
      .min(10, {
        message: t('form.story.minError'),
      })
      .max(300, {
        message: t('form.story.maxError'),
      }),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setError(null);
    setLoading(true);

    try {
      const results = await createNewBook({
        page: data.page,
        story: data.story
      });

      if (!results.story) throw new Error(t('genericError'));
  
      const story = JSON.parse(results.story);
      if (setStory) setStory(story);
  
      await createBookWithPages(story);
    }
    catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col space-y-3">
            <h2 className="font-semibold text-2xl">
              {t('loading')}
            </h2>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
          ~ {t('title')} ~
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6">
            {error && (
              <span className="inline-block font-semibold text-red-500 pb-1">
                {t('error')}: {error}
              </span>
            )}
            <FormField
              control={form.control}
              name="page"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('form.page.label')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form.page.placeholder')}
                      type="number"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('form.page.description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.story.label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('form.story.placeholder')}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('form.story.description')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t('create')}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
