"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ApiCategory,
  ApiExpert,
  getCategories,
  getExperts,
} from "../../lib/api";
import {
  ExpertCard,
  ExpertCardItem,
  ExpertPhoto,
  getInitials,
  normalizeInstagramUrl,
  normalizeUrl,
} from "../../components/ExpertCard";

interface CategoryCardItem {
  id: number;
  name: string;
  slug: string;
  desc: string;
  image: string | null;
}

const CATEGORY_IMAGE_BY_SLUG: Record<string, string> = {
  "weight-loss": "photo-1571019613454-1cb2f99b2d8b",
  "nutrition-diet": "photo-1490645935967-10de6ba17061",
  "strength-training": "photo-1583454110551-21f2fa2afe61",
  "cardiovascular-fitness": "photo-1538805060514-97d9cc17730c",
  running: "photo-1552674605-db6ffd4facb5",
  "walking-hiking": "photo-1551632811-561732d1e306",
  yoga: "photo-1544367567-0f2fcb009e0b",
  pilates: "photo-1518611012118-696072aa579a",
  "mobility-flexibility": "photo-1517836357463-d25dfeac3438",
  "longevity-healthy-aging": "photo-1517841905240-472988babdf9",
  "womens-fitness": "photo-1518611012118-696072aa579a",
  "mens-fitness": "photo-1534438327276-14e5300c3a48",
  "sports-performance": "photo-1461896836934-ffe607ba8211",
  "functional-fitness": "photo-1517963879433-6ad2b056d712",
  "hiit-conditioning": "photo-1517838277536-f4e3b9c7c8b4",
  "recovery-injury-prevention": "photo-1571019614242-c5c5dee9f50b",
  "sleep-recovery": "photo-1541781774459-bb2af2f05b55",
  "mind-body-wellness": "photo-1506126613408-eca07ce68773",
  "outdoor-fitness": "photo-1471506480208-91b3a4cc78be",
  "fitness-technology": "photo-1510017803434-a899398421b3",
  "specialized-fitness": "photo-1534438327276-14e5300c3a48",
};

function mapCategoryFromApi(category: ApiCategory): CategoryCardItem {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    desc: category.subcategories || "",
    image: CATEGORY_IMAGE_BY_SLUG[category.slug] || null,
  };
}

function mapExpertFromApi(expert: ApiExpert): ExpertCardItem {
  const categoryTags = Array.from(
    new Set(
      [expert.categories?.name, expert.sub_category].filter(
        (item): item is string => Boolean(item && item.trim())
      )
    )
  );

  return {
    id: expert.id,
    slug: expert.slug,
    rank: expert.rank,
    name: expert.name,
    role: expert.sub_category || expert.categories?.name || "Fitness Specialist",
    subCategory: expert.sub_category?.trim() || null,
    credentials: expert.credentials?.trim() || null,
    books: expert.books?.trim() || null,
    socialProof: expert.social_proof?.trim() || null,
    categories: categoryTags,
    initials: getInitials(expert.name, expert.rank),
    featured: typeof expert.rank === "number" ? expert.rank <= 3 : false,
    website: normalizeUrl(expert.website),
    instagram: normalizeInstagramUrl(expert.instagram),
    imageUrl: expert.image_url?.trim() || null,
  };
}

