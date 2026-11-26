"use client";

import { useState } from "react";
import Link from "next/link";

export interface ExpertCardItem {
  id: number;
  slug: string;
  rank: number | null;
  name: string;
  role: string;
  subCategory: string | null;
  credentials: string | null;
  books: string | null;
  socialProof: string | null;
  categories: string[];
  initials: string;
  featured: boolean;
  website: string | null;
  instagram: string | null;
  imageUrl: string | null;
}

export function getInitials(name: string, rank?: number | null): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return rank ? String(rank).padStart(2, "0") : "EX";
}

export function normalizeUrl(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function normalizeInstagramUrl(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const handle = trimmed.replace(/^@/, "");
  return handle ? `https://instagram.com/${handle}` : null;
}

interface ExpertPhotoProps {
  imageUrl: string | null;
  name: string;
  initials: string;
  className?: string;
  initialsClassName?: string;
}

/**
 * Renders an expert portrait with top-center framing and an initials fallback
 * whenever image_url is null or fails to load.
 */
export function ExpertPhoto({
  imageUrl,
  name,
  initials,
  className = "h-full w-full",
  initialsClassName = "text-4xl font-black tracking-tight text-[#174B38]",
}: ExpertPhotoProps) {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-[#E4ECE2] ${className}`}
        aria-label={name}
      >
        <span className={initialsClassName}>{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-contain object-center ${className}`}
    />
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 0 0 18M12 3a14.5 14.5 0 0 1 0 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
    </svg>
  );
}

export function ExpertCard({ expert }: { expert: ExpertCardItem }) {
  return (
    <article className="directory-luxury group flex flex-col overflow-hidden rounded-2xl bg-white">
      <Link
        href={`/experts/${expert.slug}`}
        className="relative block h-52 w-full overflow-hidden rounded-t-2xl bg-[#F1F6EF] p-2"
      >
        <ExpertPhoto
          imageUrl={expert.imageUrl}
          name={expert.name}
          initials={expert.initials}
          className="h-full w-full rounded-xl transition duration-500 group-hover:scale-105"
        />
        {expert.rank !== null && (
          <div className="absolute right-3 top-3 rounded-full border border-[#E6D18B]/60 bg-[#063B35]/80 px-2.5 py-1 text-[10px] font-bold text-[#E9D994] backdrop-blur-md">
            #{expert.rank}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="text-[9px] font-extrabold uppercase tracking-widest text-[#548D4A]">
          FitnessXpods Network
        </div>

        <Link href={`/experts/${expert.slug}`}>
          <h3 className="mt-1.5 text-base font-black text-[#063B35] hover:underline">
            {expert.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs font-semibold leading-5 text-[#597166]">
          {expert.subCategory || expert.role}
        </p>

        {expert.credentials && (
          <p className="mt-2.5 line-clamp-3 text-xs leading-5 text-[#75837A]">
            {expert.credentials}
          </p>
        )}

        {expert.books && (
          <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-[#597166]">
            Books: {expert.books}
          </p>
        )}

        {expert.socialProof && (
          <p className="mt-1.5 line-clamp-1 text-[10px] font-medium text-[#72966B]">
            {expert.socialProof}
          </p>
        )}

        <div className="mb-3 mt-3 flex flex-wrap gap-1.5">
          {expert.categories.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#D5E9D0] bg-gradient-to-r from-[#F0F8EE] to-[#EAF6E7] px-2.5 py-1 text-[9px] font-bold text-[#54834B]"
            >
              {item}
            </span>
          ))}
        </div>

        {(expert.website || expert.instagram) && (
          <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[#E5EFE2] pt-3 text-[11px] font-semibold text-[#54834B]">
            {expert.website && (
              <a
                href={expert.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#063B35]"
              >
                <GlobeIcon />
                <span>Website</span>
              </a>
            )}
            {expert.instagram && (
              <a
                href={expert.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#063B35]"
              >
                <InstagramIcon />
                <span>Instagram</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
