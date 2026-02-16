"use client";

import { Correlation } from "@/lib/types";

interface Props {
  correlation: Correlation;
}

export function CorrelationCard({ correlation: c }: Props) {
  const isTrigger = c.direction === "triggers";

  return (
    <div
      className={`rounded-xl p-5 border ${
        isTrigger
          ? "bg-red-50 border-red-100"
          : "bg-green-50 border-green-100"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4
            className={`text-lg font-semibold capitalize ${
              isTrigger ? "text-red-800" : "text-green-800"
            }`}
          >
            {c.food}
          </h4>
          <p
            className={`text-sm ${isTrigger ? "text-red-600" : "text-green-600"}`}
          >
            {isTrigger ? "Triggers" : "Helps with"}{" "}
            <span className="font-medium">{c.symptom}</span>
          </p>
        </div>
        <div
          className={`text-2xl font-bold ${
            isTrigger ? "text-red-700" : "text-green-700"
          }`}
        >
          {Math.round(c.strength * 100)}%
        </div>
      </div>

      {/* Correlation strength bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Correlation Strength</span>
          <span>{Math.round(c.strength * 100)}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-700 ${
              isTrigger ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${c.strength * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-between text-xs">
        <span
          className={isTrigger ? "text-red-500" : "text-green-500"}
        >
          Confidence: {Math.round(c.confidence * 100)}%
        </span>
        <span className="text-gray-400">
          {c.occurrences} co-occurrences
        </span>
      </div>
    </div>
  );
}
