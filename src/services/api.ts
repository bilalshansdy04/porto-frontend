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
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  display_order: number;
  show_on_home: boolean;
  project_count?: number;
}

export type ProjectTargetType = "detail" | "direct";

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
  screenshots?: { id?: number, project_id?: number, image_url: string, title: string }[];
  category?: string;
  category_id?: number;
  target_type?: ProjectTargetType;
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

  updateScreenshotTitle: (id: number | string, title: string) =>
    fetch(`${BASE_URL}/screenshots/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then((res) => handleResponse<{ id: number, title: string }>(res)),

  deleteScreenshot: (id: number | string) =>
    fetch(`${BASE_URL}/screenshots/${id}`, {
      method: "DELETE",
    }).then((res) => handleResponse<{ message: string }>(res)),

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

  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetch(`${BASE_URL}/categories`);
      if (res.ok) {
        return await handleResponse<Category[]>(res);
      }
    } catch {
      // Backend route not available yet; fallback gracefully
    }
    return getStoredCategories();
  },

  createCategory: async (data: Partial<Category>): Promise<Category> => {
    try {
      const res = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await handleResponse<Category>(res);
      }
    } catch {
      // Fallback
    }
    const current = getStoredCategories();
    const newCat: Category = {
      id: Date.now(),
      name: data.name || "New Category",
      slug: data.slug || (data.name || "new-category").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: data.description || "",
      display_order: data.display_order ?? (current.length + 1),
      show_on_home: data.show_on_home ?? true,
    };
    const updated = [...current, newCat];
    saveStoredCategories(updated);
    return newCat;
  },

  updateCategory: async (id: number | string, data: Partial<Category>): Promise<Category> => {
    try {
      const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await handleResponse<Category>(res);
      }
    } catch {
      // Fallback
    }
    const current = getStoredCategories();
    const updated = current.map((c) => (c.id === Number(id) ? { ...c, ...data } : c));
    saveStoredCategories(updated);
    return updated.find((c) => c.id === Number(id)) || (data as Category);
  },

  deleteCategory: async (id: number | string): Promise<{ message: string }> => {
    try {
      const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        return await handleResponse<{ message: string }>(res);
      }
    } catch {
      // Fallback
    }
    const current = getStoredCategories();
    const updated = current.filter((c) => c.id !== Number(id));
    saveStoredCategories(updated);
    return { message: "Category deleted" };
  },
};

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "MSJ",
    slug: "msj",
    description: "Enterprise solutions & business platform initiatives for MSJ.",
    display_order: 1,
    show_on_home: true,
  },
  {
    id: 2,
    name: "Dummy Landing Page",
    slug: "dummy-landing-page",
    description: "High-converting, interactive promotional & SaaS landing page prototypes.",
    display_order: 2,
    show_on_home: true,
  },
  {
    id: 3,
    name: "Web Applications",
    slug: "web-applications",
    description: "Scalable fullstack applications and developer tools.",
    display_order: 3,
    show_on_home: true,
  },
];

function getStoredCategories(): Category[] {
  try {
    const raw = localStorage.getItem("porto_categories");
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not read stored categories", e);
  }
  return DEFAULT_CATEGORIES;
}

function saveStoredCategories(cats: Category[]) {
  try {
    localStorage.setItem("porto_categories", JSON.stringify(cats));
  } catch (e) {
    console.warn("Could not save categories", e);
  }
}


