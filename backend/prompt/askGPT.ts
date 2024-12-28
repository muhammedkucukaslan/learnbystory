import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { prompt } from './promptType';

// .env dosyasından API anahtarını yükle
dotenv.config();

// OpenAI API yapılandırması
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// GPT-4'e yönlendirme
async function askGPT(prompt: string): Promise<string>git {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4", 
            messages: [
                { role: "system", content: "Sen bir dil öğrenme asistanısın." },
                { role: "user", content: 
                    [
                        {"type" : "text",
                        "content" : prompt
                    }
                    ]
                 },
            ],
        });

        const gptResponse = {
            response: response  .data.choices[0].message.content,
            model: "gpt-4",
            prompt: prompt,
        };

 
        console.log(JSON.stringify(gptResponse, null, 2));
    } catch (error) {
        console.error("Hata oluştu:", (error as any).response ? (error as any).response.data : (error as any).message);
    }
}




export { askGPT };


