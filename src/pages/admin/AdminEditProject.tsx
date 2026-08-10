import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { Project } from "../../services/api";

const ArrayField = ({
  label,
  inputState,
  setInputState,
  listState,
  setListState,
  placeholder,
  handleAddItem,
  handleRemoveItem,
}: any) => (
  <div className="border-t border-outline-variant pt-4 mt-4">
    <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
      {label}
    </label>
    <div className="flex gap-2 mb-4">
      <input
        className="flex-1 bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
        placeholder={placeholder}
        type="text"
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddItem(inputState, setInputState, listState, setListState);
          }
        }}
      />
      <button
        className="border border-secondary text-secondary px-4 py-2 rounded-lg font-body-md font-semibold hover:bg-surface-container-low transition-all flex items-center gap-1"
        type="button"
        onClick={() =>
          handleAddItem(inputState, setInputState, listState, setListState)
        }
      >
        <span className="material-symbols-outlined text-sm">add</span> Add
      </button>
    </div>
    <ul className="flex flex-col gap-2">
      {listState.map((item: string, idx: number) => (
        <li
          key={idx}
          className="flex items-start gap-3 p-3 bg-surface-container-low rounded border border-outline-variant animate-fade-in"
        >
          <div className="w-1.5 h-1.5 bg-brand-blue mt-2 shrink-0"></div>
          <span className="font-body-md text-body-md text-on-surface flex-1">
            {item}
          </span>
          <button
            className="text-error hover:bg-error-container p-1 rounded transition-colors"
            title="Remove"
            type="button"
            onClick={() => handleRemoveItem(idx, listState, setListState)}
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export function AdminEditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");
  const [techStackInput, setTechStackInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [projectFlowInput, setProjectFlowInput] = useState("");
  const [projectFlow, setProjectFlow] = useState<string[]>([]);
  const [jobdescInput, setJobdescInput] = useState("");
  const [jobdesc, setJobdesc] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      api
        .getProject(id)
        .then((data) => {
          setProject(data);
          setDescription(data.description || "");
          setStatus(data.status || "Draft");
          setTechStack(data.tech_stack || []);
          setProjectFlow(data.project_flow || []);
          setJobdesc(data.jobdesc || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching project:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="p-8">Loading project details...</div>;
  if (!project) return <div className="p-8 text-error">Project not found</div>;

  const handleAddItem = (
    inputState: string,
    setInputState: React.Dispatch<React.SetStateAction<string>>,
    listState: string[],
    setListState: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const text = inputState.trim();
    if (text) {
      setListState([...listState, text]);
      setInputState("");
    }
  };

  const handleRemoveItem = (
    index: number,
    listState: string[],
    setListState: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setListState(listState.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateProject(id!, {
        description,
        status,
        tech_stack: techStack,
        project_flow: projectFlow,
        jobdesc: jobdesc,
        is_complete: true,
      });
      // Navigate back to project list
      navigate("/admin/projects");
    } catch (err) {
      console.error("Failed to update project", err);
      alert("Failed to update project details.");
    }
  };

  // Removed inner ArrayField

  return (
    <main className="flex-1 p-8 max-w-max-width mx-auto w-full">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2 flex items-center gap-2">
            Edit Project: {project.name}
            {!project.is_complete && (
              <span className="bg-[#fef08a] text-[#854d0e] text-sm px-2 py-1 rounded font-bold ml-2">
                Needs Completion
              </span>
            )}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Update project details to make it available in the portfolio.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                Description
              </label>
              <textarea
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all resize-none"
                placeholder="Detailed project description..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-2 uppercase">
                Status
              </label>
              <select
                className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2 font-body-md text-primary focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Live">Live</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <ArrayField
            label="Tech Stack"
            inputState={techStackInput}
            setInputState={setTechStackInput}
            listState={techStack}
            setListState={setTechStack}
            placeholder="e.g. React, Go, MySQL"
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />

          <ArrayField
            label="Project Flow"
            inputState={projectFlowInput}
            setInputState={setProjectFlowInput}
            listState={projectFlow}
            setListState={setProjectFlow}
            placeholder="e.g. System Design, Implementation"
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />

          <ArrayField
            label="Job Description"
            inputState={jobdescInput}
            setInputState={setJobdescInput}
            listState={jobdesc}
            setListState={setJobdesc}
            placeholder="e.g. Lead Frontend Developer"
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-outline-variant">
            <button
              className="font-body-md text-body-md text-secondary hover:text-primary transition-colors py-2 px-4"
              type="button"
              onClick={() => navigate("/admin/projects")}
            >
              Cancel
            </button>
            <button
              className="bg-brand-navy text-white px-6 py-3 rounded-lg font-body-md font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              Save Details
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
