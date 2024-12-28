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

const stories: Story[] = [
  {
    _id: "1",
    title: "Story of a developer",
    content: "Content 1",
    field: "Field 1",
    result: "Result 1",
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "Story of a designer",
    content: "Content 2",
    field: "Field 2",
    result: "Result 2",
    createdAt: new Date(),
  },
  {
    _id: "3",
    title: "Story of a manager",
    content: "Content 3",
    field: "Field 3",
    result: "Result 3",
    createdAt: new Date(),
  },
  {
    _id: "4",
    title: "Story of a developer",
    content: "Content 1",
    field: "Field 1",
    result: "Result 1",
    createdAt: new Date(),
  },
  {
    _id: "5",
    title: "Story of a designer",
    content: "Content 2",
    field: "Field 2",
    result: "Result 2",
    createdAt: new Date(),
  },
  {
    _id: "6",
    title: "Story of a manager",
    content: "Content 3",
    field: "Field 3",
    result: "Result 3",
    createdAt: new Date(),
  },
];

type Props = {
  slug: string;
};

const StoryShowcase = ({ slug }: Props) => {
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
        {stories.map((story) => (
          <CarouselItem key={story._id} className="md:basis-1/2 lg:basis-1/3">
            <StoryCard story={story} slug={slug} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default StoryShowcase;
