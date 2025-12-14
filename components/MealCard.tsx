interface MealCardProps {
  ingredient: string;
  removeIngredient: (ingredient: string) => void;
  addToFavorites: (meal: string) => void;
}

export default function MealCard({ ingredient, removeIngredient, addToFavorites }: MealCardProps) {
  const mealName = `${ingredient} Stir Fry 🍳`;

  return (
    <li className="bg-white shadow-md rounded p-4 mb-2 flex justify-between items-center">
      <span className="font-medium">{mealName}</span>
      <div className="flex gap-2">
        <button
          onClick={() => addToFavorites(mealName)}
          className="text-yellow-500 hover:text-yellow-700"
        >
          ⭐
        </button>
        <button
          onClick={() => removeIngredient(ingredient)}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>
    </li>
  );
} 