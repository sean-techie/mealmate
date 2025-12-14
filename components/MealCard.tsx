interface MealCardProps {
  ingredient: string;
}

export default function MealCard({ ingredient }: MealCardProps) {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-2 flex justify-between items-center">
      <span className="font-medium">{ingredient} Stir Fry 🍳</span>
      <button className="text-red-500 hover:text-red-700">❌</button>
    </div>
  );
}