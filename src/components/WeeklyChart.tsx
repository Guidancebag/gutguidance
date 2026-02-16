"use client";

interface Props {
  data: { date: string; score: number }[];
}

export function WeeklyChart({ data }: Props) {
  const maxScore = Math.max(...data.map((d) => d.score), 100);

  const getBarColor = (score: number) => {
    if (score >= 70) return "#2d6a4f";
    if (score >= 40) return "#f4a261";
    return "#e63946";
  };

  const formatDay = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="h-64 flex items-end gap-3">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-gray-600">{d.score}</span>
          <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: "200px" }}>
            <div
              className="absolute bottom-0 w-full rounded-t-lg transition-all duration-700"
              style={{
                height: `${(d.score / maxScore) * 100}%`,
                backgroundColor: getBarColor(d.score),
              }}
            />
          </div>
          <span className="text-xs text-gray-500">{formatDay(d.date)}</span>
        </div>
      ))}
    </div>
  );
}
