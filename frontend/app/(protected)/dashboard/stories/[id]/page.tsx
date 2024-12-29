import StoryQuiz from "@/features/stories/components/story-quiz";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const StoryPage = ({ params }: Props) => {
  return <StoryQuiz id={params.id} />;
};

export default StoryPage;