const photo = (id: string, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function ExpertsPage() {
  const [categories, setCategories] = useState<CategoryCardItem[]>([]);
  const [experts, setExperts] = useState<ExpertCardItem[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [expertsLoading, setExpertsLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [expertsError, setExpertsError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("");
  const [initialCategoryParam, setInitialCategoryParam] = useState<string | null>(
    null
  );
  const [role, setRole] = useState("All Roles");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get("search");
    const urlCategory = params.get("category");
    if (urlSearch) {
      setSearch(urlSearch);
    }
    if (urlCategory) {
      setInitialCategoryParam(urlCategory);
    }
  }, []);

  const loadCategories = useCallback(async (signal?: AbortSignal) => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const data = await getCategories(signal);
      setCategories(data.map(mapCategoryFromApi));
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setCategoriesError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadCategories(controller.signal);
    return () => controller.abort();
  }, [loadCategories]);

  useEffect(() => {
    if (!initialCategoryParam || categories.length === 0) return;
    const normalized = initialCategoryParam.trim().toLowerCase();
    const match = categories.find(
      (item) =>
        item.slug.toLowerCase() === normalized ||
        item.name.toLowerCase() === normalized
    );
    if (match) {
      setSelectedCategorySlug(match.slug);
    }
    setInitialCategoryParam(null);
  }, [initialCategoryParam, categories]);

  const loadExperts = useCallback(
    async (categorySlug: string, signal?: AbortSignal) => {
      setExpertsLoading(true);
      setExpertsError(null);
      try {
        const data = await getExperts(categorySlug || undefined, signal);
        setExperts(data.map(mapExpertFromApi));
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setExpertsError(
          err instanceof Error ? err.message : "Failed to load experts"
        );
      } finally {
        setExpertsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    loadExperts(selectedCategorySlug, controller.signal);
    return () => controller.abort();
  }, [selectedCategorySlug, loadExperts]);

  const roles = useMemo(
    () =>
      Array.from(
        new Set(
          experts
            .map((expert) => expert.subCategory)
            .filter((item): item is string => Boolean(item))
        )
      ),
    [experts]
  );

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const q = search.toLowerCase();
      const searchMatch =
        !search ||
        expert.name.toLowerCase().includes(q) ||
        expert.role.toLowerCase().includes(q) ||
        (expert.credentials && expert.credentials.toLowerCase().includes(q)) ||
        (expert.books && expert.books.toLowerCase().includes(q)) ||
        (expert.socialProof && expert.socialProof.toLowerCase().includes(q)) ||
        expert.categories.some((item) => item.toLowerCase().includes(q));

      const roleMatch = role === "All Roles" || expert.subCategory === role;

      return searchMatch && roleMatch;
    });
  }, [experts, search, role]);

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredExperts.length / pageSize));
  const visibleExperts = filteredExperts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleCategoryChange = (slug: string) => {
    setSelectedCategorySlug(slug);
    setRole("All Roles");
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategorySlug("");
    setRole("All Roles");
    setPage(1);
  };

  const featuredExperts = experts.filter((expert) => expert.featured).slice(0, 3);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F6F3] text-[#173D34]">
      <style jsx global>{`
        html { scroll-behavior: smooth; }

        .nav-link { position: relative; }
        .nav-link:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -7px;
          height: 2px;
          background: #62D957;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .25s ease;
        }
        .nav-link:hover:after { transform: scaleX(1); }

        .lime-glow {
          transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
        }
        .lime-glow:hover {
          transform: translateY(-5px);
          border-color: rgba(98,217,87,.65);
          box-shadow: 0 15px 38px rgba(98,217,87,.18), 0 0 18px rgba(98,217,87,.12);
        }

        .glass-stat {
          background: linear-gradient(135deg,rgba(255,255,255,.16),rgba(255,255,255,.055));
          border: 1px solid rgba(196,255,178,.3);
          backdrop-filter: blur(14px);
        }

        .premium-card {
          background: linear-gradient(145deg,#174B38,#063B35);
          border: 1px solid rgba(98,217,87,.35);
          box-shadow: 0 12px 34px rgba(6,59,53,.12), inset 0 1px rgba(255,255,255,.1);
        }

        .section-kicker {
          color: #4BAE43;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .19em;
          text-transform: uppercase;
        }

        /* Find your specialist — mint and lime green theme */
        .golden-panel {
          border: 1px solid #BFE5BD;
          background: linear-gradient(135deg,#FFFFFF 0%,#F1FAEF 55%,#E4F5E1 100%);
          box-shadow: 0 14px 38px rgba(48,130,65,.10), 0 0 22px rgba(98,217,87,.08);
        }

        .golden-input {
          border: 1px solid #CDE5CA;
          background: linear-gradient(135deg,#FFFFFF,#F4FBF2);
          transition: border-color .25s ease, box-shadow .25s ease;
        }
        .golden-input:focus {
          border-color: #70C96A;
          box-shadow: 0 0 0 3px rgba(98,217,87,.16), 0 0 16px rgba(98,217,87,.12);
          outline: none;
        }

        .expert-luxury {
          border: 1px solid transparent;
          background:
            linear-gradient(#fff,#fff) padding-box,
            linear-gradient(135deg,#D9EFCB,#D7B85F,#A9DF83,#E8D79E) border-box;
          box-shadow: 0 12px 34px rgba(6,59,53,.07);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .expert-luxury:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 42px rgba(105,155,62,.15), 0 0 22px rgba(213,185,95,.16);
        }

        /* Explore all experts — fresh green cards */
        .directory-luxury {
          border: 1px solid #D1E7CE;
          box-shadow: 0 8px 26px rgba(6,59,53,.055);
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
        }
        .directory-luxury:hover {
          transform: translateY(-4px);
          border-color: #8BD77D;
          box-shadow: 0 15px 34px rgba(68,145,69,.13), 0 0 18px rgba(98,217,87,.10);
        }

        .gold-text {
          background: linear-gradient(100deg,#B9E65D 0%,#E4CE79 48%,#A7E36A 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#E9EEE8] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="text-xl font-black tracking-tight text-[#063B35]">
            Fitness<span className="text-[#62D957]">X</span>pods
          </Link>
          <nav className="hidden items-center gap-9 text-sm font-semibold text-[#23473C] md:flex">
            <Link className="nav-link" href="/">Home</Link>
            <Link className="nav-link" href="/#categories">Categories</Link>
            <Link className="nav-link text-[#4BAE43]" href="/experts">Experts</Link>
            <Link className="nav-link" href="/podcasts">Podcasts</Link>
            <Link className="nav-link" href="/#about">About</Link>
            <Link className="nav-link" href="/#contact">Contact</Link>
          </nav>
          <Link href="#directory-results" className="rounded-full bg-[#063B35] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#174B38]">
            Find an Expert <span className="ml-1 text-[#62D957]">→</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pb-8 pt-7 sm:px-6 lg:px-8 lg:pt-10">
        <div className="mx-auto max-w-7xl rounded-[30px] bg-white p-2.5 shadow-[0_18px_55px_rgba(6,59,53,0.09)] sm:p-3">
          <div className="relative isolate overflow-hidden rounded-[23px] bg-[#063B35]">
            <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-[#62D957]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-60 w-60 rounded-full bg-[#D7B85F]/10 blur-3xl" />

            <div className="relative grid items-center gap-8 px-6 py-11 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:px-14 lg:py-12">
              <div className="relative z-10">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#62D957]/35 bg-white/[0.07] px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#B7F5A8]">
                  <span className="h-2 w-2 rounded-full bg-[#B7E65B]" />
                  The FitnessXpods Expert Network
                </div>

                <h1 className="max-w-2xl text-[34px] font-normal leading-[1.12] tracking-tight text-white sm:text-[43px] lg:text-[54px]">
                  Discover the <span className="font-bold">voices</span>
                  <br />
                  shaping <span className="gold-text font-bold">fitness.</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-[15px]">
                  Discover the <strong className="font-semibold text-white">people</strong>, knowledge and ideas transforming the fitness industry. Explore expert perspectives, uncover fresh insights and connect with the voices shaping what comes next.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="#directory-results" className="rounded-full bg-gradient-to-r from-[#BCEB62] to-[#E3D17D] px-6 py-3.5 text-sm font-extrabold text-[#063B35] shadow-[0_7px_25px_rgba(190,220,91,.2)] transition hover:brightness-105">
                    Explore Experts <span className="ml-2">→</span>
                  </Link>
                  <Link href="#categories" className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#D8C16D] hover:bg-white/10">
                    Browse Categories
                  </Link>
                </div>

                <div className="mt-9 grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
                  <div className="glass-stat rounded-2xl p-3 sm:p-4">
                    <div className="text-2xl font-black text-[#C7E979] sm:text-3xl">21</div>
                    <div className="mt-1 text-[10px] font-semibold leading-4 text-white/75 sm:text-xs">Specialist fields</div>
                  </div>
                  <div className="glass-stat rounded-2xl p-3 sm:p-4">
                    <div className="text-lg font-black text-[#D9C77A] sm:text-2xl">Global</div>
                    <div className="mt-1 text-[10px] font-semibold leading-4 text-white/75 sm:text-xs">Expert discovery</div>
                  </div>
                  <div className="glass-stat rounded-2xl p-3 sm:p-4">
                    <div className="text-lg font-black text-[#C7E979] sm:text-2xl">One</div>
                    <div className="mt-1 text-[10px] font-semibold leading-4 text-white/75 sm:text-xs">Knowledge network</div>
                  </div>
                </div>
              </div>

              {/* Hero photograph — directly inside the hero, no separate card */}
              <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto">
                <img
                  src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1100"
                  alt="Muscular male fitness professional in a gym"
                  className="h-[350px] w-full rounded-[25px] object-cover object-center sm:h-[435px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact premium filter */}
      <section className="px-5 pb-14 pt-7 sm:px-8">
        <div className="golden-panel mx-auto max-w-6xl rounded-3xl p-5 sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">Find your specialist</div>
              <h2 className="mt-2 text-[25px] font-normal tracking-tight text-[#063B35] sm:text-[30px]">
                What&apos;s Your <span className="font-bold">Fitness Dream?</span>
              </h2>
              <p className="mt-1 text-sm text-[#718078]">Find the right knowledge, experience and expertise.</p>
            </div>
            <Link href="#directory-results" className="text-sm font-bold text-[#438D35] hover:text-[#063B35]">
              View all experts →
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <input
              suppressHydrationWarning
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Expert name or topic"
              className="golden-input min-w-0 rounded-xl px-4 py-3 text-sm text-[#23473C] placeholder:text-[#8A978E]"
            />
            <select suppressHydrationWarning value={selectedCategorySlug} onChange={(e) => handleCategoryChange(e.target.value)} className="golden-input rounded-xl px-3 py-3 text-sm text-[#345448]">
              <option value="">All Categories</option>
              {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <select suppressHydrationWarning value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="golden-input rounded-xl px-3 py-3 text-sm text-[#345448]">
              <option>All Roles</option>
              {roles.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#839087]">Search by specialist, category or specialty.</p>
            <button suppressHydrationWarning onClick={resetFilters} className="text-xs font-bold text-[#438D35] hover:text-[#063B35]">Clear filters ↺</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="section-kicker">Explore specialist fields</div>
              <h2 className="mt-3 text-3xl font-normal tracking-tight text-[#063B35] sm:text-4xl">
                Explore the world of <span className="font-bold">fitness expertise.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#718078]">
                From nutrition and performance to recovery and healthy aging, discover specialist knowledge across 21 areas of fitness.
              </p>
            </div>
            <div className="rounded-full border border-[#D9D49A] bg-gradient-to-r from-[#F3FAE9] to-[#FBF5DF] px-4 py-2 text-xs font-extrabold text-[#718D32]">
              {categories.length || 21} specialist categories
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categoriesLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-[#E8EEE5] bg-white shadow-[0_5px_18px_rgba(6,59,53,.04)]"
                >
                  <div className="h-32 animate-pulse bg-[#E8F1E6] sm:h-40" />
                  <div className="p-3.5 sm:p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#E8F1E6]" />
                    <div className="mt-2 h-3 w-full animate-pulse rounded bg-[#F1F6EF]" />
                  </div>
                </div>
              ))
            ) : categoriesError ? (
              <div className="col-span-full rounded-2xl border border-dashed border-[#C8D9C5] bg-[#F8FAF7] px-5 py-10 text-center">
                <div className="text-base font-black text-[#174B38]">Unable to load categories</div>
                <p className="mt-1 text-sm text-[#78867E]">{categoriesError}</p>
                <button
                  suppressHydrationWarning
                  onClick={() => loadCategories()}
                  className="mt-4 rounded-full bg-[#063B35] px-5 py-2.5 text-xs font-bold text-white"
                >
                  Retry
                </button>
              </div>
            ) : (
              categories.slice(0, showAllCategories ? categories.length : 8).map((item, index) => (
                <button
                  suppressHydrationWarning
                  key={item.slug}
                  onClick={() => {
                    handleCategoryChange(item.slug);
                    document.getElementById("directory-results")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="lime-glow group overflow-hidden rounded-2xl border border-[#E8EEE5] bg-white text-left shadow-[0_5px_18px_rgba(6,59,53,.04)]"
                >
                  <div className="relative h-32 overflow-hidden bg-[#DDE8DC] sm:h-40">
                    {item.image && (
                      <img src={photo(item.image, 600)} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#063B35]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-[#063B35]/50 px-2.5 py-1 text-[9px] font-bold tracking-widest text-white backdrop-blur-md">
                      FIELD {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <h3 className="text-sm font-extrabold leading-snug text-[#174B38] sm:text-base">{item.name}</h3>
                    <p className="mt-1.5 text-[11px] leading-5 text-[#78867E] sm:text-xs">{item.desc}</p>
                    <div className="mt-3 text-[11px] font-bold text-[#429B3A]">Explore specialists <span className="ml-1 transition group-hover:ml-2">→</span></div>
                  </div>
                </button>
              ))
            )}
          </div>

          {categories.length > 8 && (
            <div className="mt-9 text-center">
              <button suppressHydrationWarning onClick={() => setShowAllCategories(!showAllCategories)} className="rounded-full border border-[#C6D98A] bg-gradient-to-r from-white to-[#F8F9E9] px-7 py-3 text-sm font-extrabold text-[#638B35] shadow-[0_5px_18px_rgba(185,216,91,.10)] transition hover:border-[#8BD77D] hover:shadow-[0_0_20px_rgba(98,217,87,.18)]">
                {showAllCategories ? "Show fewer categories ↑" : `Explore all ${categories.length} categories ↓`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured experts */}
      <section className="bg-[#F5F6F3] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="section-kicker">Meet the network</div>
              <h2 className="mt-3 text-3xl font-normal tracking-tight text-[#063B35] sm:text-4xl">
                Featured <span className="font-bold">experts</span>
              </h2>
              <p className="mt-3 text-sm text-[#718078]">A closer look at professionals across different areas of fitness.</p>
            </div>
            <Link href="#directory-results" className="text-sm font-extrabold text-[#8C762D] hover:text-[#063B35]">Browse directory ↓</Link>
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {expertsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <article key={index} className="expert-luxury overflow-hidden rounded-[25px] bg-white">
                  <div className="h-64 animate-pulse bg-[#DDE8DC]" />
                  <div className="p-6">
                    <div className="h-3 w-24 animate-pulse rounded bg-[#E8F1E6]" />
                    <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-[#E8F1E6]" />
                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-[#F1F6EF]" />
                  </div>
                </article>
              ))
            ) : (
              featuredExperts.map((expert) => (
                <article key={expert.id} className="expert-luxury group overflow-hidden rounded-[25px]">
                  <Link href={`/experts/${expert.slug}`} className="block">
                    <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-[#0F493C] to-[#063B35] p-3">
                      <ExpertPhoto
                        imageUrl={expert.imageUrl}
                        name={expert.name}
                        initials={expert.initials}
                        className="h-full w-full rounded-xl transition duration-500 group-hover:scale-105"
                        initialsClassName="text-5xl font-black tracking-tight text-[#174B38]"
                      />
                      <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#063B35]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">Featured</div>
                      <div className="absolute right-4 top-4 rounded-full border border-[#E6D18B]/60 bg-[#063B35]/75 px-3 py-1.5 text-[10px] font-bold text-[#E9D994] backdrop-blur-md">
                        {expert.rank ? `#${expert.rank}` : `Profile ${expert.initials}`}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#063B35]/65 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-xs font-semibold text-white">FitnessXpods Network</div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#9A843A]">{expert.role}</div>
                    <Link href={`/experts/${expert.slug}`} className="block">
                      <h3 className="mt-2 text-xl font-extrabold text-[#063B35] hover:underline">{expert.name}</h3>
                    </Link>
                    {expert.credentials && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#718078]">{expert.credentials}</p>
                    )}
                    {expert.books && (
                      <p className="mt-2 text-xs leading-5 text-[#597166]">Books: {expert.books}</p>
                    )}
                    {expert.socialProof && (
                      <p className="mt-1.5 text-[11px] font-medium text-[#72966B]">{expert.socialProof}</p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expert.categories.map((item) => (
                        <span key={item} className="rounded-full border border-[#DDE9C9] bg-gradient-to-r from-[#F3F8E9] to-[#FBF7E9] px-3 py-1.5 text-[10px] font-bold text-[#587B35]">{item}</span>
                      ))}
                    </div>
                    {(expert.website || expert.instagram) && (
                      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#EDF0EA] pt-4 text-[11px] font-semibold text-[#587B35]">
                        {expert.website && (
                          <a href={expert.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#063B35]">
                            Website
                          </a>
                        )}
                        {expert.instagram && (
                          <a href={expert.instagram} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#063B35]">
                            Instagram
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Full directory */}
      <section id="directory-results" className="scroll-mt-24 bg-gradient-to-br from-[#EAF6E8] via-[#F5FAF2] to-[#E5F2E2] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="section-kicker">Find your specialist</div>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-normal tracking-tight text-[#063B35] sm:text-4xl">
                Explore all <span className="font-bold">experts</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#718078]">Search the directory and discover professionals by expertise and specialism.</p>
            </div>
            <div className="rounded-full border border-[#BFE1B9] bg-gradient-to-r from-white to-[#E5F5E2] px-4 py-2 text-xs font-bold text-[#438D42]">
              {expertsLoading ? "Loading experts..." : `${filteredExperts.length} experts shown`}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-[#CDE5C9] bg-gradient-to-r from-white via-[#F2FAF0] to-[#E4F3E1] p-4 shadow-[0_12px_34px_rgba(40,110,55,.08)] sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-bold text-[#174B38]">Refine your results</div>
            <div className="flex flex-wrap gap-2">
              <select suppressHydrationWarning value={selectedCategorySlug} onChange={(e) => handleCategoryChange(e.target.value)} className="golden-input max-w-full rounded-xl px-3 py-2.5 text-xs">
                <option value="">All Categories</option>
                {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <select suppressHydrationWarning value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="golden-input max-w-full rounded-xl px-3 py-2.5 text-xs">
                <option>All Roles</option>
                {roles.map((item) => <option key={item}>{item}</option>)}
              </select>
              <button suppressHydrationWarning onClick={resetFilters} className="rounded-xl border border-[#BFE1B9] bg-white px-4 py-2.5 text-xs font-bold text-[#438D42] hover:bg-[#EFF9ED]">Clear filters</button>
            </div>
          </div>

          {expertsLoading ? (
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <article key={index} className="directory-luxury overflow-hidden rounded-2xl bg-white">
                  <div className="h-56 w-full animate-pulse bg-[#E8F1E6]" />
                  <div className="p-5">
                    <div className="h-3 w-24 animate-pulse rounded bg-[#E8F1E6]" />
                    <div className="mt-2.5 h-4 w-3/4 animate-pulse rounded bg-[#E8F1E6]" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-[#F1F6EF]" />
                    <div className="mt-3 h-3 w-full animate-pulse rounded bg-[#F1F6EF]" />
                  </div>
                </article>
              ))}
            </div>
          ) : expertsError ? (
            <div className="mt-8 rounded-2xl border border-dashed border-[#C8D9C5] bg-[#F8FAF7] px-5 py-12 text-center">
              <div className="text-lg font-black text-[#174B38]">Unable to load experts</div>
              <p className="mt-2 text-sm text-[#78867E]">{expertsError}</p>
              <button suppressHydrationWarning onClick={() => loadExperts(selectedCategorySlug)} className="mt-4 rounded-full bg-[#063B35] px-5 py-2.5 text-xs font-bold text-white">Try again</button>
            </div>
          ) : visibleExperts.length > 0 ? (
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleExperts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#C8D9C5] bg-[#F8FAF7] px-5 py-12 text-center">
              <div className="text-lg font-black text-[#174B38]">No matching experts</div>
              <p className="mt-2 text-sm text-[#78867E]">Try a different search or clear your filters.</p>
              <button suppressHydrationWarning onClick={resetFilters} className="mt-4 rounded-full bg-[#063B35] px-5 py-2.5 text-xs font-bold text-white">Clear filters</button>
            </div>
          )}

          {filteredExperts.length > pageSize && (
            <div className="mt-9 flex items-center justify-center gap-4">
              <button suppressHydrationWarning disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-full border border-[#DCE7D9] px-4 py-2.5 text-xs font-bold text-[#174B38] disabled:opacity-30">← Previous</button>
              <span className="text-xs font-bold text-[#718078]">{page} / {totalPages}</span>
              <button suppressHydrationWarning disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-full border border-[#DCE7D9] px-4 py-2.5 text-xs font-bold text-[#174B38] disabled:opacity-30">Next →</button>
            </div>
          )}
        </div>
      </section>

      {/* Difference */}
      <section className="bg-[#F5F6F3] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="section-kicker">The FitnessXpods difference</div>
            <h2 className="mt-3 text-3xl font-normal leading-tight tracking-tight text-[#063B35] sm:text-4xl">
              More than a directory.
              <br />
              <span className="font-bold">A knowledge network.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#718078]">We bring fitness knowledge, specialist perspectives and meaningful opportunities together in one global destination.</p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            <div className="premium-card rounded-[25px] p-7 text-white">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-[#D5E98A]/80">01</span>
                <span className="rounded-xl border border-[#D5E98A]/30 bg-white/10 p-3 text-[#D5E98A]">◎</span>
              </div>
              <h3 className="mt-7 text-xl font-black">A Global Network</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">Discover professionals, specialist fields and perspectives from across the fitness industry.</p>
              <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-[#BCEB62] to-[#D9BD68]" />
            </div>

            <div className="premium-card rounded-[25px] p-7 text-white">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-[#D5E98A]/80">02</span>
                <span className="rounded-xl border border-[#D5E98A]/30 bg-white/10 p-3 text-[#D5E98A]">✧</span>
              </div>
              <h3 className="mt-7 text-xl font-black">Expert Knowledge</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">Explore professional experience, specialist insights, research and ideas that move fitness forward.</p>
              <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-[#BCEB62] to-[#D9BD68]" />
            </div>

            <div className="premium-card rounded-[25px] p-7 text-white">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-[#D5E98A]/80">03</span>
                <span className="rounded-xl border border-[#D5E98A]/30 bg-white/10 p-3 text-[#D5E98A]">◉</span>
              </div>
              <h3 className="mt-7 text-xl font-black">Podcast Production</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">Turn your expertise into engaging audio and video conversations with professional podcast production support.</p>
              <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-[#BCEB62] to-[#D9BD68]" />
            </div>
          </div>
        </div>
      </section>

      {/* Join network CTA */}
      <section className="bg-white px-4 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-[30px] bg-white p-2.5 shadow-[0_15px_50px_rgba(6,59,53,.09)]">
          <div className="grid overflow-hidden rounded-[23px] bg-[#063B35] lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative flex flex-col justify-center overflow-hidden px-7 py-11 sm:px-12 lg:px-14 lg:py-14">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#62D957]/10 blur-3xl" />
              <div className="section-kicker relative text-[#C5E77B]">Become part of the network</div>

              <h2 className="relative mt-4 max-w-xl text-[30px] font-normal leading-[1.16] tracking-tight text-white sm:text-[38px] lg:text-[43px]">
                Ready to make
                <br />
                an <span className="font-bold gold-text">impact?</span>
                <br />
                <span className="text-[25px] font-normal text-[#D8E8CB] sm:text-[30px] lg:text-[34px]">
                  Join the <span className="font-bold text-white">FitnessXpods</span> Network.
                </span>
              </h2>

              <p className="relative mt-4 max-w-lg text-sm leading-7 text-white/75">
                Connect your expertise with a global fitness audience. Share your knowledge, grow your influence and be part of the conversation shaping the industry.
              </p>

              <div className="relative mt-7">
                <Link href="/#contact" className="inline-flex rounded-full bg-gradient-to-r from-[#BCEB62] to-[#E3D17D] px-6 py-3.5 text-sm font-extrabold text-[#063B35] shadow-[0_7px_24px_rgba(190,220,91,.18)] transition hover:brightness-105">
                  Connect With FitnessXpods <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Existing CTA image unchanged */}
            <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#174B38] to-[#063B35] p-6 sm:p-9 lg:min-h-[430px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(194,226,105,.18),transparent_42%)]" />
              <div className="relative h-[290px] w-full max-w-[390px] rounded-[25px] bg-gradient-to-br from-[#D8EAA1] via-[#D5B967] to-[#8CCB66] p-[3px] shadow-[0_15px_45px_rgba(0,0,0,.25)] sm:h-[350px]">
                <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#174B38]">
                  <img
                    src={photo("photo-1544005313-94ddf0286df2", 1000)}
                    alt="Professional woman representing the FitnessXpods expert community"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063B35]/65 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/25 bg-[#063B35]/70 px-4 py-3 backdrop-blur-xl">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#D5E98A]">Your expertise matters</div>
                    <div className="mt-1 text-sm font-extrabold text-white">Make your voice count.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#063B35] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="text-2xl font-black tracking-tight">Fitness<span className="text-[#62D957]">X</span>pods</Link>
            <p className="mt-4 text-sm leading-7 text-white/65">Connecting fitness knowledge, specialist expertise and meaningful conversations across the globe.</p>
          </div>

          <div className="grid grid-cols-2 gap-12 text-sm">
            <div>
              <div className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#C5E77B]">Explore</div>
              <div className="flex flex-col gap-3 text-white/75">
                <Link href="/" className="hover:text-[#C5E77B]">Home</Link>
                <Link href="/experts" className="hover:text-[#C5E77B]">Experts</Link>
                <Link href="/podcasts" className="hover:text-[#C5E77B]">Podcasts</Link>
              </div>
            </div>
            <div>
              <div className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#C5E77B]">Connect</div>
              <div className="flex flex-col gap-3 text-white/75">
                <Link href="/#contact" className="hover:text-[#C5E77B]">Contact</Link>
                <Link href="#directory-results" className="hover:text-[#C5E77B]">Find Experts</Link>
                <Link href="#categories" className="hover:text-[#C5E77B]">Categories</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-5 text-xs text-white/45">
         © 2026 FitnessXpods. All rights reserved.
        </div>
      </footer>
    </main>
  );
}



