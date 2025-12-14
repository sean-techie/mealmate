import { useState } from "react";
import axios from "axios";
import MealCard from "../components/MealCard";

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Add ingredient
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

  // Delete ingredient from list
  const removeIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  // Add meal to favorites
  const addToFavorites = (meal: string) => {
    if (!favorites.includes(meal)) {
      setFavorites((prev) => [...prev, meal]);
    }
  };

  // Generate random meal suggestion
  const generateRandomMeal = () => {
    if (ingredients.length === 0) return "";
    const randomIndex = Math.floor(Math.random() * ingredients.length);
    return `${ingredients[randomIndex]} Stir Fry 🍳`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
        MealMate
      </h1>

      {/* Input */}
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

      {/* Ingredients List */}
      <div className="max-w-md mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Ingredients:</h2>
        <ul className="list-disc list-inside">
          {ingredients.map((ing) => (
            <MealCard
              key={ing}
              ingredient={ing}
              removeIngredient={removeIngredient}
              addToFavorites={addToFavorites}
            />
          ))}
        </ul>
      </div>

      {/* Random Meal Generator */}
      <div className="max-w-md mx-auto text-center mb-6">
        <button
          onClick={() => alert(generateRandomMeal())}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Random Meal
        </button>
      </div>

      {/* Favorites */}
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">Favorites:</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite meals yet.</p>
        ) : (
          <ul className="list-disc list-inside">
            {favorites.map((meal, idx) => (
              <li key={idx}>{meal}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}