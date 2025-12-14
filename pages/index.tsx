import { useState, useEffect } from "react";
import axios from "axios";
import MealCard from "../components/MealCard";

// Predefined meal types
const recipes = [
  "Salad 🥗",
  "Stir Fry 🍳",
  "Soup 🍲",
  "Pasta 🍝",
  "Sandwich 🥪",
  "Smoothie 🍹",
  "Curry 🍛",
  "Wrap 🌯",
];

export default function Home() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

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
  const addIngredient = async () => {
    const trimmed = ingredient