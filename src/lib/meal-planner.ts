import { MealPlan, PlannedMeal, Correlation } from "./types";
import { v4 as uuidv4 } from "uuid";

interface MealTemplate {
  name: string;
  ingredients: string[];
  gutBenefits: string[];
  prepTime: number;
  calories: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  avoids: string[]; // foods this recipe avoids
}

const MEAL_TEMPLATES: MealTemplate[] = [
  // Breakfasts
  {
    name: "Anti-Inflammatory Berry Bowl",
    ingredients: ["blueberries", "strawberries", "chia seeds", "coconut yogurt", "walnuts", "honey"],
    gutBenefits: ["Rich in polyphenols", "Prebiotic fiber from chia", "Omega-3 from walnuts"],
    prepTime: 5,
    calories: 380,
    mealType: "breakfast",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Gut-Healing Bone Broth Eggs",
    ingredients: ["eggs", "bone broth", "spinach", "turmeric", "olive oil", "rice"],
    gutBenefits: ["Collagen from bone broth", "L-glutamine for gut lining", "Anti-inflammatory turmeric"],
    prepTime: 15,
    calories: 420,
    mealType: "breakfast",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Overnight Oat Jar",
    ingredients: ["oats", "banana", "almond milk", "flaxseed", "cinnamon", "maple syrup"],
    gutBenefits: ["Beta-glucan fiber", "Resistant starch from oats", "Prebiotic fiber"],
    prepTime: 5,
    calories: 350,
    mealType: "breakfast",
    avoids: ["dairy", "garlic", "onion"],
  },
  {
    name: "Green Smoothie Power Start",
    ingredients: ["spinach", "banana", "ginger", "almond milk", "chia seeds", "blueberries"],
    gutBenefits: ["Digestive support from ginger", "Fiber-rich greens", "Prebiotic chia"],
    prepTime: 5,
    calories: 310,
    mealType: "breakfast",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },

  // Lunches
  {
    name: "Salmon Quinoa Power Bowl",
    ingredients: ["salmon", "quinoa", "avocado", "cucumber", "carrots", "ginger", "olive oil"],
    gutBenefits: ["Omega-3 fatty acids", "Complete protein quinoa", "Anti-inflammatory ginger"],
    prepTime: 25,
    calories: 580,
    mealType: "lunch",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Turkey Lettuce Wraps",
    ingredients: ["turkey", "lettuce", "carrots", "bell pepper", "rice", "ginger", "sesame oil"],
    gutBenefits: ["Low-FODMAP", "Lean protein", "Ginger aids digestion"],
    prepTime: 20,
    calories: 420,
    mealType: "lunch",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Mediterranean Chicken Bowl",
    ingredients: ["chicken breast", "rice", "cucumber", "tomato", "olive oil", "lemon", "herbs"],
    gutBenefits: ["Anti-inflammatory olive oil", "Lean protein", "Low-FODMAP friendly"],
    prepTime: 25,
    calories: 520,
    mealType: "lunch",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Miso Soup with Tofu & Greens",
    ingredients: ["miso", "tofu", "spinach", "rice noodles", "ginger", "green onion tops"],
    gutBenefits: ["Fermented miso probiotics", "Plant protein", "Warming & soothing"],
    prepTime: 15,
    calories: 320,
    mealType: "lunch",
    avoids: ["dairy", "garlic"],
  },

  // Dinners
  {
    name: "Herb-Crusted Cod with Sweet Potato",
    ingredients: ["cod", "sweet potato", "zucchini", "olive oil", "lemon", "dill", "parsley"],
    gutBenefits: ["Lean omega-3 protein", "Prebiotic sweet potato fiber", "Anti-inflammatory herbs"],
    prepTime: 30,
    calories: 480,
    mealType: "dinner",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Chicken & Vegetable Stir-Fry",
    ingredients: ["chicken breast", "bell pepper", "zucchini", "carrots", "rice", "ginger", "coconut aminos"],
    gutBenefits: ["Ginger for digestion", "Colorful vegetable diversity", "Low-FODMAP"],
    prepTime: 20,
    calories: 520,
    mealType: "dinner",
    avoids: ["dairy", "gluten", "garlic", "onion", "soy"],
  },
  {
    name: "Turmeric Salmon with Roasted Vegetables",
    ingredients: ["salmon", "turmeric", "carrots", "bell pepper", "olive oil", "lemon", "rice"],
    gutBenefits: ["Double anti-inflammatory (turmeric + omega-3)", "Gut-healing fats", "Fiber from vegetables"],
    prepTime: 30,
    calories: 560,
    mealType: "dinner",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Slow-Cooked Bone Broth Stew",
    ingredients: ["beef", "bone broth", "carrots", "zucchini", "sweet potato", "herbs", "olive oil"],
    gutBenefits: ["Collagen-rich broth", "L-glutamine for gut repair", "Root vegetable prebiotics"],
    prepTime: 45,
    calories: 520,
    mealType: "dinner",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },

  // Snacks
  {
    name: "Gut-Friendly Trail Mix",
    ingredients: ["walnuts", "pumpkin seeds", "dark chocolate", "coconut flakes", "blueberries"],
    gutBenefits: ["Omega-3 from walnuts", "Zinc from pumpkin seeds", "Polyphenols from dark chocolate"],
    prepTime: 2,
    calories: 220,
    mealType: "snack",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Ginger-Turmeric Latte",
    ingredients: ["ginger", "turmeric", "coconut milk", "black pepper", "honey"],
    gutBenefits: ["Anti-inflammatory", "Digestive support", "Warming & soothing"],
    prepTime: 5,
    calories: 120,
    mealType: "snack",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
  {
    name: "Fermented Veggie Plate",
    ingredients: ["kimchi", "sauerkraut", "carrots", "cucumber", "rice crackers"],
    gutBenefits: ["Live probiotic cultures", "Prebiotic fiber", "Microbiome diversity"],
    prepTime: 3,
    calories: 150,
    mealType: "snack",
    avoids: ["dairy", "gluten"],
  },
  {
    name: "Banana & Almond Butter Bites",
    ingredients: ["banana", "almond butter", "chia seeds", "cinnamon"],
    gutBenefits: ["Prebiotic banana fiber", "Healthy fats", "Fiber from chia"],
    prepTime: 3,
    calories: 200,
    mealType: "snack",
    avoids: ["dairy", "gluten", "garlic", "onion"],
  },
];

export function generateMealPlan(
  triggers: Correlation[],
  daysCount: number = 7,
  phase: "elimination" | "reintroduction" | "maintenance" = "elimination"
): MealPlan {
  const triggerFoods = triggers
    .filter((c) => c.direction === "triggers" && c.confidence > 0.3)
    .map((c) => c.food.toLowerCase());

  // Filter out meals that contain trigger foods
  const safeMeals = MEAL_TEMPLATES.filter(
    (meal) =>
      !meal.ingredients.some((ingredient) =>
        triggerFoods.some(
          (trigger) =>
            ingredient.toLowerCase().includes(trigger) ||
            trigger.includes(ingredient.toLowerCase())
        )
      )
  );

  const breakfasts = safeMeals.filter((m) => m.mealType === "breakfast");
  const lunches = safeMeals.filter((m) => m.mealType === "lunch");
  const dinners = safeMeals.filter((m) => m.mealType === "dinner");
  const snacks = safeMeals.filter((m) => m.mealType === "snack");

  const days = [];
  for (let day = 1; day <= daysCount; day++) {
    const dayMeals: PlannedMeal[] = [];

    const pickRandom = (arr: MealTemplate[]): MealTemplate =>
      arr[Math.floor(Math.random() * arr.length)] || MEAL_TEMPLATES[0];

    const addMeal = (template: MealTemplate) => {
      dayMeals.push({
        mealType: template.mealType,
        name: template.name,
        ingredients: template.ingredients,
        gutBenefits: template.gutBenefits,
        prepTime: template.prepTime,
        calories: template.calories,
      });
    };

    addMeal(pickRandom(breakfasts));
    addMeal(pickRandom(lunches));
    addMeal(pickRandom(dinners));
    addMeal(pickRandom(snacks));

    days.push({ day, meals: dayMeals });
  }

  const targetSymptoms = [...new Set(triggers.map((t) => t.symptom))];

  return {
    id: uuidv4(),
    name:
      phase === "elimination"
        ? "Personalized Elimination Protocol"
        : phase === "reintroduction"
          ? "Guided Reintroduction Plan"
          : "Optimized Maintenance Plan",
    description:
      phase === "elimination"
        ? `A ${daysCount}-day plan that eliminates your identified trigger foods while maximizing gut-healing nutrients. Focus on anti-inflammatory, low-FODMAP meals rich in prebiotic fiber.`
        : phase === "reintroduction"
          ? `Systematically reintroduce eliminated foods one at a time over ${daysCount} days while monitoring symptom responses.`
          : `A balanced long-term eating plan optimized for your unique gut profile.`,
    days,
    targetSymptoms,
    eliminatedFoods: triggerFoods,
    phase,
  };
}
