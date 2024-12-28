import Markdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

const Story: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ScrollArea className="h-full p-6">
      <article className="prose prose-neutral prose-headings:mb-4 prose-headings:mt-8 prose-h1:text-3xl prose-h2:text-2xl prose-p:mb-4 prose-li:my-2 max-w-none">
        <Markdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mb-3 mt-6">{children}</h2>
            ),
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 mb-4">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-2">{children}</li>,
          }}
        >
          {content}
        </Markdown>
      </article>
    </ScrollArea>
  );
};

export default Story;
