import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, getImageUrl } from "../../services/api";
import type { Project } from "../../services/api";

import { ImageCropperModal } from "../../components/admin/ImageCropperModal";
import { toast } from "@/components/ui/toast";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


const SimpleArrayField = ({
  label,
  inputState,
  setInputState,
  listState,
  setListState,
  placeholder,
}: any) => (
  <div className="border-t border-outline-variant pt-4 mt-4">
    <Label className="block text-secondary mb-2 uppercase font-semibold text-xs">
      {label}
    </Label>
    <div className="flex gap-2 mb-4">
      <Input
        className="flex-1"
        placeholder={placeholder}
        type="text"
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const text = inputState.trim();
            if (text) {
              setListState([...listState, text]);
              setInputState("");
            }
          }
        }}
      />
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          const text = inputState.trim();
          if (text) {
            setListState([...listState, text]);
            setInputState("");
          }
        }}
      >
        <span className="material-symbols-outlined text-sm mr-1">add</span> Add
      </Button>
    </div>
    <ul className="flex flex-col gap-2">
      {listState.map((item: string, idx: number) => (
        <li
          key={idx}
          className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-outline-variant animate-fade-in"
        >
          <div className="w-1.5 h-1.5 bg-brand-blue shrink-0 rounded-full"></div>
          <span className="text-sm flex-1">{item}</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-error hover:bg-error-container hover:text-error h-8 w-8"
            title="Remove"
            type="button"
            onClick={() => setListState(listState.filter((_: any, i: number) => i !== idx))}
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </Button>
        </li>
      ))}
    </ul>
  </div>
);

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
    <Label className="block text-secondary mb-2 uppercase font-semibold text-xs">
      {label}
    </Label>
    <div className="flex gap-2 mb-4">
      <Input
        className="flex-1"
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
      <Button
        variant="outline"
        type="button"
        onClick={() =>
          handleAddItem(inputState, setInputState, listState, setListState)
        }
      >
        <span className="material-symbols-outlined text-sm mr-1">add</span> Add
      </Button>
    </div>
    <ul className="flex flex-col gap-2">
      {listState.map((item: any, idx: number) => (
        <li
          key={idx}
          className="flex items-center gap-3 p-3 bg-surface-container-low rounded border border-outline-variant animate-fade-in"
        >
          <div className="w-1.5 h-1.5 bg-brand-blue shrink-0 rounded-full"></div>
          <span className="text-sm flex-1">
            {item.text}
          </span>
          <div className="flex items-center gap-2">
            <Switch
              checked={item.is_visible}
              onCheckedChange={(checked) => {
                const newList = [...listState];
                newList[idx].is_visible = checked;
                setListState(newList);
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-error hover:bg-error-container hover:text-error h-8 w-8"
              title="Remove"
              type="button"
              onClick={() => handleRemoveItem(idx, listState, setListState)}
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </Button>
          </div>
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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");
  const [link, setLink] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [projectFlowInput, setProjectFlowInput] = useState("");
  const [projectFlow, setProjectFlow] = useState<any[]>([]);
  const [jobdescInput, setJobdescInput] = useState("");
  const [jobdesc, setJobdesc] = useState<any[]>([]);
  const [screenshots, setScreenshots] = useState<{id?: number, project_id?: number, image_url: string, title: string}[]>([]);
  const [confirmedTitles, setConfirmedTitles] = useState<number[]>([]);
  const [screenshotToDelete, setScreenshotToDelete] = useState<{ index: number, id?: number } | null>(null);
  const [isDeletingScreenshot, setIsDeletingScreenshot] = useState(false);


  // Cropper states
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      api
        .getProject(id)
        .then((data) => {
          setProject(data);
          setName(data.name || "");
          setDescription(data.description || "");
          setStatus(data.status || "Draft");
          setLink(data.link || "");
          setTechStack(data.tech_stack || []);
          setProjectFlow(data.project_flow || []);
          setJobdesc(data.jobdesc || []);
          setScreenshots(data.screenshots || []);
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
    listState: any[],
    setListState: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    const text = inputState.trim();
    if (text) {
      setListState([...listState, { text, is_visible: true }]);
      setInputState("");
    }
  };

  const handleRemoveItem = (
    index: number,
    listState: any[],
    setListState: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    setListState(listState.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCropImageSrc(reader.result?.toString() || null);
      });
      reader.readAsDataURL(file);
      e.target.value = ""; // Reset input
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    const formData = new FormData();
    formData.append("images", croppedBlob, "carousel-image.jpg");
    try {
      const updatedProject = await api.uploadProjectImages(id!, formData);
      setScreenshots(updatedProject.screenshots || []);
      setCropImageSrc(null); // Close modal
      toast.add({ title: "Success", description: "Image cropped and uploaded successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to upload cropped image", err);
      toast.add({ title: "Error", description: "Failed to upload image.", type: "error" });
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      try {
        const updatedProject = await api.uploadProjectThumbnail(id!, formData);
        setProject(updatedProject);
        toast.add({ title: "Success", description: "Main thumbnail uploaded successfully!", type: "success" });
      } catch (err) {
        console.error("Failed to upload thumbnail", err);
        toast.add({ title: "Error", description: "Failed to upload thumbnail.", type: "error" });
      }
      e.target.value = ""; // Reset input
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateProject(id!, {
        name,
        description,
        status,
        link,
        tech_stack: techStack,
        project_flow: projectFlow,
        jobdesc: jobdesc,
        screenshots: screenshots,
        is_visible: project?.is_visible ?? false,
      });
      // Navigate back to project list
      navigate("/admin/projects");
    } catch (err) {
      console.error("Failed to update project", err);
      toast.add({ title: "Error", description: "Failed to update project details.", type: "error" });
    }
  };

  return (
    <main className="flex-1 p-8 max-w-max-width mx-auto w-full">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2 flex items-center gap-2">
            Edit Project: {project.name}
            {!project.is_visible && (
              <span className="bg-[#fef08a] text-[#854d0e] text-sm px-2 py-1 rounded font-bold ml-2">
                Hidden
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
              <Label className="block text-secondary mb-2 uppercase font-semibold text-xs">
                Project Name
              </Label>
              <Input
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label className="block text-secondary mb-2 uppercase font-semibold text-xs">
                Description
              </Label>
              <Textarea
                placeholder="Detailed project description..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
              />
            </div>

            <div>
              <Label className="block text-secondary mb-2 uppercase font-semibold text-xs">
                Status
              </Label>
              <select
                className="w-full bg-surface border border-outline-variant rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Live">Live</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Label className="block text-secondary mb-2 uppercase font-semibold text-xs">
                External Link (Optional)
              </Label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>

          <SimpleArrayField
            label="Tech Stack"
            inputState={techStackInput}
            setInputState={setTechStackInput}
            listState={techStack}
            setListState={setTechStack}
            placeholder="e.g. React, Go, MySQL"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-outline-variant p-4 rounded-lg bg-surface-container-lowest">
              <Label className="block text-secondary mb-2 uppercase font-semibold text-xs">
                Main Thumbnail
              </Label>
              {project.image_url ? (
                <div className="mb-4">
                  <img src={getImageUrl(project.image_url)} alt="Thumbnail" className="w-full h-40 object-cover rounded-md border border-outline-variant" />
                </div>
              ) : (
                <div className="mb-4 text-error text-sm font-semibold">
                  No Thumbnail Uploaded
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="cursor-pointer file:cursor-pointer"
              />
            </div>
          </div>

          <div className="border-t border-outline-variant pt-4 mt-4">
            <Label className="block text-secondary mb-2 uppercase font-semibold text-xs">
              Add Screenshot Image (21:9)
            </Label>
            <div className="mb-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer file:cursor-pointer"
              />
            </div>
            {screenshots.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {screenshots.map((shot, idx) => (
                  <div key={idx} className="flex flex-col gap-2 p-3 border border-outline-variant rounded-lg bg-surface-container">
                    <div className="relative group rounded-lg overflow-hidden border border-outline-variant aspect-[21/9]">
                      <img src={getImageUrl(shot.image_url)} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => setScreenshotToDelete({ index: idx, id: shot.id })}
                          title="Remove Image"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Label className="block text-secondary mb-1 text-xs font-semibold uppercase">Title</Label>
                      <div className="flex gap-2">
                        <Input
                          className="flex-1"
                          type="text"
                          placeholder="Screenshot title (mandatory)"
                          value={shot.title}
                          onChange={(e) => {
                            const newScreenshots = [...screenshots];
                            newScreenshots[idx].title = e.target.value;
                            setScreenshots(newScreenshots);
                            if (confirmedTitles.includes(idx)) {
                              setConfirmedTitles(confirmedTitles.filter(id => id !== idx));
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant={confirmedTitles.includes(idx) ? "default" : "outline"}
                          className={confirmedTitles.includes(idx) ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                          onClick={async () => {
                            if (!shot.title.trim()) {
                              toast.add({ title: "Validation Error", description: "Title cannot be empty.", type: "error" });
                              return;
                            }
                            if (shot.id) {
                              try {
                                await api.updateScreenshotTitle(shot.id, shot.title);
                                if (!confirmedTitles.includes(idx)) {
                                  setConfirmedTitles([...confirmedTitles, idx]);
                                }
                                toast.add({ title: "Saved", description: "Title securely saved to database!", type: "success" });
                              } catch (e) {
                                toast.add({ title: "Error", description: "Failed to save title.", type: "error" });
                              }
                            } else {
                               if (!confirmedTitles.includes(idx)) {
                                  setConfirmedTitles([...confirmedTitles, idx]);
                               }
                               toast.add({ title: "Confirmed", description: "Title marked locally.", type: "success" });
                            }
                          }}
                        >
                          {confirmedTitles.includes(idx) ? (
                            <span className="material-symbols-outlined text-sm">check</span>
                          ) : (
                            "OK"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-outline-variant">
            <Button
              variant="ghost"
              type="button"
              onClick={() => navigate("/admin/projects")}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              Save Details
            </Button>
          </div>
        </form>
      </div>

      {cropImageSrc && (
        <ImageCropperModal
          imageSrc={cropImageSrc}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropImageSrc(null)}
        />
      )}

      {screenshotToDelete && (
        <Dialog open={true} onOpenChange={(open) => { if (!open) setScreenshotToDelete(null); }}>
          <DialogContent className="max-w-sm p-6 bg-surface sm:rounded-xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-headline-md text-headline-md text-error flex items-center gap-2">
                <span className="material-symbols-outlined">warning</span>
                Delete Screenshot?
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-secondary mb-6">
              Are you sure you want to delete this screenshot? This action cannot be undone and will permanently remove the image from the database and Cloudinary.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => setScreenshotToDelete(null)} disabled={isDeletingScreenshot}>Cancel</Button>
              <Button
                variant="destructive"
                type="button"
                className="bg-error text-white hover:bg-error/90 disabled:opacity-70 flex items-center gap-2"
                disabled={isDeletingScreenshot}
                onClick={async () => {
                  setIsDeletingScreenshot(true);
                  try {
                    if (screenshotToDelete.id) {
                      await api.deleteScreenshot(screenshotToDelete.id);
                    }
                    setScreenshots(screenshots.filter((_, i) => i !== screenshotToDelete.index));
                    toast.add({ title: "Deleted", description: "Screenshot removed successfully.", type: "success" });
                    setScreenshotToDelete(null);
                  } catch (e) {
                    toast.add({ title: "Error", description: "Failed to delete screenshot.", type: "error" });
                  } finally {
                    setIsDeletingScreenshot(false);
                  }
                }}
              >
                {isDeletingScreenshot ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : <span className="material-symbols-outlined text-sm">delete</span>}
                {isDeletingScreenshot ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
