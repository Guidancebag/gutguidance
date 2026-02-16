import { FoodItem, FoodCategory } from "./types";

interface FoodData {
  category: FoodCategory;
  fodmapRating: "low" | "moderate" | "high";
  inflammatoryScore: number;
}

const FOOD_DATABASE: Record<string, FoodData> = {
  // Proteins
  "chicken breast": { category: "protein", fodmapRating: "low", inflammatoryScore: -1 },
  "salmon": { category: "protein", fodmapRating: "low", inflammatoryScore: -8 },
  "eggs": { category: "protein", fodmapRating: "low", inflammatoryScore: -2 },
  "turkey": { category: "protein", fodmapRating: "low", inflammatoryScore: -2 },
  "beef": { category: "protein", fodmapRating: "low", inflammatoryScore: 2 },
  "tofu": { category: "protein", fodmapRating: "moderate", inflammatoryScore: -3 },
  "shrimp": { category: "protein", fodmapRating: "low", inflammatoryScore: -2 },
  "cod": { category: "protein", fodmapRating: "low", inflammatoryScore: -4 },

  // Vegetables
  "spinach": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -7 },
  "kale": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -8 },
  "broccoli": { category: "vegetable", fodmapRating: "moderate", inflammatoryScore: -6 },
  "carrots": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -5 },
  "sweet potato": { category: "vegetable", fodmapRating: "moderate", inflammatoryScore: -4 },
  "zucchini": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -4 },
  "bell pepper": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -5 },
  "cucumber": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -3 },
  "garlic": { category: "vegetable", fodmapRating: "high", inflammatoryScore: -7 },
  "onion": { category: "vegetable", fodmapRating: "high", inflammatoryScore: -4 },
  "cauliflower": { category: "vegetable", fodmapRating: "high", inflammatoryScore: -5 },
  "asparagus": { category: "vegetable", fodmapRating: "high", inflammatoryScore: -6 },
  "tomato": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -3 },
  "lettuce": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -2 },

  // Fruits
  "blueberries": { category: "fruit", fodmapRating: "low", inflammatoryScore: -9 },
  "banana": { category: "fruit", fodmapRating: "low", inflammatoryScore: -3 },
  "apple": { category: "fruit", fodmapRating: "high", inflammatoryScore: -4 },
  "strawberries": { category: "fruit", fodmapRating: "low", inflammatoryScore: -6 },
  "avocado": { category: "fruit", fodmapRating: "moderate", inflammatoryScore: -7 },
  "mango": { category: "fruit", fodmapRating: "high", inflammatoryScore: -3 },
  "orange": { category: "fruit", fodmapRating: "low", inflammatoryScore: -5 },
  "grapes": { category: "fruit", fodmapRating: "low", inflammatoryScore: -4 },
  "pineapple": { category: "fruit", fodmapRating: "low", inflammatoryScore: -5 },
  "watermelon": { category: "fruit", fodmapRating: "high", inflammatoryScore: -2 },

  // Grains
  "rice": { category: "grain", fodmapRating: "low", inflammatoryScore: -1 },
  "oats": { category: "grain", fodmapRating: "moderate", inflammatoryScore: -3 },
  "quinoa": { category: "grain", fodmapRating: "low", inflammatoryScore: -4 },
  "white bread": { category: "grain", fodmapRating: "moderate", inflammatoryScore: 5 },
  "whole wheat bread": { category: "grain", fodmapRating: "high", inflammatoryScore: 3 },
  "pasta": { category: "grain", fodmapRating: "moderate", inflammatoryScore: 3 },
  "corn": { category: "grain", fodmapRating: "low", inflammatoryScore: 1 },

  // Dairy
  "milk": { category: "dairy", fodmapRating: "high", inflammatoryScore: 3 },
  "yogurt": { category: "dairy", fodmapRating: "moderate", inflammatoryScore: -2 },
  "cheese": { category: "dairy", fodmapRating: "moderate", inflammatoryScore: 2 },
  "butter": { category: "dairy", fodmapRating: "low", inflammatoryScore: 1 },
  "cream": { category: "dairy", fodmapRating: "moderate", inflammatoryScore: 3 },
  "ice cream": { category: "dairy", fodmapRating: "high", inflammatoryScore: 6 },

  // Fats
  "olive oil": { category: "fat", fodmapRating: "low", inflammatoryScore: -8 },
  "coconut oil": { category: "fat", fodmapRating: "low", inflammatoryScore: -3 },
  "almonds": { category: "fat", fodmapRating: "moderate", inflammatoryScore: -5 },
  "walnuts": { category: "fat", fodmapRating: "low", inflammatoryScore: -7 },
  "flaxseed": { category: "fat", fodmapRating: "low", inflammatoryScore: -7 },
  "chia seeds": { category: "fat", fodmapRating: "low", inflammatoryScore: -6 },

  // Legumes
  "lentils": { category: "legume", fodmapRating: "high", inflammatoryScore: -4 },
  "chickpeas": { category: "legume", fodmapRating: "high", inflammatoryScore: -3 },
  "black beans": { category: "legume", fodmapRating: "high", inflammatoryScore: -4 },

  // Fermented
  "kimchi": { category: "fermented", fodmapRating: "moderate", inflammatoryScore: -8 },
  "sauerkraut": { category: "fermented", fodmapRating: "moderate", inflammatoryScore: -7 },
  "kefir": { category: "fermented", fodmapRating: "moderate", inflammatoryScore: -6 },
  "kombucha": { category: "fermented", fodmapRating: "moderate", inflammatoryScore: -5 },
  "miso": { category: "fermented", fodmapRating: "moderate", inflammatoryScore: -6 },

  // Processed
  "french fries": { category: "processed", fodmapRating: "low", inflammatoryScore: 7 },
  "pizza": { category: "processed", fodmapRating: "high", inflammatoryScore: 7 },
  "chips": { category: "processed", fodmapRating: "moderate", inflammatoryScore: 6 },
  "candy": { category: "processed", fodmapRating: "high", inflammatoryScore: 8 },
  "soda": { category: "beverage", fodmapRating: "high", inflammatoryScore: 8 },
  "hot dog": { category: "processed", fodmapRating: "moderate", inflammatoryScore: 7 },

  // Beverages
  "coffee": { category: "beverage", fodmapRating: "low", inflammatoryScore: -3 },
  "green tea": { category: "beverage", fodmapRating: "low", inflammatoryScore: -7 },
  "water": { category: "beverage", fodmapRating: "low", inflammatoryScore: -1 },
  "alcohol": { category: "beverage", fodmapRating: "moderate", inflammatoryScore: 6 },
  "bone broth": { category: "beverage", fodmapRating: "low", inflammatoryScore: -6 },

  // Spices / condiments
  "ginger": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -8 },
  "turmeric": { category: "vegetable", fodmapRating: "low", inflammatoryScore: -9 },
};

export function lookupFood(name: string): FoodItem {
  const key = name.toLowerCase().trim();
  const data = FOOD_DATABASE[key];
  if (data) {
    return { name, ...data };
  }
  return {
    name,
    category: "other" as FoodCategory,
    fodmapRating: "moderate",
    inflammatoryScore: 0,
  };
}

export function searchFoods(query: string): string[] {
  const q = query.toLowerCase().trim();
  return Object.keys(FOOD_DATABASE).filter((name) => name.includes(q));
}

export function getAllFoods(): string[] {
  return Object.keys(FOOD_DATABASE).sort();
}

export function getFoodsByCategory(category: FoodCategory): string[] {
  return Object.entries(FOOD_DATABASE)
    .filter(([, data]) => data.category === category)
    .map(([name]) => name)
    .sort();
}
