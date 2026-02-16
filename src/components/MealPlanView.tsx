"use client";

import { useState } from "react";
import { MealPlan } from "@/lib/types";

interface Props {
  plan: MealPlan;
}

export function MealPlanView({ plan }: Props) {
  const [selectedDay, setSelectedDay] = useState(1);
  const day = plan.days.find((d) => d.day === selectedDay);

  const mealTypeIcon: Record<string, string> = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    snack: "🍎",
  };

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-[#1b4332]">
              {plan.name}
            </h3>
            <p className="text-gray-500 mt-1">{plan.description}</p>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium capitalize">
            {plan.phase} Phase
          </span>
        </div>

        {plan.eliminatedFoods.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-red-700 mb-2">
              Eliminated Foods (Based on Your Triggers)
            </h4>
            <div className="flex flex-wrap gap-2">
              {plan.eliminatedFoods.map((food, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-200 capitalize"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {plan.days.map((d) => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(d.day)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              selectedDay === d.day
                ? "bg-[#2d6a4f] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {/* Day Meals */}
      {day && (
        <div className="grid md:grid-cols-2 gap-4">
          {day.meals.map((meal, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">
                  {mealTypeIcon[meal.mealType] || "🍽️"}
                </span>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {meal.mealType}
                  </span>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {meal.name}
                  </h4>
                </div>
              </div>

              <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <span>{meal.prepTime} min prep</span>
                <span>{meal.calories} cal</span>
              </div>

              <div className="mb-4">
                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Ingredients
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {meal.ingredients.map((ing, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-sm capitalize"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-medium text-green-600 uppercase tracking-wider mb-2">
                  Gut Benefits
                </h5>
                <ul className="space-y-1">
                  {meal.gutBenefits.map((benefit, j) => (
                    <li
                      key={j}
                      className="text-sm text-green-700 flex items-start gap-1.5"
                    >
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
