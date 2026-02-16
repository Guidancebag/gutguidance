import { NextRequest, NextResponse } from "next/server";
import { findCorrelations, calculateGutScore, generateInsightReport } from "@/lib/analysis-engine";
import { MealEntry, SymptomEntry } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const meals: MealEntry[] = body.meals || [];
  const symptoms: SymptomEntry[] = body.symptoms || [];

  if (meals.length === 0 && symptoms.length === 0) {
    return NextResponse.json(
      { error: "Please provide at least one meal or symptom entry." },
      { status: 400 }
    );
  }

  const correlations = findCorrelations(meals, symptoms);
  const gutScore = calculateGutScore(symptoms, meals);
  const report = generateInsightReport(meals, symptoms);

  return NextResponse.json({
    correlations,
    gutScore,
    report,
  });
}
