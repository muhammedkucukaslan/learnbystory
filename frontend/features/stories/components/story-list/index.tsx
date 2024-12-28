import React from "react";
import { Story } from "../../types";
import StoryCard from "./card";

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

const StoryList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;
