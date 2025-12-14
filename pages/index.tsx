import { useState, useEffect } from "react";
import IngredientTag from "../components/IngredientTag";
import MealCard from "../components/MealCard";

const recipes = [
  { name: "Salad 🥗", image: "/images/salad.jpg" },
  { name: "Stir Fry 🍳", image: "/images/stir-fry.jpg" },
  { name: "Soup 🍲", image: "/images/soup.jpg" },
  { name: "Pasta 🍝", image: "/images/pasta.jpg" },
  { name: "Sandwich 🥪", image: "/images/sandwich.jpg" },
  { name: "Smoothie 🍹", image: "/images/smoothie.jpg" },
  { name: "Curry 🍛", image: "/images/curry.jpg" },
  { name: "Wrap 🌯", image: "/images/wrap.jpg" },
];

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [suggestedMeal, setSuggestedMeal] = useState(recipes[0]);

  // Load from localStorage
  useEffect(() => {
    const savedIngredients = localStorage.getItem("ingredients");
    const savedFavorites = localStorage.getItem("favorites");
    if (savedIngredients) setIngredients(JSON.parse(savedIngredients));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save ingredients & favorites
  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add ingredient
  const addIngredient = () => {
    const trimmed = ingredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setIngredient("");
    }
  };

  // Remove ingredient
  const removeIngredient = (item: string) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  // Suggest random meal
  const suggestMeal = () => {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    setSuggestedMeal(recipes[randomIndex]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to MealMate 🍽️</h1>

      {/* Ingredient Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Add ingredient..."
          className="border px-3 py-2 rounded flex-1"
        />
        <button
          onClick={addIngredient}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      {/* Ingredient Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ingredients.map((ing) => (
          <IngredientTag
            key={ing}
            name={ing}
            onRemove={() => removeIngredient(ing)}
          />
        ))}
      </div>

      {/* Suggest Meal Button */}
      <button
        onClick={suggestMeal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
      >
        Suggest a Meal
      </button>

      {/* Suggested Meal */}
      {suggestedMeal && (
        <MealCard
          name={suggestedMeal.name}
          image={suggestedMeal.image}
          onRemove={() => alert("You can implement favorite/remove logic here")}
        />
      )}
    </div>
  );
}