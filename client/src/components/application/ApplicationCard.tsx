import React from "react";
import { Link } from "react-router";
import type { Application } from "../../types/application.types";
import { Button } from "../ui/Button";

interface ApplicationCardProps {
  application: Application;
  getStatusBadge: (status: string) => string;
  onDeleteConfirm: (id: string, companyName: string) => void;
  isDeleting: boolean;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  getStatusBadge,
  onDeleteConfirm,
  isDeleting,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            {application.companyName}
          </h3>
          <p className="text-sm font-medium text-slate-600">
            {application.jobTitle}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
            application.status,
          )}`}
        >
          {application.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <span>Source: {application.source}</span>
        <span>
          {new Date(application.applicationDate).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Link to={`/applications/${application.id}/edit`}>
          <Button variant="secondary" size="sm">
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          size="sm"
          isLoading={isDeleting}
          onClick={() =>
            onDeleteConfirm(application.id, application.companyName)
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
