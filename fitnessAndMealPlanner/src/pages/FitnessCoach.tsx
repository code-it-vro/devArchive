import ChatBox from "../components/ChatBox";

const FitnessCoach = () => {
  const fitnessPrompt = (goal: string) =>
    `I need a workout plan for ${goal}. Please provide a structured fitness routine.`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mt-10">🏋️‍♂️ AI Fitness Coach</h1>
      <ChatBox
        placeholder="Enter your fitness goal..."
        promptTemplate={fitnessPrompt}
      />
    </div>
  );
};

export default FitnessCoach;
