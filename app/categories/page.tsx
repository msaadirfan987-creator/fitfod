"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ApiCategory, getCategories } from "../../lib/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories(signal);
      setCategories(data);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadCategories(controller.signal);
    return () => controller.abort();
  }, [loadCategories]);

  return (
    <main className="min-h-screen bg-[#F7F8F3]">
      <section className="bg-[#063B35] px-6 py-20 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-[.25em] text-[#E9D994]">
          FitnessXpods Network
        </p>

        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
          Explore Categories
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75">
          Discover fitness, health, and wellness experts across{" "}
          {categories.length || 21} specialized categories.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#9A843A]">
            EXPLORE OUR NETWORK
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#063B35]">
            {categories.length || 21} Fitness Categories
          </h2>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-[#E7EDE3] bg-white p-7 shadow-sm"
              >
                <div className="h-3 w-24 animate-pulse rounded bg-[#E8F1E6]" />
                <div className="mt-4 h-6 w-2/3 animate-pulse rounded bg-[#E8F1E6]" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#F1F6EF]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-dashed border-[#C8D9C5] bg-white p-8 text-center">
            <p className="text-lg font-extrabold text-[#063B35]">
              Unable to load categories
            </p>
            <p className="mt-2 text-sm text-[#718078]">{error}</p>
            <button
              suppressHydrationWarning
              onClick={() => loadCategories()}
              className="mt-4 rounded-full bg-[#063B35] px-5 py-2.5 text-xs font-bold text-white"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/experts?category=${encodeURIComponent(category.slug)}`}
                className="group rounded-[24px] border border-[#E7EDE3] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#9A843A]">
                  Category {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-4 text-xl font-extrabold text-[#063B35]">
                  {category.name}
                </h3>

                {category.subcategories && (
                  <p className="mt-3 text-sm leading-6 text-[#718078]">
                    {category.subcategories}
                  </p>
                )}

                <div className="mt-6 text-sm font-bold text-[#587B35]">
                  Explore Experts →
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
