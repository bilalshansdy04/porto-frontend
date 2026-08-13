import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { Project } from "../../services/api";
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
    if (!name.trim()) {
      toast.add({ title: "Validation Error", description: "Project name is required", type: "error" });
      return;
    }
    if (!imageFile) {
      toast.add({ title: "Validation Error", description: "Image is required", type: "error" });
      return;
    }

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
      toast.add({ title: "Error", description: "Failed to create project", type: "error" });
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
      toast.add({ title: "Error", description: "Failed to delete project", type: "error" });
    }
  };

  const handleToggleVisibility = async (project: Project, is_visible: boolean) => {
    try {
      await api.updateProject(project.id, { ...project, is_visible });
      setProjects(projects.map(p => p.id === project.id ? { ...p, is_visible } : p));
      toast.add({ title: "Success", description: "Project visibility updated", type: "success" });
    } catch (err) {
      console.error("Failed to update visibility", err);
      toast.add({ title: "Error", description: "Failed to update visibility", type: "error" });
    }
  };

  return (
    <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-max-width mx-auto w-full">
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
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-surface-container-low">
                <TableRow>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6">
                    Project Name
                  </TableHead>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6">
                    Visible
                  </TableHead>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6">
                    Status
                  </TableHead>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-4 text-secondary"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : projects.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-4 text-secondary"
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
                      <TableCell className="px-6 py-4 font-semibold text-primary flex items-center gap-2 border-0">
                        {project.name}
                      </TableCell>
                      <TableCell className="px-6 py-4 border-0">
                        <Switch
                          checked={project.is_visible}
                          onCheckedChange={(checked) => handleToggleVisibility(project, checked)}
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
                      <TableCell className="px-6 py-4 text-right space-x-2 border-0">
                        <Link
                          to={`/admin/projects/${project.id}/edit`}
                          className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                            className:
                              "h-8 w-8 text-secondary hover:text-primary",
                          })}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project.id)}
                          className="h-8 w-8 text-error hover:text-error hover:bg-error/10"
                        >
                          <span className="material-symbols-outlined text-[20px]">
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
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleAddProject}>
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="e.g. Distributed Database"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Image</Label>
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
                <Button
                  className="w-full gap-2 text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="material-symbols-outlined">add</span>
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
