import React from "react";

interface StatusChartProps {
  stats: {
    appliedJobs: number;
    interviews: number;
    offers: number;
    rejected?: number;
  };
}

export const StatusChart: React.FC<StatusChartProps> = ({ stats }) => {
  const total =
    (stats.appliedJobs || 0) +
    (stats.interviews || 0) +
    (stats.offers || 0) +
    (stats.rejected || 0);

  const categories = [
    {
      label: "Applied",
      count: stats.appliedJobs || 0,
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    {
      label: "Interviews",
      count: stats.interviews || 0,
      color: "bg-amber-500",
      textColor: "text-amber-700",
      bgColor: "bg-amber-50",
    },
    {
      label: "Offers",
      count: stats.offers || 0,
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Rejected",
      count: stats.rejected || 0,
      color: "bg-rose-400",
      textColor: "text-rose-700",
      bgColor: "bg-rose-50",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Pipeline Distribution
          </h3>
          <p className="text-xs text-slate-500">
            Breakdown of your active and past applications
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {total} Total
        </span>
      </div>

      {/* Progress Bar Visualizer */}
      <div className="mt-6">
        <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
          {categories.map(
            (cat) =>
              cat.count > 0 && (
                <div
                  key={cat.label}
                  style={{
                    width: `${total > 0 ? (cat.count / total) * 100 : 0}%`,
                  }}
                  className={`${cat.color} transition-all duration-500`}
                  title={`${cat.label}: ${cat.count}`}
                />
              ),
          )}
        </div>
      </div>

      {/* Grid Legend Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {categories.map((cat) => {
          const percentage =
            total > 0 ? Math.round((cat.count / total) * 100) : 0;
          return (
            <div
              key={cat.label}
              className={`rounded-xl p-3 border border-slate-100 ${cat.bgColor} flex flex-col justify-between`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
                <span className="text-xs font-semibold text-slate-600">
                  {cat.label}
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className={`text-lg font-bold ${cat.textColor}`}>
                  {cat.count}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
