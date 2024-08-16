"use server"

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_APIKEY,
});
export const getOpenAIPrompt = async (prompt: string) => {

    try {

        const result = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a smart contract auditor." },
                { role: "user", content: prompt },
            ],
        });


        console.log(result);
        return result


    } catch (error) {
        console.log("Err", error);
    }
}