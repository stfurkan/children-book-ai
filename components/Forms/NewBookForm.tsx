"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Input } from "../ui/input"
 
const FormSchema = z.object({
  page: z
    .coerce.number()
    .int()
    .min(1, {
      message: "Page must be at least 1.",
    })
    .max(24, {
      message: "Page must not be longer than 24.",
    }),
  story: z
    .string()
    .min(10, {
      message: "Story must be at least 10 characters.",
    })
    .max(300, {
      message: "Story must not be longer than 300 characters.",
    }),
})
 
export function NewBookForm(
  { setStory }: { setStory: React.Dispatch<React.SetStateAction<{}>> }
) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following story:",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="block text-white">Total page: {data.page}</code>
          <code className="text-white">Story: {data.story}</code>
        </div>
      ),
    });

    const results = await fetch('/api/story', {
      method: 'POST',
      body: JSON.stringify({
        page: data.page,
        story: data.story,
      })
    }).then(r => r.json());

    const story = JSON.parse(results.story);
    setStory(story);
    console.log(story)
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Total Pages
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the page number of your children's book."
                  type="number"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Select a number between 1 and 24.
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
              <FormLabel>Story</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write the main idea of you children's book in 300 characters or less."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Make sure to keep it short and sweet.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
