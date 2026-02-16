import { NextRequest, NextResponse } from "next/server";
import { generateMealPlan } from "@/lib/meal-planner";
import { Correlation } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const triggers: Correlation[] = body.triggers || [];
  const days: number = body.days || 7;
  const phase: "elimination" | "reintroduction" | "maintenance" =
    body.phase || "elimination";

  const plan = generateMealPlan(triggers, days, phase);

  return NextResponse.json({ plan });
}
