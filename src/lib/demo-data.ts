import { SymptomEntry, MealEntry, UserProfile } from "./types";
import { lookupFood } from "./food-database";

export const DEMO_PROFILE: UserProfile = {
  name: "Demo User",
  conditions: ["IBS-Mixed", "Suspected SIBO"],
  dietaryRestrictions: ["Lactose intolerant"],
  goals: [
    "Identify trigger foods",
    "Reduce bloating",
    "Improve energy after meals",
  ],
  startDate: "2026-01-15",
};

function daysAgo(days: number, hour: number = 12): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const DEMO_MEALS: MealEntry[] = [
  // Day 1
  {
    id: "m1",
    timestamp: daysAgo(6, 8),
    mealType: "breakfast",
    foods: [lookupFood("oats"), lookupFood("milk"), lookupFood("banana"), lookupFood("honey")],
    notes: "Regular breakfast",
  },
  {
    id: "m2",
    timestamp: daysAgo(6, 13),
    mealType: "lunch",
    foods: [lookupFood("whole wheat bread"), lookupFood("cheese"), lookupFood("tomato"), lookupFood("lettuce")],
    notes: "Grilled cheese sandwich",
  },
  {
    id: "m3",
    timestamp: daysAgo(6, 19),
    mealType: "dinner",
    foods: [lookupFood("pasta"), lookupFood("garlic"), lookupFood("onion"), lookupFood("beef"), lookupFood("tomato")],
    notes: "Bolognese",
  },
  // Day 2
  {
    id: "m4",
    timestamp: daysAgo(5, 8),
    mealType: "breakfast",
    foods: [lookupFood("eggs"), lookupFood("spinach"), lookupFood("olive oil")],
    notes: "Simple scramble",
  },
  {
    id: "m5",
    timestamp: daysAgo(5, 13),
    mealType: "lunch",
    foods: [lookupFood("salmon"), lookupFood("rice"), lookupFood("avocado"), lookupFood("cucumber")],
    notes: "Poke bowl",
  },
  {
    id: "m6",
    timestamp: daysAgo(5, 19),
    mealType: "dinner",
    foods: [lookupFood("chicken breast"), lookupFood("sweet potato"), lookupFood("kale"), lookupFood("olive oil")],
    notes: "Roasted chicken dinner",
  },
  // Day 3
  {
    id: "m7",
    timestamp: daysAgo(4, 8),
    mealType: "breakfast",
    foods: [lookupFood("yogurt"), lookupFood("blueberries"), lookupFood("almonds")],
    notes: "Yogurt parfait",
  },
  {
    id: "m8",
    timestamp: daysAgo(4, 13),
    mealType: "lunch",
    foods: [lookupFood("pizza"), lookupFood("soda")],
    notes: "Quick pizza lunch",
  },
  {
    id: "m9",
    timestamp: daysAgo(4, 19),
    mealType: "dinner",
    foods: [lookupFood("chicken breast"), lookupFood("garlic"), lookupFood("onion"), lookupFood("rice"), lookupFood("broccoli")],
    notes: "Garlic chicken stir fry",
  },
  // Day 4
  {
    id: "m10",
    timestamp: daysAgo(3, 8),
    mealType: "breakfast",
    foods: [lookupFood("eggs"), lookupFood("avocado"), lookupFood("rice")],
    notes: "Avocado rice bowl",
  },
  {
    id: "m11",
    timestamp: daysAgo(3, 13),
    mealType: "lunch",
    foods: [lookupFood("turkey"), lookupFood("lettuce"), lookupFood("carrots"), lookupFood("bell pepper")],
    notes: "Turkey lettuce wraps",
  },
  {
    id: "m12",
    timestamp: daysAgo(3, 19),
    mealType: "dinner",
    foods: [lookupFood("salmon"), lookupFood("quinoa"), lookupFood("spinach"), lookupFood("olive oil"), lookupFood("lemon")],
    notes: "Salmon quinoa bowl",
  },
  // Day 5
  {
    id: "m13",
    timestamp: daysAgo(2, 8),
    mealType: "breakfast",
    foods: [lookupFood("oats"), lookupFood("milk"), lookupFood("apple")],
    notes: "Oatmeal with apple",
  },
  {
    id: "m14",
    timestamp: daysAgo(2, 13),
    mealType: "lunch",
    foods: [lookupFood("lentils"), lookupFood("garlic"), lookupFood("onion"), lookupFood("carrots"), lookupFood("tomato")],
    notes: "Lentil soup",
  },
  {
    id: "m15",
    timestamp: daysAgo(2, 19),
    mealType: "dinner",
    foods: [lookupFood("ice cream"), lookupFood("candy")],
    notes: "Cheat night",
  },
  // Day 6
  {
    id: "m16",
    timestamp: daysAgo(1, 8),
    mealType: "breakfast",
    foods: [lookupFood("eggs"), lookupFood("spinach"), lookupFood("turmeric"), lookupFood("olive oil")],
    notes: "Turmeric eggs",
  },
  {
    id: "m17",
    timestamp: daysAgo(1, 13),
    mealType: "lunch",
    foods: [lookupFood("chicken breast"), lookupFood("rice"), lookupFood("cucumber"), lookupFood("carrots")],
    notes: "Simple chicken rice",
  },
  {
    id: "m18",
    timestamp: daysAgo(1, 19),
    mealType: "dinner",
    foods: [lookupFood("cod"), lookupFood("sweet potato"), lookupFood("zucchini"), lookupFood("olive oil")],
    notes: "Baked cod dinner",
  },
  // Today
  {
    id: "m19",
    timestamp: daysAgo(0, 8),
    mealType: "breakfast",
    foods: [lookupFood("banana"), lookupFood("chia seeds"), lookupFood("almond butter"), lookupFood("green tea")],
    notes: "Light healthy start",
  },
];

