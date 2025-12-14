interface IngredientTagProps {
  name: string;
  onRemove?: () => void;
}

export default function IngredientTag({ name, onRemove }: IngredientTagProps) {
  return (
    <span
      onClick={onRemove}
      className="bg-green-200 text-green-800 px-3 py-1 rounded-full cursor-pointer hover:bg-green-300"
    >
      {name} {onRemove && "✕"}
    </span>
  );
}