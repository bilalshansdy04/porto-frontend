import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { DashboardStats } from "../../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDashboardStats()
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to load stats", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (!stats) {
    return (
      <div className="p-8 text-error">Failed to load dashboard statistics.</div>
    );
  }

  return (
    <div className="p-8 max-w-max-width mx-auto w-full space-y-8">
      {/* Hero Section */}
      <Card className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 border-outline-variant bg-surface-container-lowest">
        <div className="flex-1">
          <h2 className="text-display font-display text-primary mb-4">
            Welcome back, Bilal.
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mb-6">
            Here is an overview of your portfolio performance, recent
            activities, and system alerts. Everything is running smoothly.
          </p>
          <div className="flex gap-4">
            <Link
              to="/admin/projects"
              className={buttonVariants({
                className: "px-6 rounded-lg text-white",
              })}
            >
              Add New Project
            </Link>
            <Link
              to="/"
              className={buttonVariants({
                variant: "outline",
                className: "px-6 rounded-lg",
              })}
            >
              View Live Portfolio
            </Link>
          </div>
        </div>
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border border-outline-variant shadow-sm flex-shrink-0">
          <img
            alt="Bilal Shandyarta Portrait"
            className="w-full h-full object-cover"
            src="/stitch_downloads/admin_overview.png"
          />
        </div>
      </Card>

      {/* Stats & Summary Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Card */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center text-sm uppercase tracking-widest text-secondary">
              Quick Summary
              <span className="material-symbols-outlined text-primary-fixed-dim">
                info
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-body-md text-on-surface-variant mb-4">
              {stats.summary || "No summary provided. Edit profile to add."}
            </p>
            <Link
              to="/admin/profile/edit"
              className={buttonVariants({
                variant: "link",
                className:
                  "p-0 h-auto justify-start text-primary font-semibold",
              })}
            >
              Edit Profile{" "}
              <span className="material-symbols-outlined text-sm ml-1">
                arrow_forward
              </span>
            </Link>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="flex flex-col justify-center items-center text-center py-6">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xs text-secondary uppercase font-semibold">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <span className="text-display font-display text-primary font-label-code">
              {stats.total_projects}
            </span>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-center items-center text-center py-6">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xs text-secondary uppercase font-semibold">
              Years of Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <span className="text-display font-display text-primary font-label-code">
              {stats.years_of_experience}+
            </span>
          </CardContent>
        </Card>
      </section>

      {/* Recent Projects Table */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-surface-container-low border-b border-outline-variant py-4">
          <CardTitle className="text-lg">Recent Projects</CardTitle>
          <Link
            to="/admin/projects"
            className={buttonVariants({
              variant: "link",
              className: "p-0 h-auto",
            })}
          >
            View All
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-surface-bright">
              <TableRow className="border-b border-outline-variant hover:bg-surface-bright">
                <TableHead className="uppercase text-xs font-semibold text-secondary px-6">
                  Project Name
                </TableHead>
                <TableHead className="uppercase text-xs font-semibold text-secondary px-6">
                  Tech Stack
                </TableHead>
                <TableHead className="uppercase text-xs font-semibold text-secondary px-6">
                  Status
                </TableHead>
                <TableHead className="uppercase text-xs font-semibold text-secondary text-right px-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recent_projects && stats.recent_projects.length > 0 ? (
                stats.recent_projects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="border-b border-outline-variant hover:bg-surface-container-low transition-colors"
                  >
                    <TableCell className="font-semibold text-primary px-6 py-4">
                      {project.name}
                    </TableCell>
                    <TableCell className="text-on-surface-variant px-6 py-4">
                      {project.tech_stack ? project.tech_stack.join(", ") : "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === "Live" || project.status === "Done"
                            ? "bg-[#f1f5f9] text-[#64748b]"
                            : "bg-surface-container-high text-on-surface-variant"
                        }`}
                      >
                        {project.status || "Draft"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right px-6 py-4">
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className={buttonVariants({
                          variant: "ghost",
                          size: "icon",
                          className:
                            "h-8 w-8 text-secondary hover:text-primary",
                        })}
                      >
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-secondary h-24"
                  >
                    No recent projects.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
