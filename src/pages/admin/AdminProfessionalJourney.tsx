import { useState } from "react";

export function AdminProfessionalJourney() {
  const [responsibilities, setResponsibilities] = useState<string[]>([
    "Spearheaded the migration to a modern React stack, improving load times by 40%.",
  ]);
  const [inputValue, setInputValue] = useState("");

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
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-body-lg text-body-lg font-bold text-primary">
                Senior Developer
              </h4>
              <span className="font-label-code text-label-code bg-surface-container px-2 py-1 rounded text-secondary">
                2021 - Present
              </span>
            </div>
            <p className="font-body-md text-body-md text-secondary">
              Tech Solutions Inc.
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow opacity-70">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-body-lg text-body-lg font-bold text-primary">
                Frontend Engineer
              </h4>
              <span className="font-label-code text-label-code bg-surface-container px-2 py-1 rounded text-secondary">
                2018 - 2021
              </span>
            </div>
            <p className="font-body-md text-body-md text-secondary">
              Creative Agency
            </p>
          </div>
        </div>
        {/* Add/Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
            <h3 className="font-headline-md text-headline-md text-primary mb-6">
              Add New Experience
            </h3>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                    Company Name
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"
                    placeholder="e.g. Acme Corp"
                    type="text"
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
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                    Start Date
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-label-code text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"
                    type="month"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                    End Date
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-label-code text-primary focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10 transition-all"
                    type="month"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      className="rounded border-outline-variant text-primary focus:ring-primary"
                      id="current-role"
                      type="checkbox"
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
                >
                  Cancel
                </button>
                <button
                  className="bg-[#1e293b] text-white px-6 py-3 rounded-lg font-body-md font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  type="button" // Changed from submit so it won't reload
                >
                  <span className="material-symbols-outlined text-sm">
                    save
                  </span>
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
