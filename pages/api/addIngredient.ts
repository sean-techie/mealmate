import type { NextApiRequest, NextApiResponse } from "next";

// Simple in-memory storage for ingredients
let ingredients: string[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { ingredient } = req.body;

    if (!ingredient || typeof ingredient !== "string") {
      return res.status(400).json({ error: "Invalid ingredient" });
    }

    if (!ingredients.includes(ingredient)) {
      ingredients.push(ingredient);
    }

    return res.status(200).json({ ingredients });
  }

  return res.status(405).json({ error: "Method not allowed" });
}