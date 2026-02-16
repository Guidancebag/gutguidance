"use client";

import { MealEntry, SymptomEntry } from "@/lib/types";
import { getHumanReadableDate } from "@/lib/demo-data";

interface Props {
  meals: MealEntry[];
  symptoms: SymptomEntry[];
}

interface TimelineEvent {
  type: "meal" | "symptom";
  timestamp: string;
  data: MealEntry | SymptomEntry;
}

export function SymptomTimeline({ meals, symptoms }: Props) {
  // Merge and sort events chronologically (newest first)
  const events: TimelineEvent[] = [
    ...meals.map((m) => ({ type: "meal" as const, timestamp: m.timestamp, data: m })),
    ...symptoms.map((s) => ({ type: "symptom" as const, timestamp: s.timestamp, data: s })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Group by date
  const grouped: Record<string, TimelineEvent[]> = {};
  for (const event of events) {
    const dateKey = event.timestamp.split("T")[0];
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(event);
  }

  const getSeverityColor = (severity: number) => {
    if (severity <= 2) return "bg-green-100 text-green-700 border-green-200";
    if (severity <= 5) return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-[#1b4332] mb-2">
          Food & Symptom Timeline
        </h3>
        <p className="text-gray-500 mb-6">
          See your meals and symptoms side by side to spot patterns. Look for
          symptoms that follow specific meals within 2-24 hours.
        </p>
      </div>

      {Object.entries(grouped).map(([dateKey, dayEvents]) => (
        <div key={dateKey}>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            {getHumanReadableDate(dateKey + "T12:00:00")} &mdash; {dateKey}
          </h4>
          <div className="space-y-3">
            {dayEvents.map((event, i) => {
              if (event.type === "meal") {
                const meal = event.data as MealEntry;
                return (
                  <div
                    key={`meal-${i}`}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg">
                      {meal.mealType === "breakfast"
                        ? "🌅"
                        : meal.mealType === "lunch"
                          ? "☀️"
                          : meal.mealType === "dinner"
                            ? "🌙"
                            : "🍎"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-blue-600 uppercase">
                          {meal.mealType}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatTime(meal.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{meal.notes}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {meal.foods.map((food, j) => (
                          <span
                            key={j}
                            className={`px-2 py-0.5 rounded text-xs capitalize ${
                              food.fodmapRating === "high"
                                ? "bg-red-50 text-red-600"
                                : food.fodmapRating === "moderate"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-green-50 text-green-600"
                            }`}
                          >
                            {food.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              } else {
                const symptom = event.data as SymptomEntry;
                return (
                  <div
                    key={`symptom-${i}`}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-lg">
                      {symptom.overallSeverity >= 6
                        ? "😣"
                        : symptom.overallSeverity >= 3
                          ? "😐"
                          : "😊"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-red-600 uppercase">
                          Symptom Report
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatTime(symptom.timestamp)}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(symptom.overallSeverity)}`}
                        >
                          Severity: {symptom.overallSeverity}/10
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{symptom.notes}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {symptom.symptoms.map((s, j) => (
                          <span
                            key={j}
                            className={`px-2 py-0.5 rounded text-xs border ${getSeverityColor(s.severity)}`}
                          >
                            {s.name} ({s.severity}/10)
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
