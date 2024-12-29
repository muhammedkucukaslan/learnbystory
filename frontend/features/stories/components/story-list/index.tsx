"use client";

import React from "react";
import { Story } from "../../types";
import StoryCard from "./card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryStories } from "@/hooks/queries/story";

const StoryList = () => {
  const { data: stories, isLoading, isError } = useQueryStories();

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!isLoading && stories?.length <= 0) {
    return (
      <h2 className="text-lg font-medium text-center">
        No stories. You can create one by clicking the button below.
      </h2>
    );
  }

  if (isError) {
    return (
      <h2 className="text-lg font-medium text-center text-destructive">
        An error occurred while fetching stories. Please try again later.
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story: any) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;
