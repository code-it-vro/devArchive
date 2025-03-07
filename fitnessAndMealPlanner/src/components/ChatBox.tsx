import { useState } from "react";
import { getAIResponse } from "../api/openai";

interface ChatBoxProps {
  placeholder: string;
  promptTemplate: (input: string) => string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ placeholder, promptTemplate }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    setLoading(true);
    const prompt = promptTemplate(input);
    const aiResponse = await getAIResponse(prompt);
    setResponse(aiResponse);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 text-white rounded-lg shadow-md">
      <textarea
        className="w-full p-3 text-black rounded-lg"
        rows={3}
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className="mt-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? "Generating..." : "Ask AI"}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
