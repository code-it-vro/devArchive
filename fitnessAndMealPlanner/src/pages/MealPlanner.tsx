import ChatBox from "../components/ChatBox";

const MealPlanner = () => {
  const mealPrompt = (ingredients: string) =>
    `I have ${ingredients}. Suggest a healthy meal with instructions.`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mt-10">🍽️ AI Meal Planner</h1>
      <ChatBox
        placeholder="Enter ingredients you have..."
        promptTemplate={mealPrompt}
      />
    </div>
  );
};

export default MealPlanner;
