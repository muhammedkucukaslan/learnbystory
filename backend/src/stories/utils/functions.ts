
import { IResult } from '../../types/global';
import { createSuccessResult, createErrorResult } from '../../utils/functions';



interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ChatCompletion {
    id: string;
    choices: {
        message: {
            content: string;
            role: string;
        };
        index: number;
        finish_reason: string;
    }[];
}


async function askGPT(prompt: string): Promise<IResult<PromptStory>> {
    try {

        if (!prompt.trim()) {
            return createErrorResult("ValidationError", "Prompt cannot be empty");
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return createErrorResult("ConfigError", "OpenAI API key is not configured");
        }

        const baseURL = "https://devopsdude.openai.azure.com/openai/deployments/gpt-4o-1/chat/completions?api-version=2024-08-01-preview";

        const messages: ChatMessage[] = [
            {
                role: "system",
                content: "You are a language learning assistant. Provide output is validJSON. The data schema should be like this."+ JSON.stringify(exampleResponse)
            },
            {
                role: "user",
                content: prompt
            }
        ];

        const requestBody = {
            messages,
            temperature: 0.7,
            n: 1,

        };

        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Error:', errorData);
            return createErrorResult(
                "APIError",
                `Azure OpenAI API error: ${response.status} ${response.statusText}`
            );
        }

        const data: ChatCompletion = await response.json();

        if (!data.choices || data.choices.length === 0) {
            return createErrorResult("APIError", "No response received from Azure OpenAI");
        }
        const assistantResponse = data.choices[0].message.content;
        if (!assistantResponse) {
            return createErrorResult("APIError", "Empty response received from Azure OpenAI");
        }

        // Clean the response by removing any markdown code block syntax
        const cleanedResponse = assistantResponse
            .replace(/```json\n?/g, '')  // Remove ```json
            .replace(/```\n?/g, '')      // Remove closing ```
            .trim();                     // Remove any extra whitespace


        try {
            const storyData: PromptStory = JSON.parse(cleanedResponse);
            return createSuccessResult(storyData);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            return createErrorResult("ParseError", "Failed to parse response as JSON");
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Azure OpenAI API Error:", error);
        return createErrorResult("APIError", `Failed to get response from Azure OpenAI: ${errorMessage}`);
    }
}

// Helper function to validate the story data structure
function validateStoryData(data: any): data is PromptStory {
    return (
        typeof data === 'object' &&
        typeof data.id === 'string' &&
        typeof data.title === 'string' &&
        typeof data.content === 'string' &&
        Array.isArray(data.questions) &&
        data.questions.length === 10 &&
        data.questions.every((q: any) =>
            typeof q.id === 'string' &&
            typeof q.text === 'string' &&
            Array.isArray(q.options) &&
            q.options.length === 5 &&
            typeof q.correctAnswer === 'number' &&
            q.correctAnswer >= 0 &&
            q.correctAnswer <= 4
        )
    );
}



function generatePrompt(language: string, level: string, interest: string, length: number): string {
    const prompt = `
Create an educational story and quiz in ${language} for language learners. The story should be engaging, appropriate for ${level} level learners, and involve themes about ${interest}. The story should be approximately ${length} words long.

Please return a JSON object with the following exact structure:

{
  "id": string,
  "title": string,
  "content": "markdown formatted story content with headers and paragraphs",
  "questions": [
    {
      "id": string,
      "text": string,
      "options": [
        "first option",
        "second option",
        "third option",
        "fourth option",
        "fifth option"
      ],
      "correctAnswer": number (index of correct answer, 0-4)
    }
  ]
}

Requirements:
1. The content must be in markdown format with proper headers and paragraphs
2. Create exactly 5 questions
3. Each question must have exactly 5 options
4. The correctAnswer must be the index (0-4) of the correct option
5. The story's language level should match ${level} level
6. The story and questions should be in ${language}
7. Include vocabulary and grammar patterns appropriate for ${level} level
8. Questions should test both comprehension and language points
9. Story length should be approximately ${length} words

Return only the JSON object with no additional explanation or text.`;

    return prompt;
}

interface PromptStory {
    id: string;
    title: string;
    content: string;
    questions: Question[];
}

interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
}

const exampleResponse =
{
    "id": "6770eeec0588504352731b24",
    "title": "The Underdog Victory",
    "content": "# The Underdog Victory\n\nIt was a crisp autumn afternoon, perfect for football. The stadium buzzed with excitement as fans eagerly awaited the kickoff. The two teams on the field were vastly different in their standings. The Blue Tigers, reigning champions for the past three years, were set to play against the Red Falcons, a team that had struggled at the bottom of the league.\n\nDespite the odds, the Red Falcons' captain, Alex, was determined to lead his team to victory. In the locker room, Alex gave an inspiring speech. \"Today is not just another game,\" he said. \"It's our chance to show everyone that we are not defined by our past losses. We have trained hard, and we have the heart to win.\"\n\nAs the game began, the Blue Tigers dominated the field, showcasing their superior skills and coordination. By halftime, the score was 2-0 in favor of the Blue Tigers. The Red Falcons looked defeated, but Alex refused to give up. He encouraged his teammates, reminding them of their strengths and the importance of teamwork.\n\nIn the second half, the Red Falcons returned with renewed energy. They played with incredible passion and determination. Midfielder Sam managed to score their first goal with a powerful kick from outside the penalty box. The crowd erupted in cheers, and the Falcons' spirits soared.\n\nWith only ten minutes left on the clock, the Red Falcons pushed harder. Defender Mia intercepted a critical pass and quickly transferred the ball to forward Leo, who made a swift run towards the goal. In a stunning display of skill, Leo dodged two defenders and struck the ball into the net, equalizing the score.\n\nThe final moments of the game were tense. The Blue Tigers were desperate to reclaim their lead, but the Red Falcons' defense held strong. In the last minute, Alex saw an opportunity and took a daring shot from midfield. The ball sailed through the air and landed perfectly in the top corner of the net.\n\nThe stadium erupted in applause. The Red Falcons had achieved the impossible, defeating the champions with a final score of 3-2. Alex and his team celebrated their hard-earned victory, proving that determination and teamwork could overcome even the greatest challenges.\n",
    "questions": [
        {
            "text": "Who were the reigning champions?",
            "options": [
                "The Red Falcons",
                "The Blue Tigers",
                "The Green Eagles",
                "The Yellow Lions",
                "The Black Panthers"
            ],
            "correctAnswer": 1
        },
        {
            "text": "What was the score at halftime?",
            "options": [
                "0-0",
                "1-0",
                "2-0",
                "2-1",
                "3-0"
            ],
            "correctAnswer": 2
        },
        {
            "text": "Who scored the first goal for the Red Falcons?",
            "options": [
                "Alex",
                "Leo",
                "Mia",
                "Sam",
                "John"
            ],
            "correctAnswer": 3
        },
        {
            "text": "How did Leo score the second goal?",
            "options": [
                "By a penalty kick",
                "By a header",
                "By dodging two defenders",
                "By a free kick",
                "By a corner kick"
            ],
            "correctAnswer": 2
        },
        {
            "text": "What was the final score?",
            "options": [
                "2-2",
                "3-3",
                "3-1",
                "3-2",
                "4-3"
            ],
            "correctAnswer": 3
        }
    ]
}





export {
    generatePrompt,
    askGPT
}

