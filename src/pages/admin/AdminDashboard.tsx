import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { DashboardStats } from "../../services/api";

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
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h2 className="text-display font-display text-primary mb-4">
            Welcome back, Bilal.
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
            Here is an overview of your portfolio performance, recent
            activities, and system alerts. Everything is running smoothly.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              to="/admin/projects"
              className="bg-primary-container text-on-primary px-6 py-3 rounded-lg font-body-md hover:bg-primary transition-colors shadow-sm inline-block"
            >
              Add New Project
            </Link>
            <Link
              to="/"
              className="border border-outline text-secondary px-6 py-3 rounded-lg font-body-md hover:bg-surface-container-low transition-colors inline-block"
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
      </section>

      {/* Stats & Summary Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col justify-between hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-body-md font-body-md font-bold text-secondary uppercase tracking-widest">
              Quick Summary
            </h3>
            <span className="material-symbols-outlined text-primary-fixed-dim">
              info
            </span>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant mb-4 flex-1">
            {stats.summary || "No summary provided. Edit profile to add."}
          </p>
          <Link
            className="text-primary font-label-code text-label-code hover:underline flex items-center gap-1"
            to="/admin/profile/edit"
          >
            Edit Profile{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
        {/* Stats */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col justify-center items-center text-center hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-shadow">
          <h4 className="text-label-caps font-label-caps text-secondary mb-2">
            Total Projects
          </h4>
          <span className="text-display font-display text-primary font-label-code">
            {stats.total_projects}
          </span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col justify-center items-center text-center hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-shadow">
          <h4 className="text-label-caps font-label-caps text-secondary mb-2">
            Years of Experience
          </h4>
          <span className="text-display font-display text-primary font-label-code">
            {stats.years_of_experience}+
          </span>
        </div>
      </section>

      {/* Recent Projects Table */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="text-headline-md font-headline-md text-primary">
            Recent Projects
          </h3>
          <Link
            className="text-primary font-body-md text-body-md hover:underline"
            to="/admin/projects"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-bright">
                <th className="px-6 py-3 text-label-caps font-label-caps text-secondary uppercase">
                  Project Name
                </th>
                <th className="px-6 py-3 text-label-caps font-label-caps text-secondary uppercase">
                  Tech Stack
                </th>
                <th className="px-6 py-3 text-label-caps font-label-caps text-secondary uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-label-caps font-label-caps text-secondary uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-body-md font-body-md">
              {stats.recent_projects && stats.recent_projects.length > 0 ? (
                stats.recent_projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-outline-variant hover:bg-surface-container-low transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-primary">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {project.tech_stack ? project.tech_stack.join(", ") : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === "Live" || project.status === "Done"
                            ? "bg-[#f1f5f9] text-[#64748b]"
                            : "bg-surface-container-high text-on-surface-variant"
                        }`}
                      >
                        {project.status || "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="text-secondary hover:text-primary transition-colors inline-block"
                      >
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-secondary"
                  >
                    No recent projects.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
