import {
  SymptomEntry,
  MealEntry,
  Correlation,
  GutScore,
  InsightReport,
} from "./types";
import { lookupFood } from "./food-database";

/**
 * Core correlation engine: finds statistical relationships between
 * foods consumed and symptoms reported within a time window.
 */
export function findCorrelations(
  meals: MealEntry[],
  symptoms: SymptomEntry[],
  windowHours: number = 24
): Correlation[] {
  const correlations: Map<string, { total: number; coOccur: number; severitySum: number }> = new Map();

  for (const symptomEntry of symptoms) {
    const symptomTime = new Date(symptomEntry.timestamp).getTime();

    // Find meals consumed within the time window before this symptom
    const relevantMeals = meals.filter((meal) => {
      const mealTime = new Date(meal.timestamp).getTime();
      const hoursDiff = (symptomTime - mealTime) / (1000 * 60 * 60);
      return hoursDiff >= 0 && hoursDiff <= windowHours;
    });

    for (const symptom of symptomEntry.symptoms) {
      // Track all foods eaten before this symptom
      for (const meal of relevantMeals) {
        for (const food of meal.foods) {
          const key = `${food.name}|||${symptom.name}`;
          const existing = correlations.get(key) || { total: 0, coOccur: 0, severitySum: 0 };
          existing.coOccur += 1;
          existing.severitySum += symptom.severity;
          correlations.set(key, existing);
        }
      }
    }
  }

  // Count total occurrences of each food
  const foodCounts: Map<string, number> = new Map();
  for (const meal of meals) {
    for (const food of meal.foods) {
      foodCounts.set(food.name, (foodCounts.get(food.name) || 0) + 1);
    }
  }

  // Build correlation objects
  const results: Correlation[] = [];
  for (const [key, data] of correlations) {
    const [food, symptom] = key.split("|||");
    const totalFoodOccurrences = foodCounts.get(food) || 1;
    const coOccurrenceRate = data.coOccur / totalFoodOccurrences;
    const avgSeverity = data.severitySum / data.coOccur;

    if (data.coOccur >= 2) {
      const foodData = lookupFood(food);
      const isHelping = foodData.inflammatoryScore < -3 && avgSeverity < 4;

      results.push({
        food,
        symptom,
        strength: Math.min(coOccurrenceRate, 1),
        direction: isHelping ? "helps" : "triggers",
        confidence: Math.min(data.coOccur / 10, 1),
        occurrences: data.coOccur,
      });
    }
  }

  return results.sort((a, b) => b.strength * b.confidence - a.strength * a.confidence);
}

/**
 * Calculate a composite gut health score based on recent data.
 */
export function calculateGutScore(
  symptoms: SymptomEntry[],
  meals: MealEntry[],
  daysWindow: number = 7
): GutScore {
  const now = new Date().getTime();
  const cutoff = now - daysWindow * 24 * 60 * 60 * 1000;

  const recentSymptoms = symptoms.filter(
    (s) => new Date(s.timestamp).getTime() >= cutoff
  );
  const recentMeals = meals.filter(
    (m) => new Date(m.timestamp).getTime() >= cutoff
  );

  // Symptom severity score (inverted - lower severity = higher score)
  const avgSeverity =
    recentSymptoms.length > 0
      ? recentSymptoms.reduce((sum, s) => sum + s.overallSeverity, 0) /
        recentSymptoms.length
      : 5;
  const symptomScore = Math.max(0, Math.min(100, (10 - avgSeverity) * 10));

  // Diet quality score based on inflammatory scores
  let inflammatorySum = 0;
  let foodCount = 0;
  const uniqueFoods = new Set<string>();
  for (const meal of recentMeals) {
    for (const food of meal.foods) {
      const data = lookupFood(food.name);
      inflammatorySum += data.inflammatoryScore;
      foodCount++;
      uniqueFoods.add(food.name.toLowerCase());
    }
  }
  const avgInflammatory = foodCount > 0 ? inflammatorySum / foodCount : 0;
  const inflammationScore = Math.max(
    0,
    Math.min(100, 50 - avgInflammatory * 5)
  );

  // Diversity score
  const diversityScore = Math.min(100, uniqueFoods.size * 5);

  // Regularity score (meals per day consistency)
  const mealsPerDay = recentMeals.length / Math.max(daysWindow, 1);
  const regularityScore = Math.min(100, (mealsPerDay / 3) * 100);

  // Energy score (inverse of energy-related symptoms)
  const energySymptoms = recentSymptoms.filter((s) =>
    s.symptoms.some((sym) => sym.category === "energy")
  );
  const avgEnergySeverity =
    energySymptoms.length > 0
      ? energySymptoms.reduce((sum, s) => sum + s.overallSeverity, 0) /
        energySymptoms.length
      : 3;
  const energyScore = Math.max(0, Math.min(100, (10 - avgEnergySeverity) * 10));

  const overall = Math.round(
    symptomScore * 0.3 +
      inflammationScore * 0.25 +
      diversityScore * 0.2 +
      regularityScore * 0.15 +
      energyScore * 0.1
  );

  // Determine trend by comparing first half vs second half
  const midpoint = cutoff + (daysWindow * 24 * 60 * 60 * 1000) / 2;
  const firstHalf = recentSymptoms.filter(
    (s) => new Date(s.timestamp).getTime() < midpoint
  );
  const secondHalf = recentSymptoms.filter(
    (s) => new Date(s.timestamp).getTime() >= midpoint
  );
  const firstAvg =
    firstHalf.length > 0
      ? firstHalf.reduce((s, e) => s + e.overallSeverity, 0) / firstHalf.length
      : 5;
  const secondAvg =
    secondHalf.length > 0
      ? secondHalf.reduce((s, e) => s + e.overallSeverity, 0) /
        secondHalf.length
      : 5;

  let trend: "improving" | "stable" | "declining";
  if (secondAvg < firstAvg - 1) trend = "improving";
  else if (secondAvg > firstAvg + 1) trend = "declining";
  else trend = "stable";

  return {
    overall,
    diversity: Math.round(diversityScore),
    inflammation: Math.round(inflammationScore),
    regularity: Math.round(regularityScore),
    energy: Math.round(energyScore),
    trend,
  };
}

