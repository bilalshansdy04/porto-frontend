export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const BASE_URL = API_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API_URL || "http://localhost:8080";

export const getImageUrl = (url: string | undefined | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${IMAGE_BASE_URL}${url}`;
};

export interface Profile {
  summary: string;
  years_of_experience: number;
}

export interface Setting {
  id: number;
  show_experience: boolean;
  show_photo: boolean;
  language: string;
}
export interface ProjectItem {
  text: string;
  is_visible: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  image_url: string;
  is_visible: boolean;
  date_modified: string;
  tech_stack: string[];
  project_flow: ProjectItem[];
  jobdesc: ProjectItem[];
  link?: string;
  carousel_images?: string[];
}

export interface Experience {
  id: number;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  responsibilities: string[];
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface DashboardStats {
  total_projects: number;
  years_of_experience: number;
  summary: string;
  recent_projects: Project[];
}

// Helper to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `API Error: ${response.status} ${response.statusText} - ${errorBody}`,
    );
  }

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return {} as T;
  }

  return response.json();
}

// API Client
export const api = {
  getSettings: () =>
    fetch(`${BASE_URL}/settings`, { cache: "no-store" }).then((res) =>
      handleResponse<Setting>(res),
    ),

  updateSettings: (data: Partial<Setting>) =>
    fetch(`${BASE_URL}/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => handleResponse<Setting>(res)),

  getDashboardStats: () =>
    fetch(`${BASE_URL}/dashboard/stats`).then((res) =>
      handleResponse<DashboardStats>(res),
    ),

  createProfile: (data: Profile) =>
    fetch(`${BASE_URL}/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => handleResponse<Profile>(res)),

  updateProfile: (data: Profile) =>
    fetch(`${BASE_URL}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => handleResponse<Profile>(res)),

  getProjects: () =>
    fetch(`${BASE_URL}/projects`).then((res) => handleResponse<Project[]>(res)),

  getProject: (id: number | string) =>
    fetch(`${BASE_URL}/projects/${id}`).then((res) =>
      handleResponse<Project>(res),
    ),

  createProject: (formData: FormData) =>
    fetch(`${BASE_URL}/projects`, {
      method: "POST",
      body: formData, // fetch automatically sets the correct multipart boundary
    }).then((res) => handleResponse<Project>(res)),

  uploadProjectImages: (id: number | string, formData: FormData) =>
    fetch(`${BASE_URL}/projects/${id}/images`, {
      method: "POST",
      body: formData,
    }).then((res) => handleResponse<Project>(res)),

  uploadProjectThumbnail: (id: number | string, formData: FormData) =>
    fetch(`${BASE_URL}/projects/${id}/thumbnail`, {
      method: "POST",
      body: formData,
    }).then((res) => handleResponse<Project>(res)),

  updateProject: (id: number | string, data: Partial<Project>) =>
    fetch(`${BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => handleResponse<Project>(res)),

  deleteProject: (id: number | string) =>
    fetch(`${BASE_URL}/projects/${id}`, {
      method: "DELETE",
    }).then((res) => handleResponse<{ message: string }>(res)),

  getExperiences: () =>
    fetch(`${BASE_URL}/experiences`).then((res) =>
      handleResponse<Experience[]>(res),
    ),

  createExperience: (data: Partial<Experience>) =>
    fetch(`${BASE_URL}/experiences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => handleResponse<Experience>(res)),

  updateExperience: (id: number | string, data: Partial<Experience>) =>
    fetch(`${BASE_URL}/experiences/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => handleResponse<Experience>(res)),

  deleteExperience: (id: number | string) =>
    fetch(`${BASE_URL}/experiences/${id}`, {
      method: "DELETE",
    }).then((res) => handleResponse<{ message: string }>(res)),

  getSkills: () =>
    fetch(`${BASE_URL}/skills`).then((res) => handleResponse<Skill[]>(res)),

  createSkill: (data: Partial<Skill>) =>
    fetch(`${BASE_URL}/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => handleResponse<Skill>(res)),

  deleteSkill: (id: number | string) =>
    fetch(`${BASE_URL}/skills/${id}`, {
      method: "DELETE",
    }).then((res) => handleResponse<{ message: string }>(res)),
};
