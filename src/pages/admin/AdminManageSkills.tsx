import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { Skill } from "../../services/api";
import { toast } from "@/components/ui/toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  "Bahasa Pemrograman",
  "Framework & Lingkungan",
  "Database & Infrastruktur",
  "Alat Pengembangan (Tools)",
  "Lainnya",
];

export function AdminManageSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await api.getSkills();
      setSkills(data || []);
    } catch (err) {
      console.error("Failed to load skills", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.add({ title: "Validation Error", description: "Skill name is required", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createSkill({ name: name.trim(), category });
      setName("");
      fetchSkills();
    } catch (err) {
      console.error("Failed to add skill", err);
      toast.add({ title: "Error", description: "Failed to add skill", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await api.deleteSkill(id);
      fetchSkills();
    } catch (err) {
      console.error("Failed to delete skill", err);
      toast.add({ title: "Error", description: "Failed to delete skill", type: "error" });
    }
  };

  // Group skills by category for display
  const skillsByCategory = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-max-width mx-auto w-full">
      {/* Skills List Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">
              Technical Arsenal
            </h2>
            <p className="text-secondary mt-1">
              Manage your skills and technologies.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-secondary">
            Loading skills...
          </div>
        ) : (
          <div className="space-y-6">
            {CATEGORIES.map((cat) => (
              <Card key={cat} className="overflow-hidden">
                <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant">
                  <h3 className="font-label-caps text-label-caps text-secondary uppercase">
                    {cat}
                  </h3>
                </div>
                <CardContent className="p-6 flex flex-wrap gap-3">
                  {skillsByCategory[cat].length === 0 ? (
                    <span className="text-body-md text-secondary italic">
                      No skills added yet.
                    </span>
                  ) : (
                    skillsByCategory[cat].map((skill) => (
                      <div
                        key={skill.id}
                        className="group flex items-center gap-2 bg-surface border border-outline-variant rounded-full px-3 py-1.5 transition-all hover:bg-surface-container hover:border-error"
                      >
                        <span className="font-body-md text-primary">
                          {skill.name}
                        </span>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="opacity-0 group-hover:opacity-100 text-secondary hover:text-error transition-all"
                          title="Delete skill"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            close
                          </span>
                        </button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Skill Form Section */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Add New Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleAddSkill}>
              <div className="space-y-2">
                <Label htmlFor="skillCategory">Category</Label>
                <Select
                  value={category}
                  onValueChange={(val) => setCategory(val || CATEGORIES[0])}
                >
                  <SelectTrigger id="skillCategory">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillName">Skill Name</Label>
                <Input
                  id="skillName"
                  placeholder="e.g. React, Go, Docker"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <Button
                  className="w-full gap-2 text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="material-symbols-outlined">add</span>
                  {isSubmitting ? "Adding..." : "Add Skill"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
