import StoryShowcase from "@/features/stories/components/carousel";
import GenerateButton from "@/features/stories/components/generate-button";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <div className="flex flex-col gap-y-16 items-center">
      <h3 className="text-lg md:text-2xl lg:text-6xl font-bold">
        Hello {params.slug}!
      </h3>

      <div className="px-12 mx-auto container">
        <StoryShowcase slug={params.slug} />
      </div>

      <GenerateButton />
    </div>
  );
};

export default Page;
