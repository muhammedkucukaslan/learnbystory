"use client";

import React from "react";
import { Question } from "../../types";
import StoryQuizContainer from "./container";
import { useQueryStory } from "@/hooks/queries/story";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  id: string;
};

export default function StoryQuiz({ id }: Props) {
  const { data: story, isLoading } = useQueryStory(id);

  if (isLoading) {
    return (
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[600px]" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  if (!story) {
    return <div className="text-destructive">Story not found</div>;
  }

  return <StoryQuizContainer story={story} questions={story.questions} />;
}
