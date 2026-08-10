import { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { Experience } from "../../services/api";

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
    if (!companyName || !role || !startDate) {
      return alert("Company, Role, and Start Date are required.");
    }

    setIsSubmitting(true);
    try {
      await api.createExperience({
        company_name: companyName,
        role: role,
        start_date: startDate,
        end_date: isCurrent ? "" : endDate,
        is_current: isCurrent,
        responsibilities: responsibilities
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
      alert("Failed to save experience.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      await api.deleteExperience(id);
      fetchExperiences();
    } catch (err) {
      console.error("Failed to delete experience", err);
      alert("Failed to delete experience");
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
            <p>Loading...</p>
          ) : experiences.length === 0 ? (
            <p className="text-secondary">No experiences found.</p>
          ) : (
            experiences.map(exp => (
              <div key={exp.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 hover:shadow-md transition-shadow relative group">
                <button 
                  onClick={() => handleDelete(exp.id)}
                  className="absolute top-2 right-2 text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-surface-container hover:bg-error-container rounded"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <div className="flex justify-between items-start mb-2 pr-6">
                  <h4 className="font-body-lg text-body-lg font-bold text-primary">
                    {exp.role}
                  </h4>
                  <span className="font-label-code text-label-code bg-surface-container px-2 py-1 rounded text-secondary whitespace-nowrap ml-2">
                    {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-secondary">
                  {exp.company_name}
                </p>
              </div>
            ))
          )}
        </div>
        {/* Add/Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
            <h3 className="font-headline-md text-headline-md text-primary mb-6">
              Add New Experience
            </h3>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                    Company Name
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"
                    placeholder="e.g. Acme Corp"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                    Role / Position
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"
                    placeholder="e.g. Software Engineer"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                    Start Date
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-label-code text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"
                    type="month"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                    End Date
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-label-code text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all disabled:opacity-50"
                    type="month"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={isCurrent}
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      className="rounded border-outline-variant text-primary focus:ring-primary"
                      id="current-role"
                      type="checkbox"
                      checked={isCurrent}
                      onChange={(e) => setIsCurrent(e.target.checked)}
                    />
                    <label
                      className="font-body-md text-body-md text-secondary cursor-pointer"
                      htmlFor="current-role"
                    >
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-6 mt-2">
                <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                  Responsibilities & Achievements
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    className="flex-1 bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"
                    id="resp-input"
                    placeholder="Describe a key responsibility or achievement..."
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <button
                    className="border border-[#505f76] text-[#505f76] px-4 py-2 rounded-lg font-body-md font-semibold hover:bg-surface-container-low transition-all flex items-center gap-1"
                    id="add-resp-btn"
                    type="button"
                    onClick={handleAddResp}
                  >
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>{" "}
                    Add
                  </button>
                </div>
                <ul className="flex flex-col gap-2 mt-4" id="resp-list">
                  {responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-surface-container-low rounded border border-outline-variant animate-fade-in"
                    >
                      <div className="w-1.5 h-1.5 bg-[#3b82f6] mt-2 shrink-0"></div>
                      <span className="font-body-md text-body-md text-on-surface flex-1">
                        {resp}
                      </span>
                      <button
                        className="text-error hover:bg-error-container p-1 rounded transition-colors remove-btn"
                        title="Remove"
                        type="button"
                        onClick={() => handleRemoveResp(idx)}
                      >
                        <span className="material-symbols-outlined text-sm">
                          close
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-outline-variant">
                <button
                  className="font-body-md text-body-md text-secondary hover:text-primary transition-colors py-2 px-4"
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
                </button>
                <button
                  className={`bg-[#1e293b] text-white px-6 py-3 rounded-lg font-body-md font-semibold transition-opacity flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="material-symbols-outlined text-sm">
                    save
                  </span>
                  {isSubmitting ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