/**
 * Generate a full insight report combining correlations, scores, and recommendations.
 */
export function generateInsightReport(
  meals: MealEntry[],
  symptoms: SymptomEntry[]
): InsightReport {
  const correlations = findCorrelations(meals, symptoms);
  const gutScore = calculateGutScore(symptoms, meals);

  const topTriggers = correlations
    .filter((c) => c.direction === "triggers")
    .slice(0, 5);
  const topHelpers = correlations
    .filter((c) => c.direction === "helps")
    .slice(0, 5);

  const recommendations = generateRecommendations(
    topTriggers,
    topHelpers,
    gutScore
  );

  // Generate weekly trend data
  const weeklyTrend: { date: string; score: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const daySymptoms = symptoms.filter(
      (s) => s.timestamp.split("T")[0] === dateStr
    );
    const avgSev =
      daySymptoms.length > 0
        ? daySymptoms.reduce((sum, s) => sum + s.overallSeverity, 0) /
          daySymptoms.length
        : 5;
    weeklyTrend.push({
      date: dateStr,
      score: Math.round((10 - avgSev) * 10),
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    topTriggers,
    topHelpers,
    gutScore,
    recommendations,
    weeklyTrend,
  };
}

function generateRecommendations(
  triggers: Correlation[],
  helpers: Correlation[],
  score: GutScore
): string[] {
  const recs: string[] = [];

  if (triggers.length > 0) {
    recs.push(
      `Consider eliminating ${triggers[0].food} from your diet - it shows a ${Math.round(triggers[0].strength * 100)}% correlation with ${triggers[0].symptom}.`
    );
  }

  if (helpers.length > 0) {
    recs.push(
      `Keep eating ${helpers[0].food} - it appears to help reduce ${helpers[0].symptom}.`
    );
  }

  if (score.diversity < 50) {
    recs.push(
      "Your food diversity is low. Try introducing 2-3 new gut-friendly foods this week like fermented vegetables, bone broth, or leafy greens."
    );
  }

  if (score.inflammation < 50) {
    recs.push(
      "Your diet has a high inflammatory load. Focus on anti-inflammatory foods: fatty fish, olive oil, turmeric, and berries."
    );
  }

  if (score.regularity < 60) {
    recs.push(
      "Your meal timing is irregular. Eating at consistent times helps regulate gut motility and microbiome rhythms."
    );
  }

  if (score.energy < 50) {
    recs.push(
      "Your energy levels correlate with digestive symptoms. Consider smaller, more frequent meals and ensure adequate protein at each meal."
    );
  }

  if (recs.length === 0) {
    recs.push(
      "Your gut health looks good! Continue tracking to build a more complete picture of your food-symptom relationships."
    );
  }

  return recs;
}
