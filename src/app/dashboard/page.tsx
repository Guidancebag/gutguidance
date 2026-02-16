"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { DEMO_MEALS, DEMO_SYMPTOMS, DEMO_PROFILE } from "@/lib/demo-data";
import { generateInsightReport } from "@/lib/analysis-engine";
import { generateMealPlan } from "@/lib/meal-planner";
import { GutScoreRing } from "@/components/GutScoreRing";
import { CorrelationCard } from "@/components/CorrelationCard";
import { MealPlanView } from "@/components/MealPlanView";
import { SymptomTimeline } from "@/components/SymptomTimeline";
import { FoodScorer } from "@/components/FoodScorer";
import { WeeklyChart } from "@/components/WeeklyChart";

type Tab = "overview" | "correlations" | "meal-plan" | "food-scorer" | "timeline";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const report = useMemo(
    () => generateInsightReport(DEMO_MEALS, DEMO_SYMPTOMS),
    []
  );

  const mealPlan = useMemo(
    () => generateMealPlan(report.topTriggers, 7, "elimination"),
    [report.topTriggers]
  );

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "correlations", label: "Triggers & Helpers", icon: "🔬" },
    { id: "meal-plan", label: "Meal Plan", icon: "🍽️" },
    { id: "food-scorer", label: "Food Scorer", icon: "🧪" },
    { id: "timeline", label: "Timeline", icon: "📅" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-[#1b4332]">
              GutGuidance
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {DEMO_PROFILE.name}
              </div>
              <div className="text-xs text-gray-500">
                {DEMO_PROFILE.conditions.join(", ")}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#2d6a4f] flex items-center justify-center">
              <span className="text-white text-sm font-semibold">DU</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#2d6a4f] text-[#2d6a4f]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <OverviewTab report={report} />
        )}
        {activeTab === "correlations" && (
          <CorrelationsTab report={report} />
        )}
        {activeTab === "meal-plan" && (
          <MealPlanView plan={mealPlan} />
        )}
        {activeTab === "food-scorer" && (
          <FoodScorer />
        )}
        {activeTab === "timeline" && (
          <SymptomTimeline meals={DEMO_MEALS} symptoms={DEMO_SYMPTOMS} />
        )}
      </main>
    </div>
  );
}

function OverviewTab({ report }: { report: ReturnType<typeof generateInsightReport> }) {
  return (
    <div className="space-y-8">
      {/* Top Row: Gut Score + Trend Chart */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Your Gut Health Score
          </h3>
          <GutScoreRing score={report.gutScore} />
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            7-Day Wellness Trend
          </h3>
          <WeeklyChart data={report.weeklyTrend} />
        </div>
      </div>

      {/* Sub-scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Diversity", value: report.gutScore.diversity, color: "#2d6a4f" },
          { label: "Inflammation", value: report.gutScore.inflammation, color: "#e63946" },
          { label: "Regularity", value: report.gutScore.regularity, color: "#f4a261" },
          { label: "Energy", value: report.gutScore.energy, color: "#2a9d8f" },
        ].map((sub) => (
          <div
            key={sub.label}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="text-sm text-gray-500 mb-1">{sub.label}</div>
            <div className="text-2xl font-bold" style={{ color: sub.color }}>
              {sub.value}
              <span className="text-sm font-normal text-gray-400">/100</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
              <div
                className="h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${sub.value}%`,
                  backgroundColor: sub.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Top Triggers Preview */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-red-700 mb-4">
            Top Trigger Foods
          </h3>
          {report.topTriggers.length > 0 ? (
            <div className="space-y-3">
              {report.topTriggers.slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-red-800 capitalize">
                      {c.food}
                    </span>
                    <span className="text-red-600 text-sm ml-2">
                      triggers {c.symptom}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-red-700">
                    {Math.round(c.strength * 100)}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Keep logging to discover trigger patterns.
            </p>
          )}
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Gut-Friendly Foods
          </h3>
          {report.topHelpers.length > 0 ? (
            <div className="space-y-3">
              {report.topHelpers.slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-green-800 capitalize">
                      {c.food}
                    </span>
                    <span className="text-green-600 text-sm ml-2">
                      helps with {c.symptom}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-700">
                    {Math.round(c.strength * 100)}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Keep logging to discover helpful food patterns.
            </p>
          )}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-[#1b4332] mb-4">
          AI Recommendations
        </h3>
        <div className="space-y-3">
          {report.recommendations.map((rec, i) => (
            <div key={i} className="flex gap-3 p-4 bg-[#f0fdf4] rounded-lg">
              <span className="text-[#2d6a4f] mt-0.5 flex-shrink-0">
                &#9679;
              </span>
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CorrelationsTab({ report }: { report: ReturnType<typeof generateInsightReport> }) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-[#1b4332] mb-2">
          Food-Symptom Correlation Analysis
        </h3>
        <p className="text-gray-500 mb-6">
          Based on {DEMO_MEALS.length} meals and {DEMO_SYMPTOMS.length} symptom
          entries over the past 7 days. Correlations are ranked by strength
          multiplied by confidence.
        </p>

        {report.topTriggers.length > 0 && (
          <>
            <h4 className="text-lg font-semibold text-red-700 mb-4">
              Trigger Foods (Avoid These)
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {report.topTriggers.map((c, i) => (
                <CorrelationCard key={i} correlation={c} />
              ))}
            </div>
          </>
        )}

        {report.topHelpers.length > 0 && (
          <>
            <h4 className="text-lg font-semibold text-green-700 mb-4">
              Helpful Foods (Eat More)
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {report.topHelpers.map((c, i) => (
                <CorrelationCard key={i} correlation={c} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
