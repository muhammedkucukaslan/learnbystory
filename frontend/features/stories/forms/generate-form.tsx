"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ActionButton from "@/components/global/action-button";
import { Sparkles } from "lucide-react";
import { useQueryUser } from "@/hooks/queries/user";
import { useGenerateStory } from "@/hooks/queries/story";

const formSchema = z.object({
  language: z.string(),
  length: z.string(),
  interest: z.string(),
  difficulty: z.string(),
});

export default function GenerateForm() {
  const { data: user, isLoading: isUserLoading } = useQueryUser();
  const { mutate: generateStory, isPending } = useGenerateStory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const foundLanguage = user.languages.find(
      (language: any) => language.language === values.language
    );
    const data = {
      language: foundLanguage.language,
      length: Number(values.length),
      interest: values.interest,
      level: foundLanguage.level,
      difficulty: values.difficulty,
    };

    generateStory(data);
  }

  if (isUserLoading) {
    return null;
  } else if (!isUserLoading && !user) {
    return <div className="text-destructive">Failed to load user data</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {user.languages.map(
                    (language: { language: string; level: string }) => (
                      <SelectItem
                        key={language.language}
                        value={language.language}
                      >
                        {language.language}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                You can select a language for the story
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Length</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select a length for the story</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select a difficulty for the story
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an interest" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {user.interests.map((interest: any) => (
                    <SelectItem key={interest} value={interest}>
                      {interest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select an interest for the story
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <ActionButton
          type="submit"
          text="Generate"
          icon={<Sparkles size={16} />}
          loading={isPending}
          className="mx-auto w-full flex flex-col items-stretch justify-center"
        />
      </form>
    </Form>
  );
}
