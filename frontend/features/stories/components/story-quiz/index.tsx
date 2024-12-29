"use client";

import React from "react";
import { Question } from "../../types";
import StoryQuizContainer from "./container";
import { useQueryStory } from "@/hooks/queries/story";
import { Skeleton } from "@/components/ui/skeleton";

const mockStory = `
# The Lost City of Atlantis

Long ago, there existed a magnificent civilization known as Atlantis. This advanced society thrived on an island paradise, combining technology and nature in perfect harmony.

## The Golden Age

During its golden age, Atlantis was led by wise philosopher-kings who governed with justice and wisdom. The city's architecture was a marvel, featuring towering spires of crystal and gold that seemed to touch the clouds.

## The Fall

But pride led to their. As their power grew, so did their ambition. They began to conquer neighboring lands, until the gods themselves decided to intervene.

## The Legacy

In a single day and night, Atlantis vanished beneath the waves. Some say it still exists, hidden in the ocean's depths, waiting to be rediscovered.
`;

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What type of leaders did Atlantis have?",
    options: [
      "Military generals",
      "Philosopher-kings",
      "Elected officials",
      "Merchant princes",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What caused the fall of Atlantis?",
    options: [
      "Natural disaster",
      "Enemy invasion",
      "Pride and ambition",
      "Economic collapse",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "How long did it take for Atlantis to disappear?",
    options: ["A century", "A decade", "A year", "A single day and night"],
    correctAnswer: 3,
  },
];

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

  return <StoryQuizContainer story={mockStory} questions={mockQuestions} />;
}
