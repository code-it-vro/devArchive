import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Use environment variable
  dangerouslyAllowBrowser: true, // ⚠️ Only use this in dev mode
});

export const getAIResponse = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
    });

    return (
      response.choices?.[0]?.message?.content ||
      "Sorry, I couldn't process that."
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Error fetching response from AI.";
  }
};
