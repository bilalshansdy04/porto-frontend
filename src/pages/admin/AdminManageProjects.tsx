import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { Project } from "../../services/api";

export function AdminManageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Project name is required");
    if (!imageFile) return alert("Image is required");

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);

      const newProject = await api.createProject(formData);
      // Automatically redirect to the edit page to complete the details
      navigate(`/admin/projects/${newProject.id}/edit`);
    } catch (err) {
      console.error("Failed to create project", err);
      alert("Failed to create project");
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.deleteProject(id);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
      alert("Failed to delete project");
    }
  };

  return (
    <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Projects Table Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">
              Current Projects
            </h2>
            <p className="text-secondary mt-1">
              Manage and update your portfolio items.
            </p>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden interactive-hover">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
                  Project Name
                </th>
                <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
                  Status
                </th>
                <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">Loading...</td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-secondary">No projects found.</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-4 font-body-md text-primary flex items-center gap-2">
                      {project.name}
                      {!project.is_complete && (
                        <span className="material-symbols-outlined text-[#eab308] text-[20px]" title="Needs Completion">
                          warning
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded font-label-code text-label-code text-xs ${
                        project.status === 'Live' || project.status === 'Done' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        {project.status || 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="text-secondary hover:text-primary transition-colors inline-block"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-error hover:text-on-error-container transition-colors inline-block"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add/Edit Form Section */}
      <div className="lg:col-span-1">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sticky top-24 interactive-hover">
          <h3 className="font-headline-md text-headline-md text-primary mb-6">
            Add New Project
          </h3>
          <form className="space-y-5" onSubmit={handleAddProject}>
            <div>
              <label
                className="block font-label-code text-label-code text-secondary mb-2"
                htmlFor="projectName"
              >
                Project Name
              </label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
                id="projectName"
                placeholder="e.g. Distributed Database"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block font-label-code text-label-code text-secondary mb-2">
                Upload Image
              </label>
              <div 
                className="border-2 border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center bg-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
                {imageFile ? (
                  <span className="font-body-md text-sm text-primary font-bold text-center">
                    {imageFile.name}
                  </span>
                ) : (
                  <>
                    <span
                      className="material-symbols-outlined text-secondary mb-2"
                      style={{ fontSize: "32px" }}
                    >
                      cloud_upload
                    </span>
                    <span className="font-body-md text-sm text-secondary text-center">
                      Click to upload image
                    </span>
                    <span className="font-label-caps text-xs text-outline mt-1 text-center">
                      SVG, PNG, JPG, WEBP (MAX. 2MB)
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="pt-4">
              <button
                className={`w-full bg-brand-navy text-white font-body-md font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                type="submit"
                disabled={isSubmitting}
              >
                <span className="material-symbols-outlined">add</span>
                {isSubmitting ? 'Creating...' : 'Initialize Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
