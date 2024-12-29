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

const StoryShowcase = () => {
  const { data: stories, isLoading } = useQueryStories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!isLoading && !stories?.length) {
    return (
      <h2 className="text-lg font-medium text-center">
        No stories. You can create one by clicking the button below.
      </h2>
    );
  }

  console.log(stories);

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
          <CarouselItem key={story._id} className="md:basis-1/2 lg:basis-1/3">
            <StoryCard story={story} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default StoryShowcase;
