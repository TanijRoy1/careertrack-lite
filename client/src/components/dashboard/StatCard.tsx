import React from "react";

export interface StatCardProps {
  title: string;
  value: number;
  description?: string;
  icon?: React.ReactNode;
  trend?: string;
  accentColor?: "indigo" | "blue" | "amber" | "emerald" | "rose";
}

const colorStyles = {
  indigo: {
    bg: "bg-indigo-50/70",
    text: "text-indigo-600",
    border: "group-hover:border-indigo-200",
    glow: "group-hover:shadow-indigo-100",
  },
  blue: {
    bg: "bg-blue-50/70",
    text: "text-blue-600",
    border: "group-hover:border-blue-200",
    glow: "group-hover:shadow-blue-100",
  },
  amber: {
    bg: "bg-amber-50/70",
    text: "text-amber-600",
    border: "group-hover:border-amber-200",
    glow: "group-hover:shadow-amber-100",
  },
  emerald: {
    bg: "bg-emerald-50/70",
    text: "text-emerald-600",
    border: "group-hover:border-emerald-200",
    glow: "group-hover:shadow-emerald-100",
  },
  rose: {
    bg: "bg-rose-50/70",
    text: "text-rose-600",
    border: "group-hover:border-rose-200",
    glow: "group-hover:shadow-rose-100",
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  accentColor = "indigo",
}) => {
  const styles = colorStyles[accentColor];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${styles.border} ${styles.glow}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${styles.bg} ${styles.text}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {value.toLocaleString()}
        </h2>
        {trend && (
          <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
            {trend}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1.5 text-xs font-medium text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
};
