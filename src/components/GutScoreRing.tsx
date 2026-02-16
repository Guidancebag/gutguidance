"use client";

import { GutScore } from "@/lib/types";

interface Props {
  score: GutScore;
}

export function GutScoreRing({ score }: Props) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score.overall / 100) * circumference;

  const getColor = (value: number) => {
    if (value >= 70) return "#2d6a4f";
    if (value >= 40) return "#f4a261";
    return "#e63946";
  };

  const trendLabel = {
    improving: "Improving",
    stable: "Stable",
    declining: "Declining",
  };

  const trendColor = {
    improving: "text-green-600",
    stable: "text-amber-600",
    declining: "text-red-600",
  };

  const trendArrow = {
    improving: "\u2191",
    stable: "\u2192",
    declining: "\u2193",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getColor(score.overall)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-score-fill"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold"
            style={{ color: getColor(score.overall) }}
          >
            {score.overall}
          </span>
          <span className="text-xs text-gray-500">/ 100</span>
        </div>
      </div>
      <div className={`mt-4 flex items-center gap-1 font-medium ${trendColor[score.trend]}`}>
        <span>{trendArrow[score.trend]}</span>
        <span>{trendLabel[score.trend]}</span>
      </div>
    </div>
  );
}
