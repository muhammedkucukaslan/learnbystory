import React from "react";
import { Story } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  story: Story;
};

const StoryCard = ({ story }: Props) => {
  return (
    <Link href={`/dashboard/stories/${story.id}`}>
      <Card className="h-full">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl md:text-3xl text-center truncate max-w-full">
            {story.title}
          </CardTitle>
          <p className="text-sm">{story.field}</p>
          <CardDescription className="text-muted-foreground text-md">
            {moment(story.createdAt).format("MMM Do YY")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {story.result && <Badge>{story.result}</Badge>}
        </CardContent>
      </Card>
    </Link>
  );
};

export default StoryCard;
