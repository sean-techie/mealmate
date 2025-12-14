interface MealCardProps {
  name: string;
  image: string;
  onRemove?: () => void;
}

export default function MealCard({ name, image, onRemove }: MealCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow p-4 relative">
      <img src={image} alt={name} className="w-full h-40 object-cover"/>
      <h3 className="font-bold text-lg mt-2">{name}</h3>
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      )}
    </div>
  );
}