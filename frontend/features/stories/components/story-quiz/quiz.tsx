"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Question } from "../../types";
import { useUpdateStory } from "@/hooks/queries/story";
import Loader from "@/components/global/loader";

const Quiz: React.FC<{ questions: Question[]; id: string }> = ({
  questions,
  id,
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const { mutate: update, isPending } = useUpdateStory(id);

  const handleSubmit = () => {
    update({
      id: id,
      result: calculateScore(),
    });
  };

  return (
    <ScrollArea className="h-full p-6">
      <div className="space-y-8">
        {questions.map((q) => (
          <Card key={q.id} className="p-6">
            <h3 className="text-lg font-semibold mb-4">{q.text}</h3>
            <RadioGroup
              onValueChange={(value) => handleAnswer(q.id, parseInt(value))}
              className="space-y-4"
            >
              {q.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`q${q.id}-${index}`}
                    disabled={showResults}
                  />
                  <Label
                    htmlFor={`q${q.id}-${index}`}
                    className={
                      showResults
                        ? index === q.correctAnswer
                          ? "text-green-600"
                          : answers[q.id] === index
                          ? "text-red-600"
                          : ""
                        : ""
                    }
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>
        ))}

        <Button
          className="w-full"
          onClick={() => {
            setShowResults(true);
            handleSubmit();
          }}
          disabled={
            showResults ||
            Object.keys(answers).length !== questions.length ||
            isPending
          }
        >
          <Loader state={isPending}>Submit Quiz</Loader>
        </Button>

        {showResults && (
          <Card className="p-6 mt-4">
            <h3 className="text-lg font-semibold">Results</h3>
            <p className="mt-2">
              You got {calculateScore()} out of {questions.length} questions
              correct!
            </p>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};

export default Quiz;
