import { useState } from "react";
import axios from "axios";
import MealCard from "../components/MealCard";

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = async () => {
    if (!ingredient) return;
    try {
      const res = await axios.post("/api/addIngredient", { ingredient });
      setIngredients(res.data.ingredients);
      setIngredient("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
        MealMate
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Add ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="border rounded-l px-3 py-2 w-64 focus:outline-none"
        />
        <button
          onClick={addIngredient}
          className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <div className="max-w-md mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Ingredients:</h2>
        <ul className="list-disc list-inside">
          {ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </div>

      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">Meal Suggestions:</h2>
        {ingredients.length === 0 ? (
          <p className="text-gray-500">Add ingredients to see suggestions.</p>
        ) : (
          ingredients.map((ing, idx) => <MealCard key={idx} ingredient={ing} />)
        )}
      </div>
    </div>
  );
}