"use client";

import { useState } from "react";

const categories = [
  {
    name: "Weight Loss",
    description: "Fat loss, metabolic health and obesity expertise.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
    alt: "Fitness professional coaching a client",
  },
  {
    name: "Nutrition & Diet",
    description: "Keto, Mediterranean, vegan and paleo nutrition.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=85",
    alt: "Healthy food and nutrition planning",
  },
  {
    name: "Strength Training",
    description: "Weightlifting, bodybuilding and powerlifting.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
    alt: "Strength training environment",
  },
  {
    name: "Cardiovascular Fitness",
    description: "Heart health and aerobic conditioning.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85",
    alt: "Cardiovascular and endurance training",
  },
  {
    name: "Running",
    description: "Marathons, jogging and trail running.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85",
    alt: "Runner training outdoors",
  },
  {
    name: "Walking & Hiking",
    description: "Daily walking, trekking and rucking.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=85",
    alt: "Outdoor hiking and nature trail",
  },
  {
    name: "Yoga",
    description: "Hatha, Vinyasa and restorative yoga.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85",
    alt: "Yoga practice in a calm studio",
  },
  {
    name: "Pilates",
    description: "Mat Pilates, reformer and core strengthening.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    alt: "Pilates and core fitness practice",
  },
];

const benefits = [
  {
    number: "01",
    title: "Discover Experts",
    description:
      "Explore a growing directory of fitness professionals, educators, authors, coaches and industry voices.",
  },
  {
    number: "02",
    title: "Explore Ideas",
    description:
      "Find fresh perspectives, specialist knowledge and conversations across the fitness industry.",
  },
  {
    number: "03",
    title: "Build Influence",
    description:
      "Connect with a wider audience and share your expertise through professional podcast production.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m16 16 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <rect
        x="9"
        y="3"
        width="6"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3m-4 0h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = search.trim();

    if (query) {
      window.location.href = `/experts?search=${encodeURIComponent(query)}`;
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#173D32]">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-[#E9EFE9] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#073D34] text-[#B8F56A]">
              <MicIcon />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-[#073D34] sm:text-2xl">
              Fitness<span className="text-[#78A94C]">X</span>pods
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/experts">Experts</a>
            <a className="nav-link" href="/categories">Categories</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>

          <a
            href="#partner"
            className="rounded-full bg-[#B8F56A] px-4 py-2.5 text-sm font-bold text-[#173D32] shadow-sm transition hover:bg-[#A7E65B] hover:shadow-[0_0_20px_rgba(184,245,106,0.45)] sm:px-6"
          >
            Partner With Us
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section relative isolate overflow-hidden bg-[#073D34]">
        <div className="hero-photo absolute inset-0 -z-20" />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="hero-aura" aria-hidden="true" />

        <div className="mx-auto flex min-h-[590px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:min-h-[660px] lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#B8F56A]/35 bg-[#B8F56A]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9F59A]">
              <span className="h-2 w-2 rounded-full bg-[#B8F56A] shadow-[0_0_10px_#B8F56A]" />
              The Global Fitness Expert Network
            </div>

            <h1 className="hero-heading max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Where Fitness Knowledge Meets{" "}
              <span className="influence-text">Influence.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              Discover the voices shaping the future of fitness. Meet the experts.
              Explore their ideas. Hear their stories. Connect with the people
              moving the fitness industry forward.
            </p>

            <form
              onSubmit={handleSearch}
              className="premium-search mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border border-white/70 bg-white/95 p-2.5 sm:flex-row"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <span className="search-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#315D3C]">
                  <SearchIcon />
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search experts, topics or specialties..."
                  aria-label="Search experts, topics or specialties"
                  className="w-full bg-transparent py-3 text-sm text-[#173D32] outline-none placeholder:text-[#829187]"
                />
              </div>

              <button
                type="submit"
                className="premium-search-button flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-extrabold text-[#173D32]"
              >
                Search Experts <ArrowIcon />
              </button>
            </form>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75">
              <span className="flex items-center gap-2">
                <span className="text-[#B8F56A]">✓</span> Fitness professionals
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#B8F56A]">✓</span> Industry educators
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#B8F56A]">✓</span> Authors and thought leaders
              </span>
            </div>
          </div>
        </div>

        {/* THREE GLASS FEATURES INSIDE THE HERO */}
        <div className="hero-features-wrap mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="intro-item">
              <span className="intro-icon">🌍</span>
              <div>
                <p className="font-extrabold tracking-tight text-white">
                  A Global Network
                </p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Fitness knowledge without borders
                </p>
              </div>
            </div>

            <div className="intro-item">
              <span className="intro-icon">🎓</span>
              <div>
                <p className="font-extrabold tracking-tight text-white">
                  Expert Knowledge
                </p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Discover specialist perspectives
                </p>
              </div>
            </div>

            <div className="intro-item">
              <span className="intro-icon">🎙️</span>
              <div>
                <p className="font-extrabold tracking-tight text-white">
                  Podcast Production
                </p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Turn expertise into conversations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#719C4C]">
              Explore the industry
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#103D32] sm:text-4xl">
              Knowledge Across Every Corner of Fitness
            </h2>
            <p className="mt-4 leading-7 text-[#60766A]">
              Explore specialist topics and discover the people sharing knowledge,
              experience and new ideas across the fitness world.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <a
                key={category.name}
                href={`/experts?category=${encodeURIComponent(category.name)}`}
                className="category-card group overflow-hidden rounded-2xl border border-[#E7EEE5] bg-white"
              >
                <div className="category-image-wrap">
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="category-image"
                    loading="lazy"
                  />
                  <div className="category-image-shade" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-[#173D32]">
                    {category.name}
                  </h3>
                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#78867D]">
                    {category.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#54833F]">
                    Explore topic <ArrowIcon />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-[#B8D995] px-6 py-3 text-sm font-bold text-[#315C3D] transition hover:bg-[#F0F8E8]"
            >
              Explore All Categories <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[#F4F7F2] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#719C4C]">
              About FitnessXpods
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#103D32] sm:text-4xl">
              More Than a Directory.
              <span className="block text-[#6E9E49]">A Platform for Influence.</span>
            </h2>
            <p className="mt-6 leading-8 text-[#66766D]">
              FitnessXpods brings together the people, ideas and conversations
              shaping the global fitness industry. Our goal is to make it easier
              to discover knowledgeable professionals and connect their expertise
              with audiences around the world.
            </p>
            <p className="mt-4 leading-8 text-[#66766D]">
              Alongside our expert directory, we help fitness professionals
              develop and produce high-quality podcasts — from recording and
              editing to video content and publishing.
            </p>
            <a
              href="#partner"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#073D34] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#105548]"
            >
              Discover Our Approach <ArrowIcon />
            </a>
          </div>

          <div className="grid gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.number}
                className="flex gap-5 rounded-2xl border border-[#E4EBE0] bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DDF1C8] text-sm font-extrabold text-[#315D3C]">
                  {benefit.number}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-[#173D32]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#78867D]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PODCAST PRODUCTION */}
      <section className="bg-[#073D34] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B8F56A] text-[#173D32]">
              <MicIcon />
            </div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B8F56A]">
              Our Podcast Services
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Your Expertise Deserves to Be Heard.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-white/75">
              We help fitness professionals transform their knowledge into
              compelling podcast experiences. From production planning and
              recording guidance to editing, video and publishing, we help bring
              your voice to a wider audience.
            </p>
            <a
              href="#partner"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#B8F56A] px-7 py-3.5 text-sm font-extrabold text-[#173D32] transition hover:bg-[#A6E75B]"
            >
              Explore Podcast Production <ArrowIcon />
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#B8F56A]">
              From expertise to impact
            </p>
            <div className="mt-8 space-y-6">
              {[
                ["01", "Plan", "Shape your podcast concept and strategy."],
                ["02", "Produce", "Record, edit and create professional content."],
                ["03", "Publish", "Prepare and publish your podcast episodes."],
                ["04", "Grow", "Build visibility and reach your audience."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4">
                  <span className="text-sm font-extrabold text-[#B8F56A]">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section id="partner" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
        <div className="partner-banner relative mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
          <div className="partner-glow" aria-hidden="true" />

          <div className="relative z-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B8F56A]">
              Become Part of the Network
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Are You Shaping the Future of Fitness?
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/75">
              Whether you are a coach, author, researcher, educator or fitness
              industry leader, we would love to hear your story.
            </p>
            <a
              href="mailto:hello@fitnessxpods.com"
              className="partner-button mt-8 inline-flex items-center gap-2 rounded-full bg-[#B8F56A] px-8 py-4 text-sm font-extrabold text-[#073D34] transition hover:bg-[#D1FF91]"
            >
              Partner With FitnessXpods <ArrowIcon />
            </a>
          </div>

          <div className="partner-photo-frame relative z-10">
            <img
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=90"
              alt="Professional fitness expert in a training environment"
              className="partner-photo"
              loading="lazy"
            />
            <div className="partner-photo-glow" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#B8F56A]">
              Let's start a conversation
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Have a Story, an Idea or a Partnership in Mind?
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-white/70">
              Whether you are a fitness expert, podcast guest, industry
              professional or potential partner, we would love to connect
              and hear what you have in mind.
            </p>
          </div>

          <div className="contact-card rounded-3xl border border-white/10 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-sm sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B8F56A] text-[#073D34]">
              <MicIcon />
            </div>
            <h3 className="mt-6 text-2xl font-extrabold text-white">
              Get in Touch
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Tell us about your expertise, your podcast idea or how you would
              like to work with FitnessXpods.
            </p>
            <a
              href="mailto:hello@fitnessxpods.com"
              className="mt-7 flex items-center justify-between gap-3 rounded-xl bg-[#B8F56A] px-5 py-4 font-bold text-[#173D32] transition hover:bg-[#A6E75B]"
            >
              <span className="break-all">hello@fitnessxpods.com</span>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#062F29] px-5 pb-8 pt-12 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B8F56A] text-[#073D34]">
                <MicIcon />
              </span>
              <span className="text-2xl font-extrabold tracking-tight">
                Fitness<span className="text-[#B8F56A]">X</span>pods
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Connecting fitness knowledge, industry expertise and meaningful
              conversations with a global audience.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-[#B8F56A]">Explore</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <a className="footer-link" href="/experts">Find Experts</a>
              <a className="footer-link" href="/categories">Categories</a>
              <a className="footer-link" href="#about">About Us</a>
              <a className="footer-link" href="#partner">Partner With Us</a>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-[#B8F56A]">Get in Touch</h3>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <a className="footer-link" href="mailto:hello@fitnessxpods.com">
                hello@fitnessxpods.com
              </a>
              <a className="footer-link" href="#contact">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 pt-7 text-xs text-white/45 sm:flex-row">
          <p>© 2026 FitnessXpods. All rights reserved.</p>
          <p>Connecting knowledge. Creating influence.</p>
        </div>
      </footer>

      {/* PAGE STYLES */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #ffffff;
        }

        .nav-link {
          position: relative;
          border-radius: 12px;
          padding: 10px 13px;
          color: #365447;
          font-size: 14px;
          font-weight: 650;
          transition: all 0.25s ease;
        }

        .nav-link:hover {
          color: #234a34;
          background: #eaf5df;
          box-shadow: 0 3px 14px rgba(142, 190, 104, 0.18);
        }

        /* HERO */
        .hero-section {
          background:
            radial-gradient(ellipse at 15% 45%, rgba(184, 245, 106, 0.13), transparent 36%),
            #073d34;
        }

        .hero-photo {
          background-image: url("https://i.shgcdn.com/d3caec4b-9c0f-434c-8db5-324170a30c98/-/format/auto/-/preview/3000x3000/-/quality/lighter/");
          background-size: cover;
          background-position: 72% center;
          transform: scale(1.02);
          filter: saturate(0.88);
        }

        .hero-overlay {
          background:
            linear-gradient(
              90deg,
              #04231d 0%,
              rgba(4, 35, 29, 0.98) 30%,
              rgba(4, 35, 29, 0.82) 48%,
              rgba(4, 35, 29, 0.34) 72%,
              rgba(4, 35, 29, 0.10) 100%
            ),
            linear-gradient(
              0deg,
              rgba(4, 35, 29, 0.24),
              transparent 45%,
              rgba(4, 35, 29, 0.12)
            );
        }

        .hero-aura {
          position: absolute;
          z-index: -1;
          top: 12%;
          left: 8%;
          width: 500px;
          height: 400px;
          pointer-events: none;
          background: radial-gradient(
            ellipse,
            rgba(184, 245, 106, 0.16),
            rgba(184, 245, 106, 0.045) 40%,
            transparent 72%
          );
          filter: blur(28px);
          animation: aura-breathe 7s ease-in-out infinite alternate;
        }

        .hero-heading {
          position: relative;
          text-shadow: 0 4px 35px rgba(184, 245, 106, 0.12);
        }

        /* INFLUENCE EFFECT - KEPT EXACTLY AS BEFORE */
        .influence-text {
          display: inline;
          background: linear-gradient(
            100deg,
            #b8f56a 0%,
            #e3ffb8 45%,
            #91d64d 75%,
            #caff85 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 18px rgba(184, 245, 106, 0.24));
        }

        @keyframes aura-breathe {
          from {
            opacity: 0.55;
            transform: scale(0.94);
          }
          to {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        /* PREMIUM LUXURY SEARCH */
        .premium-search {
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.85);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.99),
            rgba(244, 250, 239, 0.97)
          );
          box-shadow:
            0 18px 55px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(184, 245, 106, 0.15),
            0 0 30px rgba(184, 245, 106, 0.1);
          transition:
            box-shadow 0.35s ease,
            transform 0.35s ease,
            border-color 0.35s ease;
        }

        .premium-search::before {
          content: "";
          position: absolute;
          inset: -2px;
          z-index: -1;
          border-radius: inherit;
          background: linear-gradient(
            110deg,
            rgba(184, 245, 106, 0.65),
            transparent 35%,
            rgba(184, 245, 106, 0.25)
          );
          filter: blur(12px);
          opacity: 0.45;
          transition: opacity 0.35s ease;
        }

        .premium-search:focus-within {
          transform: translateY(-3px);
          border-color: #b8f56a;
          box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.34),
            0 0 0 3px rgba(184, 245, 106, 0.24),
            0 0 35px rgba(184, 245, 106, 0.2);
        }

        .premium-search:focus-within::before {
          opacity: 0.9;
        }

        .search-icon {
          background: linear-gradient(145deg, #f2ffdf, #d5f3ac);
          border: 1px solid rgba(128, 177, 76, 0.22);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.98),
            0 5px 16px rgba(116, 165, 70, 0.22),
            0 0 14px rgba(184, 245, 106, 0.12);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .premium-search:focus-within .search-icon {
          transform: scale(1.07);
          box-shadow:
            0 0 22px rgba(184, 245, 106, 0.48),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
        }

        .premium-search-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            120deg,
            #caff85 0%,
            #b8f56a 48%,
            #a4e653 100%
          );
          box-shadow:
            0 5px 16px rgba(107, 157, 57, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.65);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            filter 0.3s ease;
        }

        .premium-search-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.04);
          box-shadow:
            0 8px 23px rgba(184, 245, 106, 0.32),
            0 0 20px rgba(184, 245, 106, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .premium-search-button:active {
          transform: translateY(0);
        }

        /* GREEN GLASS FEATURES - INSIDE HERO BACKGROUND */
        .hero-features-wrap {
          position: relative;
          z-index: 2;
        }

        .intro-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 17px;
          min-height: 112px;
          padding: 20px 24px;
          border: 1px solid rgba(184, 245, 106, 0.22);
          border-radius: 20px;
          background: rgba(5, 48, 39, 0.48);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.07),
            0 8px 28px rgba(0, 0, 0, 0.12),
            0 0 20px rgba(184, 245, 106, 0.035);
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .intro-item:hover {
          transform: translateY(-4px);
          border-color: rgba(184, 245, 106, 0.48);
          background: rgba(7, 61, 52, 0.62);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.09),
            0 14px 34px rgba(0, 0, 0, 0.18),
            0 0 24px rgba(184, 245, 106, 0.09);
        }

        .intro-icon {
          display: flex;
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(184, 245, 106, 0.42);
          border-radius: 17px;
          background: rgba(184, 245, 106, 0.12);
          color: #dfffad;
          font-size: 25px;
          box-shadow:
            0 0 18px rgba(184, 245, 106, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transition:
            box-shadow 0.3s ease,
            transform 0.3s ease,
            background 0.3s ease;
        }

        .intro-item:hover .intro-icon {
          transform: scale(1.06);
          background: rgba(184, 245, 106, 0.18);
          box-shadow:
            0 0 23px rgba(184, 245, 106, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        /* CATEGORY PHOTOGRAPH CARDS */
        .category-card {
          transform: perspective(900px) rotate(0deg);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .category-card:hover {
          transform: perspective(900px) translateY(-5px) rotate(-0.5deg);
          border-color: #b8d995;
          box-shadow: 0 15px 35px rgba(30, 75, 45, 0.14);
        }

        .category-image-wrap {
          position: relative;
          height: 190px;
          overflow: hidden;
          background: #eaf3e5;
        }

        .category-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }

        .category-card:hover .category-image {
          transform: scale(1.06);
        }

        .category-image-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 48%,
            rgba(5, 38, 30, 0.24) 100%
          );
          pointer-events: none;
        }

        /* PARTNER CTA WITH LARGE IMAGE - UNCHANGED */
        .partner-banner {
          isolation: isolate;
          background:
            radial-gradient(ellipse at 15% 15%, rgba(184, 245, 106, 0.17), transparent 42%),
            linear-gradient(135deg, #073d34 0%, #052d27 100%);
          border: 1px solid rgba(184, 245, 106, 0.25);
          box-shadow:
            0 24px 70px rgba(7, 61, 52, 0.17),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .partner-glow {
          position: absolute;
          z-index: -1;
          width: 420px;
          height: 420px;
          top: -230px;
          left: 28%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(184, 245, 106, 0.2),
            rgba(184, 245, 106, 0) 70%
          );
          filter: blur(12px);
          pointer-events: none;
        }

        .partner-photo-frame {
          min-height: 320px;
          padding: 9px;
          border: 1px solid rgba(184, 245, 106, 0.35);
          border-radius: 25px;
          background: linear-gradient(
            145deg,
            rgba(184, 245, 106, 0.25),
            rgba(255, 255, 255, 0.04)
          );
          box-shadow:
            0 0 35px rgba(184, 245, 106, 0.12),
            0 20px 45px rgba(0, 0, 0, 0.2);
        }

        .partner-photo {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          height: 320px;
          border-radius: 18px;
          object-fit: cover;
          object-position: center;
        }

        .partner-photo-glow {
          position: absolute;
          z-index: -1;
          inset: 15%;
          border-radius: 50%;
          background: rgba(184, 245, 106, 0.2);
          filter: blur(55px);
          pointer-events: none;
        }

        .partner-button {
          box-shadow: 0 8px 25px rgba(184, 245, 106, 0.16);
        }

        .partner-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 10px 30px rgba(184, 245, 106, 0.3),
            0 0 20px rgba(184, 245, 106, 0.12);
        }

        /* CONTACT */
        .contact-section {
          background:
            radial-gradient(ellipse at 85% 15%, rgba(184, 245, 106, 0.13), transparent 35%),
            linear-gradient(135deg, #073d34 0%, #052d27 100%);
        }

        .contact-card {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          border-color: rgba(184, 245, 106, 0.4);
        }

        /* FOOTER */
        .footer-link {
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #b8f56a;
        }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .hero-photo {
            background-position: 65% center;
          }

          .hero-overlay {
            background: linear-gradient(
              90deg,
              rgba(4, 35, 29, 0.96),
              rgba(4, 35, 29, 0.82)
            );
          }

          .hero-aura {
            left: -120px;
            width: 350px;
          }

          .category-image-wrap {
            height: 205px;
          }

          .partner-photo-frame {
            min-height: 250px;
          }

          .partner-photo {
            height: 250px;
          }

          .intro-item {
            min-height: 96px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}













