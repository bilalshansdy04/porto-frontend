import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { Skill } from "../../services/api";

const CATEGORIES = [
  "Bahasa Pemrograman",
  "Framework & Lingkungan",
  "Database & Infrastruktur",
  "Alat Pengembangan (Tools)",
  "Lainnya"
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
    if (!name.trim()) return alert("Skill name is required");

    setIsSubmitting(true);
    try {
      await api.createSkill({ name: name.trim(), category });
      setName("");
      fetchSkills();
    } catch (err) {
      console.error("Failed to add skill", err);
      alert("Failed to add skill");
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
      alert("Failed to delete skill");
    }
  };

  // Group skills by category for display
  const skillsByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
          <div className="p-8 text-center text-secondary">Loading skills...</div>
        ) : (
          <div className="space-y-6">
            {CATEGORIES.map(cat => (
              <div key={cat} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden interactive-hover">
                <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant">
                  <h3 className="font-label-caps text-label-caps text-secondary uppercase">
                    {cat}
                  </h3>
                </div>
                <div className="p-6 flex flex-wrap gap-3">
                  {skillsByCategory[cat].length === 0 ? (
                    <span className="text-body-md text-secondary italic">No skills added yet.</span>
                  ) : (
                    skillsByCategory[cat].map(skill => (
                      <div key={skill.id} className="group flex items-center gap-2 bg-surface border border-outline-variant rounded-full px-3 py-1.5 transition-all hover:bg-surface-container hover:border-error">
                        <span className="font-body-md text-primary">{skill.name}</span>
                        <button 
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="opacity-0 group-hover:opacity-100 text-secondary hover:text-error transition-all"
                          title="Delete skill"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Skill Form Section */}
      <div className="lg:col-span-1">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sticky top-24 interactive-hover">
          <h3 className="font-headline-md text-headline-md text-primary mb-6">
            Add New Skill
          </h3>
          <form className="space-y-5" onSubmit={handleAddSkill}>
            <div>
              <label className="block font-label-code text-label-code text-secondary mb-2" htmlFor="skillCategory">
                Category
              </label>
              <select
                id="skillCategory"
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block font-label-code text-label-code text-secondary mb-2" htmlFor="skillName">
                Skill Name
              </label>
              <input
                id="skillName"
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
                placeholder="e.g. React, Go, Docker"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="pt-4">
              <button
                className={`w-full bg-brand-navy text-white font-body-md font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                type="submit"
                disabled={isSubmitting}
              >
                <span className="material-symbols-outlined">add</span>
                {isSubmitting ? 'Adding...' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