export const DEMO_SYMPTOMS: SymptomEntry[] = [
  // Day 1 - ate dairy, gluten, garlic, onion -> bad symptoms
  {
    id: "s1",
    timestamp: daysAgo(6, 15),
    symptoms: [
      { name: "Bloating", severity: 7, category: "digestive" },
      { name: "Gas", severity: 6, category: "digestive" },
      { name: "Brain fog", severity: 5, category: "mood" },
    ],
    overallSeverity: 7,
    notes: "Started after lunch with cheese",
  },
  {
    id: "s2",
    timestamp: daysAgo(6, 21),
    symptoms: [
      { name: "Bloating", severity: 8, category: "digestive" },
      { name: "Abdominal pain", severity: 6, category: "pain" },
      { name: "Fatigue", severity: 7, category: "energy" },
    ],
    overallSeverity: 8,
    notes: "Very uncomfortable after pasta with garlic",
  },
  // Day 2 - clean eating -> minimal symptoms
  {
    id: "s3",
    timestamp: daysAgo(5, 16),
    symptoms: [
      { name: "Mild bloating", severity: 2, category: "digestive" },
    ],
    overallSeverity: 2,
    notes: "Felt great today, clean eating",
  },
  // Day 3 - pizza + soda + garlic dinner -> bad
  {
    id: "s4",
    timestamp: daysAgo(4, 15),
    symptoms: [
      { name: "Bloating", severity: 8, category: "digestive" },
      { name: "Nausea", severity: 5, category: "digestive" },
      { name: "Fatigue", severity: 6, category: "energy" },
    ],
    overallSeverity: 7,
    notes: "Pizza was a bad idea",
  },
  {
    id: "s5",
    timestamp: daysAgo(4, 22),
    symptoms: [
      { name: "Bloating", severity: 7, category: "digestive" },
      { name: "Gas", severity: 8, category: "digestive" },
      { name: "Abdominal pain", severity: 5, category: "pain" },
    ],
    overallSeverity: 7,
    notes: "Garlic dinner made it worse",
  },
  // Day 4 - clean eating -> better
  {
    id: "s6",
    timestamp: daysAgo(3, 15),
    symptoms: [
      { name: "Mild bloating", severity: 2, category: "digestive" },
    ],
    overallSeverity: 2,
    notes: "Much better with simple foods",
  },
  // Day 5 - lentils + garlic + ice cream -> terrible
  {
    id: "s7",
    timestamp: daysAgo(2, 16),
    symptoms: [
      { name: "Bloating", severity: 9, category: "digestive" },
      { name: "Gas", severity: 8, category: "digestive" },
      { name: "Abdominal pain", severity: 7, category: "pain" },
      { name: "Diarrhea", severity: 6, category: "digestive" },
    ],
    overallSeverity: 9,
    notes: "Lentil soup with garlic was really bad",
  },
  {
    id: "s8",
    timestamp: daysAgo(2, 22),
    symptoms: [
      { name: "Bloating", severity: 8, category: "digestive" },
      { name: "Nausea", severity: 6, category: "digestive" },
      { name: "Skin rash", severity: 4, category: "skin" },
      { name: "Fatigue", severity: 8, category: "energy" },
    ],
    overallSeverity: 8,
    notes: "Ice cream + candy cheat night - terrible",
  },
  // Day 6 - anti-inflammatory clean -> great
  {
    id: "s9",
    timestamp: daysAgo(1, 14),
    symptoms: [
      { name: "Mild bloating", severity: 1, category: "digestive" },
    ],
    overallSeverity: 1,
    notes: "Feeling amazing, turmeric eggs were great",
  },
  // Today
  {
    id: "s10",
    timestamp: daysAgo(0, 10),
    symptoms: [
      { name: "Good energy", severity: 1, category: "energy" },
    ],
    overallSeverity: 1,
    notes: "Great morning, light breakfast",
  },
];

export function getHumanReadableDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}
