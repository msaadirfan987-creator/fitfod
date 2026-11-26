"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ApiExpert, getExpertBySlug } from "../../../lib/api";
import {
  ExpertPhoto,
  getInitials,
  normalizeInstagramUrl,
  normalizeUrl,
} from "../../../components/ExpertCard";

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d5dfd4] bg-[#f8faf6] p-8 text-center">
      <p className="text-sm leading-7 text-gray-500">{message}</p>
    </div>
  );
}

export default function ExpertProfilePage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [expert, setExpert] = useState<ApiExpert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getExpertBySlug(slug, controller.signal)
      .then((data) => {
        setExpert(data);
      })
      .catch((err) => {
        if ((err as Error).name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load expert");
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8f5] px-6 text-center">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-[#dde8dc]" />
        <p className="mt-4 text-sm text-gray-600">Loading expert profile...</p>
      </main>
    );
  }

  if (error || !expert) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8f5] px-6 text-center">
        <h1 className="text-3xl font-bold text-[#183b32]">
          Expert Not Found
        </h1>
        <p className="mt-3 text-gray-600">
          {error || "The expert profile you are looking for is unavailable."}
        </p>
        <Link
          href="/experts"
          className="mt-6 rounded-full bg-[#183b32] px-7 py-3 text-white"
        >
          Back to Experts
        </Link>
      </main>
    );
  }

  const primarySpecialty =
    expert.sub_category || expert.categories?.name || "Fitness Specialist";
  const websiteUrl = normalizeUrl(expert.website);
  const instagramUrl = normalizeInstagramUrl(expert.instagram);
  const expertiseTags = Array.from(
    new Set(
      [expert.categories?.name, expert.sub_category].filter(
        (item): item is string => Boolean(item && item.trim())
      )
    )
  );

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#183b32]">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            FitPod<span className="text-[#62b95b]">.</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-[#62b95b]">Home</Link>
            <Link href="/experts" className="text-[#62b95b]">Experts</Link>
            <Link href="/categories" className="hover:text-[#62b95b]">Categories</Link>
            <a href="#about" className="hover:text-[#62b95b]">About</a>
          </div>

          <Link
            href="/experts"
            className="rounded-full border border-[#183b32] px-5 py-2 text-sm font-semibold transition hover:bg-[#183b32] hover:text-white"
          >
            Back to Directory
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#183b32]">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#62D957]/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-[#D7B85F]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="text-white">
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d7e8d1]">
              FitPod Expert Profile
            </div>

            {expert.categories?.name && (
              <p className="mb-3 text-sm font-medium text-[#b8d7a9]">
                {expert.categories.name}
              </p>
            )}

            <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
              {expert.name}
            </h1>

            <p className="mt-4 text-lg text-[#d5e2dc]">{primarySpecialty}</p>

            {expert.credentials && (
              <p className="mt-6 max-w-xl leading-8 text-[#d5e2dc]">
                {expert.credentials}
              </p>
            )}

            <a
              href="#about"
              className="mt-9 inline-flex rounded-full bg-[#62D957] px-7 py-3.5 font-semibold text-[#183b32] transition hover:bg-white"
            >
              Explore Profile
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] border border-white/20" />
            <div className="relative h-[360px] w-full overflow-hidden rounded-[1.5rem] bg-[#E4ECE2] shadow-2xl sm:h-[380px]">
              <ExpertPhoto
                imageUrl={expert.image_url?.trim() || null}
                name={expert.name}
                initials={getInitials(expert.name, expert.rank)}
                className="h-full w-full"
                initialsClassName="text-7xl font-black tracking-tight text-[#174B38]"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Primary Specialty
              </p>
              <p className="mt-1 text-lg font-bold text-[#183b32]">
                {primarySpecialty}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE HIGHLIGHTS */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-7">
          <p className="text-sm text-gray-500">Directory Rank</p>
          <h3 className="mt-3 text-3xl font-bold">
            {expert.rank ? `#${expert.rank}` : "Listed"}
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7">
          <p className="text-sm text-gray-500">Primary Specialty</p>
          <h3 className="mt-3 text-xl font-bold">{primarySpecialty}</h3>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7">
          <p className="text-sm text-gray-500">Category</p>
          <h3 className="mt-3 text-xl font-bold">
            {expert.categories?.name || "Fitness Network"}
          </h3>
        </div>
      </section>

      {/* ABOUT AND EXPERTISE */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 md:grid-cols-3"
      >
        <div className="md:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#69aa5b]">
            About the Expert
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Expertise built around your goals.
          </h2>
          {expert.credentials ? (
            <p className="mt-6 max-w-3xl leading-8 text-gray-600">
              {expert.credentials}
            </p>
          ) : (
            <div className="mt-6">
              <EmptyState message="Detailed biography and credentials will be displayed here when available." />
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7">
          <h3 className="text-xl font-bold">Areas of Expertise</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {expertiseTags.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#edf5e9] px-4 py-2 text-sm font-medium text-[#315d35]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#69aa5b]">
            Professional Background
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Credentials & Qualifications
          </h2>
          <div className="mt-8">
            {expert.credentials ? (
              <div className="rounded-2xl border border-[#d5dfd4] bg-[#f8faf6] p-8">
                <p className="text-base leading-7 text-[#183b32]">
                  {expert.credentials}
                </p>
                {expert.social_proof && (
                  <p className="mt-3 text-sm text-gray-600">
                    {expert.social_proof}
                  </p>
                )}
              </div>
            ) : (
              <EmptyState message="Verified credentials and qualifications will be displayed here when available." />
            )}
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#69aa5b]">
            Knowledge & Publications
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Published Books & Resources
          </h2>
          <div className="mt-8">
            {expert.books ? (
              <div className="rounded-2xl border border-[#d5dfd4] bg-white p-8">
                <p className="text-base leading-7 text-[#183b32]">
                  {expert.books}
                </p>
              </div>
            ) : (
              <EmptyState message="Published books and resources will appear here when available." />
            )}
          </div>
        </div>
      </section>

      {/* WEBSITE AND SOCIAL LINKS */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#69aa5b]">
            Online Presence
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Website & Social Media
          </h2>
          <div className="mt-8">
            {websiteUrl || instagramUrl ? (
              <div className="flex flex-wrap gap-4 rounded-2xl border border-[#d5dfd4] bg-[#f8faf6] p-8">
                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#183b32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#235447]"
                  >
                    Website →
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#183b32] px-6 py-3 text-sm font-semibold text-[#183b32] transition hover:bg-[#183b32] hover:text-white"
                  >
                    Instagram →
                  </a>
                )}
              </div>
            ) : (
              <EmptyState message="Official website and social media links will be added when available." />
            )}
          </div>
        </div>
      </section>

      {/* CLAIM PROFILE CTA */}
      <section id="claim" className="bg-[#183b32] px-6 py-20 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a9d49d]">
          Join the FitPod Network
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
          Are you the expert behind this profile?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#d5e2dc]">
          Claim your profile, showcase your expertise, and explore opportunities
          to expand your reach through FitPod&apos;s managed podcast services.
        </p>
        <Link
          href="/experts"
          className="mt-8 inline-flex rounded-full bg-[#62D957] px-8 py-4 font-semibold text-[#183b32] transition hover:bg-white"
        >
          Explore FitPod Network
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#142e28] px-6 py-8 text-center text-sm text-[#c7d4ce]">
        © {new Date().getFullYear()} FitPod. All rights reserved.
      </footer>
    </main>
  );
}
