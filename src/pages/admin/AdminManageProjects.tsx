import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { Project, Category, ProjectTargetType } from "../../services/api";
import { toast } from "@/components/ui/toast";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AdminManageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Dummy Landing Page");
  const [targetType, setTargetType] = useState<ProjectTargetType>("direct");
  const [link, setLink] = useState("/demos/topup");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const cats = await api.getCategories();
      setCategoriesList(cats);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const applyPresetLandingPage = () => {
    setName((prev) =>
      prev ? prev : "Nova AI Analytics - Cyber Aurora Landing Page",
    );
    setCategory("Dummy Landing Page");
    setTargetType("direct");
    setLink("/demos/landingpage1");
  };

  const applyPresetStandardProject = () => {
    setCategory(categoriesList[0]?.name || "General");
    setTargetType("detail");
    setLink("");
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.add({
        title: "Validation Error",
        description: "Project name is required",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("target_type", targetType);
      if (link) formData.append("link", link);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const newProject = await api.createProject(formData);
      toast.add({
        title: "Success",
        description: "Project created successfully!",
        type: "success",
      });
      navigate(`/admin/projects/${newProject.id}/edit`);
    } catch (err) {
      console.error("Failed to create project", err);
      toast.add({
        title: "Error",
        description: "Failed to create project",
        type: "error",
      });
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await api.deleteProject(id);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
      toast.add({
        title: "Error",
        description: "Failed to delete project",
        type: "error",
      });
    }
  };

  const handleToggleVisibility = async (
    project: Project,
    is_visible: boolean,
  ) => {
    try {
      await api.updateProject(project.id, { ...project, is_visible });
      setProjects(
        projects.map((p) => (p.id === project.id ? { ...p, is_visible } : p)),
      );
      toast.add({
        title: "Success",
        description: "Project visibility updated",
        type: "success",
      });
    } catch (err) {
      console.error("Failed to update visibility", err);
      toast.add({
        title: "Error",
        description: "Failed to update visibility",
        type: "error",
      });
    }
  };

  return (
    <div className="flex-1 gap-8 grid grid-cols-1 lg:grid-cols-3 mx-auto p-8 w-full max-w-max-width">
      {/* Projects Table Section */}
      <div className="space-y-6 lg:col-span-2">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">
              Current Projects
            </h2>
            <p className="mt-1 text-secondary">
              Manage and update your portfolio items.
            </p>
          </div>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-surface-container-low">
                <TableRow>
                  <TableHead className="px-6 font-semibold text-secondary text-xs uppercase">
                    Project Name
                  </TableHead>
                  <TableHead className="px-6 font-semibold text-secondary text-xs uppercase">
                    Category
                  </TableHead>
                  <TableHead className="px-6 font-semibold text-secondary text-xs uppercase">
                    Visible
                  </TableHead>
                  <TableHead className="px-6 font-semibold text-secondary text-xs uppercase">
                    Status
                  </TableHead>
                  <TableHead className="px-6 font-semibold text-secondary text-xs text-right uppercase">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-4 text-secondary text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : projects.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-4 text-secondary text-center"
                    >
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow
                      key={project.id}
                      className="hover:bg-surface-container-low transition-colors"
                    >
                      <TableCell className="px-6 py-4 border-0 font-semibold text-primary">
                        <div className="flex flex-col">
                          <span className="text-on-surface">
                            {project.name}
                          </span>
                          <span className="flex items-center gap-1.5 mt-0.5 font-normal text-secondary text-xs">
                            {project.target_type === "direct" ? (
                              <span className="inline-flex items-center bg-cyan-500/10 px-1.5 py-0.5 rounded font-medium text-[10px] text-cyan-500">
                                Direct ({project.link || "no link"})
                              </span>
                            ) : (
                              <span className="text-[10px] text-muted-foreground">
                                Detail page
                              </span>
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 border-0">
                        <span className="inline-block bg-surface-container-high px-2.5 py-0.5 rounded-full font-medium text-primary text-xs">
                          {project.category || "General"}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 border-0">
                        <Switch
                          checked={project.is_visible}
                          onCheckedChange={(checked) =>
                            handleToggleVisibility(project, checked)
                          }
                        />
                      </TableCell>
                      <TableCell className="px-6 py-4 border-0">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded font-label-code text-label-code text-xs ${
                            project.status === "Live" ||
                            project.status === "Done"
                              ? "bg-[#f1f5f9] text-[#64748b]"
                              : "bg-surface-container-high text-on-surface-variant"
                          }`}
                        >
                          {project.status || "Draft"}
                        </span>
                      </TableCell>
                      <TableCell className="space-x-2 px-6 py-4 border-0 text-right">
                        <Link
                          to={`/admin/projects/${project.id}/edit`}
                          className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                            className:
                              "h-8 w-8 text-secondary hover:text-primary",
                          })}
                        >
                          <span className="text-[20px] material-symbols-outlined">
                            edit
                          </span>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project.id)}
                          className="hover:bg-error/10 w-8 h-8 text-error hover:text-error"
                        >
                          <span className="text-[20px] material-symbols-outlined">
                            delete
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Form Section */}
      <div className="lg:col-span-1">
        <Card className="top-24 sticky">
          <CardHeader className="pb-3">
            <CardTitle>Add New Project</CardTitle>
            <p className="mt-1 text-secondary text-xs">
              Create a standard case study or a direct dummy landing page.
            </p>
          </CardHeader>
          <CardContent>
            {/* Quick Presets */}
            <div className="mb-4 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant space-y-1.5">
              <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block">
                Quick Setup Presets
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={applyPresetLandingPage}
                  className="px-2.5 py-1.5 rounded text-xs bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-medium hover:bg-cyan-500/25 transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                  Landing Demo
                </button>
                <button
                  type="button"
                  onClick={applyPresetStandardProject}
                  className="px-2.5 py-1.5 rounded text-xs bg-surface border border-outline-variant text-secondary font-medium hover:bg-surface-container transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">article</span>
                  Case Study
                </button>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleAddProject}>
              <div className="space-y-1.5">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="e.g. Nova AI Analytics"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="projectCategory">Category</Label>
                <select
                  id="projectCategory"
                  className="bg-surface px-3 py-2 border rounded-md border-outline-variant focus:outline-none focus:ring-2 focus:ring-ring w-full text-on-surface text-sm transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                  {!categoriesList.some((c) => c.name === category) &&
                    category !== "General" && (
                      <option value={category}>{category}</option>
                    )}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Navigation Mode</Label>
                <div className="gap-2 grid grid-cols-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTargetType("direct")}
                    className={`p-2 rounded border text-center transition-all ${
                      targetType === "direct"
                        ? "border-cyan-500/80 bg-cyan-500/15 text-cyan-400 font-semibold"
                        : "border-outline-variant text-secondary hover:bg-surface-container"
                    }`}
                  >
                    Direct Page
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetType("detail")}
                    className={`p-2 rounded border text-center transition-all ${
                      targetType === "detail"
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-outline-variant text-secondary hover:bg-surface-container"
                    }`}
                  >
                    Case Study Detail
                  </button>
                </div>
              </div>

              {targetType === "direct" && (
                <div className="space-y-3 pt-1 border-t border-outline-variant animate-fade-in">
                  <div className="space-y-1">
                    <Label htmlFor="destinationUrl" className="text-xs">
                      Direct Destination URL
                    </Label>
                    <Input
                      id="destinationUrl"
                      placeholder="e.g. /demos/topup or /demos/landingpage1"
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="text-xs"
                    />
                    <p className="text-[11px] text-secondary">
                      Opens immediately when clicked from the homepage.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-1.5 pt-1">
                <Label>Thumbnail Image (Optional)</Label>
                <div
                  className="flex flex-col justify-center items-center bg-surface hover:bg-surface-container-low p-4 border-2 border-dashed rounded-lg border-outline-variant transition-colors cursor-pointer"
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
                    <span className="max-w-full font-body-md font-bold text-primary text-xs text-center truncate">
                      {imageFile.name}
                    </span>
                  ) : (
                    <>
                      <span
                        className="mb-1 text-secondary material-symbols-outlined"
                        style={{ fontSize: "24px" }}
                      >
                        cloud_upload
                      </span>
                      <span className="font-body-md text-secondary text-xs text-center">
                        Upload thumbnail image
                      </span>
                      <span className="mt-0.5 text-outline font-label-caps text-[10px] text-center">
                        PNG, JPG, WEBP (Can also upload later)
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  className="gap-2 w-full text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="text-sm material-symbols-outlined">add</span>
                  {isSubmitting ? "Creating..." : "Initialize Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
