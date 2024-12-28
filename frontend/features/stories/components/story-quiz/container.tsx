import { Card } from "@/components/ui/card";
import Story from "./story";
import Quiz from "./quiz";
import { Question } from "../../types";

interface StoryQuizProps {
  story: string;
  questions: Question[];
}

const StoryQuizContainer: React.FC<StoryQuizProps> = ({ story, questions }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[600px]">
          <Story content={story} />
        </Card>
        <Card className="h-[600px]">
          <Quiz questions={questions} />
        </Card>
      </div>
    </div>
  );
};

export default StoryQuizContainer;
