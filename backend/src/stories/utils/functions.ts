
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

async function askGPT(prompt: string, tokenSize : number): Promise<IResult<PromptStory>> {
    try {
        // Input validation
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
                content: "You are a language learning assistant. Respond with raw JSON only, no markdown formatting or code blocks."
            },
            {
                role: "user",
                content: prompt
            }
        ];

        const requestBody = {
            messages,
            max_tokens: tokenSize,
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

        console.log("Cleaned response:", cleanedResponse);

        try {
            // Parse the cleaned JSON string
            const storyData: PromptStory = JSON.parse(cleanedResponse);
            
            // Validate the parsed data
         

            console.log("Successfully parsed story data:", storyData);
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


function giveTokenSize(wordCount: number): number {
    const tokensPerWord = 1.33;
    
    const minToken = 100;
    const maxToken = 1300;

    let estimatedTokens = Math.ceil(wordCount * tokensPerWord);

    if (estimatedTokens < minToken) {
        estimatedTokens = minToken;
    } else if (estimatedTokens > maxToken) {
        estimatedTokens = maxToken;
    }

    return estimatedTokens;
}

function generatePrompt(language: string, level: string, interestAreas: string[], length: number): string {
    const prompt = `
Create an educational story and quiz in ${language} for language learners. The story should be engaging, appropriate for ${level} level learners, and involve themes about ${interestAreas.join(", ")}. The story should be approximately ${length} words long.

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
9. Story should incorporate the themes: ${interestAreas.join(", ")}
10. Story length should be approximately ${length} words

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





export {
    giveTokenSize,
    generatePrompt,
    askGPT
}

