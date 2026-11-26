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

function getApiBaseUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_API_URL || "").trim().replace(/\/$/, "");
  if (!raw) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_URL environment variable"
    );
  }
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path}`;

  let response: Response;
  try {
    response = await fetch(url, { signal, cache: "no-store" });
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw err;
    }
    throw new Error(
      `Failed to connect to API (${url}): ${
        err instanceof Error ? err.message : "Network error"
      }`
    );
  }

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

export function getCategories(signal?: AbortSignal): Promise<ApiCategory[]> {
  return request<ApiCategory[]>("/api/categories", signal);
}

export function getExperts(
  categorySlug?: string,
  signal?: AbortSignal
): Promise<ApiExpert[]> {
  const query = categorySlug
    ? `?category=${encodeURIComponent(categorySlug)}`
    : "";
  return request<ApiExpert[]>(`/api/experts${query}`, signal);
}

export function getExpertBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<ApiExpert> {
  return request<ApiExpert>(`/api/experts/${encodeURIComponent(slug)}`, signal);
}
