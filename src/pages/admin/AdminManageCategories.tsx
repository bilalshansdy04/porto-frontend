import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { Category, Project } from "../../services/api";
import { toast } from "@/components/ui/toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [showOnHome, setShowOnHome] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [catsData, projsData] = await Promise.all([
        api.getCategories(),
        api.getProjects(),
      ]);
      setCategories(catsData || []);
      setProjects(projsData || []);
      setDisplayOrder((catsData?.length || 0) + 1);
    } catch (err) {
      console.error("Failed to load category data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingId) {
      setSlug(slugify(val));
    }
  };

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setDisplayOrder(categories.length + 1);
    setShowOnHome(true);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.add({
        title: "Validation Error",
        description: "Category name is required",
        type: "error",
      });
      return;
    }

    const finalSlug = slug.trim() ? slugify(slug) : slugify(name);

    setIsSubmitting(true);
    try {
      if (editingId) {
        await api.updateCategory(editingId, {
          name: name.trim(),
          slug: finalSlug,
          description: description.trim(),
          display_order: Number(displayOrder) || 1,
          show_on_home: showOnHome,
        });
        toast.add({
          title: "Success",
          description: "Category updated successfully",
          type: "success",
        });
      } else {
        await api.createCategory({
          name: name.trim(),
          slug: finalSlug,
          description: description.trim(),
          display_order: Number(displayOrder) || 1,
          show_on_home: showOnHome,
        });
        toast.add({
          title: "Success",
          description: "New category created successfully",
          type: "success",
        });
      }
      resetForm();
      loadData();
    } catch (err) {
      console.error("Failed to save category", err);
      toast.add({
        title: "Error",
        description: "Failed to save category",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setDisplayOrder(cat.display_order);
    setShowOnHome(cat.show_on_home);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.deleteCategory(id);
      toast.add({
        title: "Success",
        description: "Category deleted",
        type: "success",
      });
      if (editingId === id) resetForm();
      loadData();
    } catch (err) {
      console.error("Failed to delete category", err);
      toast.add({
        title: "Error",
        description: "Failed to delete category",
        type: "error",
      });
    }
  };

  const handleToggleHome = async (cat: Category, nextVal: boolean) => {
    try {
      await api.updateCategory(cat.id, { show_on_home: nextVal });
      setCategories((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, show_on_home: nextVal } : c))
      );
      toast.add({
        title: "Updated",
        description: `Homepage display ${nextVal ? "enabled" : "hidden"} for ${cat.name}`,
        type: "success",
      });
    } catch (err) {
      console.error("Failed to update visibility", err);
    }
  };

  // Compute project count per category
  const getProjectCount = (categoryName: string, categorySlug: string) => {
    return projects.filter(
      (p) =>
        p.category?.toLowerCase() === categoryName.toLowerCase() ||
        p.category?.toLowerCase() === categorySlug.toLowerCase()
    ).length;
  };

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-max-width mx-auto w-full">
      {/* Category List Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">
              Project Categories
            </h2>
            <p className="text-secondary mt-1">
              Organize projects into distinct groups (e.g. MSJ, Dummy Landing Page, Fullstack).
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
              <TableHeader className="bg-surface-container-low">
                <TableRow>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6">
                    Category Name & Slug
                  </TableHead>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6 text-center">
                    Projects
                  </TableHead>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6 text-center">
                    Order
                  </TableHead>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6 text-center">
                    Show on Home
                  </TableHead>
                  <TableHead className="uppercase text-xs font-semibold text-secondary px-6 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-secondary">
                      Loading categories...
                    </TableCell>
                  </TableRow>
                ) : categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-secondary">
                      No categories found. Create your first category on the right.
                    </TableCell>
                  </TableRow>
                ) : (
                  categories
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((cat) => {
                      const count = getProjectCount(cat.name, cat.slug);
                      return (
                        <TableRow
                          key={cat.id}
                          className="hover:bg-surface-container-low transition-colors"
                        >
                          <TableCell className="px-6 py-4 font-semibold text-primary">
                            <div className="flex flex-col">
                              <span className="text-base text-on-surface">{cat.name}</span>
                              <span className="font-mono text-xs text-secondary mt-0.5">
                                /{cat.slug}
                              </span>
                              {cat.description && (
                                <span className="text-xs text-on-surface-variant line-clamp-1 mt-1 font-normal">
                                  {cat.description}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-center">
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container-highest text-primary">
                              {count} {count === 1 ? "project" : "projects"}
                            </span>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-center font-mono text-sm text-secondary">
                            #{cat.display_order}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={cat.show_on_home}
                                onCheckedChange={(val) => handleToggleHome(cat, val)}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStartEdit(cat)}
                                className="h-8 px-2.5 text-xs"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(cat.id)}
                                className="text-error hover:bg-error-container hover:text-error h-8 w-8"
                                title="Delete category"
                              >
                                <span className="material-symbols-outlined text-sm">
                                  delete
                                </span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add / Edit Form Column */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-title-lg text-title-lg text-primary">
              {editingId ? "Edit Category" : "Add New Category"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="catName" className="block text-secondary mb-1">
                  Category Name
                </Label>
                <Input
                  id="catName"
                  placeholder="e.g. Dummy Landing Page, MSJ"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="catSlug" className="block text-secondary mb-1">
                  URL Slug
                </Label>
                <div className="flex items-center">
                  <span className="text-secondary text-sm font-mono mr-1">/</span>
                  <Input
                    id="catSlug"
                    placeholder="dummy-landing-page"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    required
                  />
                </div>
                <p className="text-[11px] text-secondary mt-1 font-mono">
                  Used for routes: /category/{slug || "slug"}
                </p>
              </div>

              <div>
                <Label htmlFor="catDesc" className="block text-secondary mb-1">
                  Description (Optional)
                </Label>
                <Textarea
                  id="catDesc"
                  placeholder="Short description displayed on category pages..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="displayOrder" className="block text-secondary mb-1">
                    Display Order
                  </Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 1)}
                  />
                </div>

                <div>
                  <Label className="block text-secondary mb-2">
                    Show on Home
                  </Label>
                  <div className="flex items-center gap-2 pt-1">
                    <Switch
                      checked={showOnHome}
                      onCheckedChange={setShowOnHome}
                      id="showOnHome"
                    />
                    <label htmlFor="showOnHome" className="text-xs text-secondary cursor-pointer">
                      {showOnHome ? "Visible" : "Hidden"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting
                    ? "Saving..."
                    : editingId
                    ? "Update Category"
                    : "Add Category"}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
