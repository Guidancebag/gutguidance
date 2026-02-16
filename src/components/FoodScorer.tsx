"use client";

import { useState } from "react";
import { lookupFood, searchFoods } from "@/lib/food-database";
import { FoodItem } from "@/lib/types";

export function FoodScorer() {
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInput = (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      setSuggestions(searchFoods(value).slice(0, 8));
    } else {
      setSuggestions([]);
    }
  };

  const selectFood = (name: string) => {
    setSelectedFood(lookupFood(name));
    setQuery(name);
    setSuggestions([]);
  };

  const getFodmapColor = (rating: string) => {
    switch (rating) {
      case "low": return "bg-green-100 text-green-700";
      case "moderate": return "bg-amber-100 text-amber-700";
      case "high": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getInflammatoryLabel = (score: number) => {
    if (score <= -6) return { label: "Highly Anti-Inflammatory", color: "text-green-700", bg: "bg-green-50" };
    if (score <= -3) return { label: "Anti-Inflammatory", color: "text-green-600", bg: "bg-green-50" };
    if (score <= 0) return { label: "Neutral", color: "text-gray-600", bg: "bg-gray-50" };
    if (score <= 3) return { label: "Mildly Inflammatory", color: "text-amber-600", bg: "bg-amber-50" };
    if (score <= 6) return { label: "Inflammatory", color: "text-red-600", bg: "bg-red-50" };
    return { label: "Highly Inflammatory", color: "text-red-700", bg: "bg-red-50" };
  };

  const getGutScore = (food: FoodItem): number => {
    let score = 50;
    // FODMAP impact
    if (food.fodmapRating === "low") score += 20;
    else if (food.fodmapRating === "moderate") score += 5;
    else score -= 15;
    // Inflammatory impact
    score -= food.inflammatoryScore * 3;
    // Category bonus
    if (food.category === "fermented") score += 15;
    if (food.category === "vegetable") score += 10;
    if (food.category === "fruit") score += 5;
    if (food.category === "processed") score -= 15;
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-[#1b4332] mb-2">
          Food Gut-Score Calculator
        </h3>
        <p className="text-gray-500 mb-6">
          Look up any food to see its FODMAP rating, inflammatory score, and
          overall gut-friendliness. Scores are personalized based on your
          trigger profile.
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search a food (e.g., garlic, salmon, yogurt...)"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => selectFood(s)}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 capitalize text-gray-700 border-b border-gray-50 last:border-0"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      {selectedFood && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-fade-in-up">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 capitalize">
                {selectedFood.name}
              </h4>
              <span className="text-sm text-gray-500 capitalize">
                Category: {selectedFood.category}
              </span>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-[#2d6a4f]">
                {getGutScore(selectedFood)}
              </div>
              <div className="text-xs text-gray-500">Gut Score</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* FODMAP */}
            <div className="rounded-xl p-5 border border-gray-100">
              <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                FODMAP Rating
              </h5>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getFodmapColor(selectedFood.fodmapRating)}`}
              >
                {selectedFood.fodmapRating} FODMAP
              </span>
              <p className="text-xs text-gray-500 mt-3">
                {selectedFood.fodmapRating === "low"
                  ? "Safe for most IBS patients. Unlikely to trigger symptoms."
                  : selectedFood.fodmapRating === "moderate"
                    ? "May cause symptoms in sensitive individuals. Monitor portions."
                    : "Common trigger for IBS patients. Consider eliminating."}
              </p>
            </div>

            {/* Inflammatory */}
            <div className="rounded-xl p-5 border border-gray-100">
              <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Inflammatory Score
              </h5>
              {(() => {
                const info = getInflammatoryLabel(selectedFood.inflammatoryScore);
                return (
                  <>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${info.color} ${info.bg}`}>
                      {selectedFood.inflammatoryScore > 0 ? "+" : ""}
                      {selectedFood.inflammatoryScore} / 10
                    </span>
                    <p className="text-xs text-gray-500 mt-3">{info.label}</p>
                  </>
                );
              })()}
            </div>

            {/* Recommendation */}
            <div className="rounded-xl p-5 border border-gray-100">
              <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Recommendation
              </h5>
              {getGutScore(selectedFood) >= 60 ? (
                <div className="text-green-700">
                  <span className="text-2xl">&#10003;</span>
                  <p className="text-sm mt-2">
                    Good choice for gut health. Include regularly in your diet.
                  </p>
                </div>
              ) : getGutScore(selectedFood) >= 35 ? (
                <div className="text-amber-700">
                  <span className="text-2xl">&#9888;</span>
                  <p className="text-sm mt-2">
                    Consume in moderation. Watch for symptoms after eating.
                  </p>
                </div>
              ) : (
                <div className="text-red-700">
                  <span className="text-2xl">&#10007;</span>
                  <p className="text-sm mt-2">
                    Consider avoiding, especially during elimination phases.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference Grid */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-[#1b4332] mb-4">
          Quick Reference: Top Gut-Friendly Foods
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "salmon", "turmeric", "ginger", "blueberries",
            "kale", "kimchi", "olive oil", "bone broth",
            "spinach", "walnuts", "green tea", "sauerkraut",
          ].map((name) => {
            const food = lookupFood(name);
            const gutScore = getGutScore(food);
            return (
              <button
                key={name}
                onClick={() => selectFood(name)}
                className="p-3 rounded-lg border border-gray-100 hover:border-[#2d6a4f] hover:bg-green-50 transition-all text-left"
              >
                <div className="font-medium text-gray-800 capitalize text-sm">
                  {name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Score:{" "}
                  <span className="font-semibold text-[#2d6a4f]">
                    {gutScore}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
