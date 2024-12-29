import GenerateButton from "@/features/stories/components/generate-button";
import StoryList from "@/features/stories/components/story-list";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-10 items-center">
      <StoryList />
      <GenerateButton />
    </div>
  );
};

export default Page;
