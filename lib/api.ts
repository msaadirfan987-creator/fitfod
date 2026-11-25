const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  subcategories: string | null;
  sort_order: number | null;
}

export interface ApiExpert {
  id: number;
  category_id: number;
  rank: number | null;
  name: string;
  slug: string;
  sub_category: string | null;
  books: string | null;
  credentials: string | null;
  social_proof: string | null;
  podcast_status: string | null;
  website: string | null;
  instagram: string | null;
  source: string | null;
  categories?: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      if (body && typeof body.error === "string") {
        message = body.error;
      }
    } catch {
      // Ignore JSON parse errors on error responses.
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export function fetchCategories(signal?: AbortSignal): Promise<ApiCategory[]> {
  return request<ApiCategory[]>("/api/categories", signal);
}

export function fetchExperts(
  categorySlug?: string,
  signal?: AbortSignal
): Promise<ApiExpert[]> {
  const query = categorySlug
    ? `?category=${encodeURIComponent(categorySlug)}`
    : "";
  return request<ApiExpert[]>(`/api/experts${query}`, signal);
}

export function fetchExpertBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<ApiExpert> {
  return request<ApiExpert>(`/api/experts/${encodeURIComponent(slug)}`, signal);
}
