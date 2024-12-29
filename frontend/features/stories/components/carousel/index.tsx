"use client";

import React from "react";
import { Story } from "../../types";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StoryCard from "../story-list/card";
import { useQueryStories } from "@/hooks/queries/story";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const StoryShowcase = () => {
  const { data: stories, isLoading, isError } = useQueryStories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

  const getBasisClass = (totalStories: number) => {
    if (totalStories > 3) return "basis-1/3";
    if (totalStories === 3) return "basis-1/3";
    if (totalStories === 2) return "basis-1/2";
    return "basis-full";
  };

  return (
    <Carousel
      opts={{
        align: "end",
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {stories.map((story: any) => (
          <CarouselItem
            key={story._id}
            className={cn(
              getBasisClass(stories.length),
              "md:basis-1/2 lg:" + getBasisClass(stories.length)
            )}
          >
            <StoryCard story={story} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {stories.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default StoryShowcase;
