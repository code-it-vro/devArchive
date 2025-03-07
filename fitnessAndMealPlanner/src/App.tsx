import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FitnessCoach from "./pages/FitnessCoach";
import MealPlanner from "./pages/MealPlanner";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="p-5 flex justify-center space-x-10 bg-gray-800 shadow-lg">
          <Link to="/fitness" className="text-lg font-bold hover:text-blue-400">
            🏋️ Fitness Coach
          </Link>
          <Link to="/meals" className="text-lg font-bold hover:text-green-400">
            🍽️ Meal Planner
          </Link>
        </nav>
        <Routes>
          <Route path="/fitness" element={<FitnessCoach />} />
          <Route path="/meals" element={<MealPlanner />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
