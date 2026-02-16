export interface SymptomEntry {
  id: string;
  timestamp: string;
  symptoms: Symptom[];
  overallSeverity: number; // 1-10
  notes: string;
}

export interface Symptom {
  name: string;
  severity: number; // 1-10
  category: SymptomCategory;
}

export type SymptomCategory =
  | "digestive"
  | "energy"
  | "skin"
  | "mood"
  | "pain"
  | "other";

export interface MealEntry {
  id: string;
  timestamp: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  foods: FoodItem[];
  notes: string;
}

export interface FoodItem {
  name: string;
  category: FoodCategory;
  fodmapRating: "low" | "moderate" | "high";
  inflammatoryScore: number; // -10 (anti-inflammatory) to +10 (inflammatory)
}

export type FoodCategory =
  | "protein"
  | "vegetable"
  | "fruit"
  | "grain"
  | "dairy"
  | "fat"
  | "legume"
  | "fermented"
  | "processed"
  | "beverage";

export interface Correlation {
  food: string;
  symptom: string;
  strength: number; // 0-1
  direction: "triggers" | "helps";
  confidence: number; // 0-1
  occurrences: number;
}

export interface GutScore {
  overall: number; // 0-100
  diversity: number;
  inflammation: number;
  regularity: number;
  energy: number;
  trend: "improving" | "stable" | "declining";
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  days: MealPlanDay[];
  targetSymptoms: string[];
  eliminatedFoods: string[];
  phase: "elimination" | "reintroduction" | "maintenance";
}

export interface MealPlanDay {
  day: number;
  meals: PlannedMeal[];
}

export interface PlannedMeal {
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  ingredients: string[];
  gutBenefits: string[];
  prepTime: number;
  calories: number;
}

export interface UserProfile {
  name: string;
  conditions: string[];
  dietaryRestrictions: string[];
  goals: string[];
  startDate: string;
}

export interface InsightReport {
  generatedAt: string;
  topTriggers: Correlation[];
  topHelpers: Correlation[];
  gutScore: GutScore;
  recommendations: string[];
  weeklyTrend: { date: string; score: number }[];
}
