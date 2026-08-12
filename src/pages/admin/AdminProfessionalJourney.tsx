import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { Experience } from "../../services/api";
import { toast } from "@/components/ui/toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function AdminProfessionalJourney() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await api.getExperiences();
      setExperiences(data || []);
    } catch (err) {
      console.error("Failed to load experiences", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResp = () => {
    const text = inputValue.trim();
    if (text) {
      setResponsibilities([...responsibilities, text]);
      setInputValue("");
    }
  };

  const handleRemoveResp = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddResp();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !role.trim() || !startDate.trim()) {
      toast.add({ title: "Validation Error", description: "Company, Role, and Start Date are required.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createExperience({
        company_name: companyName,
        role: role,
        start_date: startDate,
        end_date: isCurrent ? "" : endDate,
        is_current: isCurrent,
        responsibilities: responsibilities,
      });

      // Reset form
      setCompanyName("");
      setRole("");
      setStartDate("");
      setEndDate("");
      setIsCurrent(false);
      setResponsibilities([]);

      fetchExperiences();
    } catch (err) {
      console.error("Failed to save experience", err);
      toast.add({ title: "Error", description: "Failed to save experience.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this experience?"))
      return;
    try {
      await api.deleteExperience(id);
      fetchExperiences();
    } catch (err) {
      console.error("Failed to delete experience", err);
      toast.add({ title: "Error", description: "Failed to delete experience.", type: "error" });
    }
  };

  return (
    <main className="flex-1 p-8 max-w-max-width mx-auto w-full">
      <div className="mb-8">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
          Professional Journey
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Manage your work experience timeline.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Existing Experiences List */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="font-headline-md text-headline-md text-primary border-b border-outline-variant pb-2">
            Current Entries
          </h3>
          {loading ? (
            <p className="text-secondary">Loading...</p>
          ) : experiences.length === 0 ? (
            <p className="text-secondary">No experiences found.</p>
          ) : (
            experiences.map((exp) => (
              <Card
                key={exp.id}
                className="relative group hover:shadow-md transition-shadow"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(exp.id)}
                  className="absolute top-2 right-2 text-error opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:text-error hover:bg-error/10"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </Button>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2 pr-6">
                    <h4 className="font-body-lg text-body-lg font-bold text-primary">
                      {exp.role}
                    </h4>
                    <span className="font-label-code text-label-code bg-surface-container px-2 py-1 rounded text-secondary whitespace-nowrap ml-2">
                      {exp.start_date} -{" "}
                      {exp.is_current ? "Present" : exp.end_date}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-secondary">
                    {exp.company_name}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {/* Add/Edit Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Add New Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-semibold text-secondary">
                      Company Name
                    </Label>
                    <Input
                      placeholder="e.g. Acme Corp"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-semibold text-secondary">
                      Role / Position
                    </Label>
                    <Input
                      placeholder="e.g. Software Engineer"
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-xs font-semibold text-secondary">
                      Start Date
                    </Label>
                    <Input
                      type="month"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 flex flex-col justify-start">
                    <Label className="uppercase text-xs font-semibold text-secondary">
                      End Date
                    </Label>
                    <Input
                      type="month"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      disabled={isCurrent}
                    />
                    <div className="mt-3 flex items-center space-x-2">
                      <Checkbox
                        id="current-role"
                        checked={isCurrent}
                        onCheckedChange={(checked) =>
                          setIsCurrent(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="current-role"
                        className="font-normal text-secondary cursor-pointer"
                      >
                        I currently work here
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-outline-variant pt-6 mt-2">
                  <Label className="uppercase text-xs font-semibold text-secondary block mb-4">
                    Responsibilities & Achievements
                  </Label>
                  <div className="flex gap-2 mb-4">
                    <Input
                      className="flex-1"
                      id="resp-input"
                      placeholder="Describe a key responsibility or achievement..."
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleAddResp}
                      className="gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">
                        add
                      </span>{" "}
                      Add
                    </Button>
                  </div>
                  <ul className="flex flex-col gap-2 mt-4" id="resp-list">
                    {responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-surface-container-low rounded border border-outline-variant animate-fade-in"
                      >
                        <div className="w-1.5 h-1.5 bg-[#3b82f6] mt-2 shrink-0 rounded-full"></div>
                        <span className="font-body-md text-body-md text-on-surface flex-1">
                          {resp}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-error hover:bg-error-container hover:text-error"
                          title="Remove"
                          type="button"
                          onClick={() => handleRemoveResp(idx)}
                        >
                          <span className="material-symbols-outlined text-sm">
                            close
                          </span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-outline-variant">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      setCompanyName("");
                      setRole("");
                      setStartDate("");
                      setEndDate("");
                      setIsCurrent(false);
                      setResponsibilities([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="gap-2 text-white"
                    disabled={isSubmitting}
                  >
                    <span className="material-symbols-outlined text-sm">
                      save
                    </span>
                    {isSubmitting ? "Saving..." : "Save Experience"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
