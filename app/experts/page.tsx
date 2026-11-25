"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const categories = [
  { name: "Weight Loss", desc: "Fat loss, metabolic health and obesity", image: "photo-1571019613454-1cb2f99b2d8b" },
  { name: "Nutrition & Diet", desc: "Keto, Mediterranean, vegan and paleo", image: "photo-1490645935967-10de6ba17061" },
  { name: "Strength Training", desc: "Weightlifting, bodybuilding and powerlifting", image: "photo-1583454110551-21f2fa2afe61" },
  { name: "Cardiovascular Fitness", desc: "Heart health and aerobic conditioning", image: "photo-1538805060514-97d9cc17730c" },
  { name: "Running", desc: "Marathons, jogging and trail running", image: "photo-1552674605-db6ffd4facb5" },
  { name: "Walking & Hiking", desc: "Daily walking, trekking and rucking", image: "photo-1551632811-561732d1e306" },
  { name: "Yoga", desc: "Hatha, Vinyasa and restorative yoga", image: "photo-1544367567-0f2fcb009e0b" },
  { name: "Pilates", desc: "Mat, reformer and core strengthening", image: "photo-1518611012118-696072aa579a" },
  { name: "Mobility & Flexibility", desc: "Stretching and joint mobility", image: "photo-1517836357463-d25dfeac3438" },
  { name: "Longevity & Healthy Aging", desc: "Fitness over 50, 60 and 70", image: "photo-1517841905240-472988babdf9" },
  { name: "Women's Fitness", desc: "Pregnancy, postpartum and menopause", image: "photo-1518611012118-696072aa579a" },
  { name: "Men's Fitness", desc: "Muscle development and age-related fitness", image: "photo-1534438327276-14e5300c3a48" },
  { name: "Sports Performance", desc: "Athletic training, speed and agility", image: "photo-1461896836934-ffe607ba8211" },
  { name: "Functional Fitness", desc: "Everyday strength and balance", image: "photo-1517963879433-6ad2b056d712" },
  { name: "HIIT & Conditioning", desc: "Interval training and circuit workouts", image: "photo-1517838277536-f4e3b9c7c8b4" },
  { name: "Recovery & Injury Prevention", desc: "Rehabilitation and physical therapy", image: "photo-1571019614242-c5c5dee9f50b" },
  { name: "Sleep & Recovery", desc: "Sleep optimization and rest", image: "photo-1541781774459-bb2af2f05b55" },
  { name: "Mind-Body Wellness", desc: "Meditation and stress reduction", image: "photo-1506126613408-eca07ce68773" },
  { name: "Outdoor Fitness", desc: "Cycling, swimming and adventure", image: "photo-1471506480208-91b3a4cc78be" },
  { name: "Fitness Technology", desc: "Wearables, tracking and AI coaching", image: "photo-1510017803434-a899398421b3" },
  { name: "Specialized Fitness", desc: "Disability-adapted and inclusive fitness", image: "photo-1534438327276-14e5300c3a48" },
];

const experts = [
  {
    id: 1,
    name: "Expert Profile 01",
    role: "Nutrition & Wellness Specialist",
    location: "Global Network",
    bio: "A demo profile representing a professional specializing in nutrition, metabolic health and wellness.",
    categories: ["Nutrition & Diet", "Weight Loss", "Women's Fitness"],
    image: "photo-1534528741775-53994a69daeb",
    initials: "01",
    featured: true,
  },
  {
    id: 2,
    name: "Expert Profile 02",
    role: "Strength & Conditioning Specialist",
    location: "Global Network",
    bio: "A demo profile representing a professional working in strength, conditioning and athletic performance.",
    categories: ["Strength Training", "Sports Performance", "Functional Fitness"],
    image: "photo-1583454110551-21f2fa2afe61",
    initials: "02",
    featured: true,
  },
  {
    id: 3,
    name: "Expert Profile 03",
    role: "Yoga & Mind-Body Specialist",
    location: "Global Network",
    bio: "A demo profile representing a specialist in movement, flexibility and mind-body wellness.",
    categories: ["Yoga", "Mobility & Flexibility", "Mind-Body Wellness"],
    image: "photo-1580489944761-15a19d654956",
    initials: "03",
    featured: true,
  },
  {
    id: 4,
    name: "Expert Profile 04",
    role: "Running & Endurance Specialist",
    location: "Global Network",
    bio: "A demo profile representing an endurance and cardiovascular fitness professional.",
    categories: ["Running", "Cardiovascular Fitness", "Outdoor Fitness"],
    image: "photo-1500648767791-00dcc994a43e",
    initials: "04",
    featured: false,
  },
  {
    id: 5,
    name: "Expert Profile 05",
    role: "Recovery & Healthy Aging Specialist",
    location: "Global Network",
    bio: "A demo profile representing a professional focused on recovery and healthy aging.",
    categories: ["Longevity & Healthy Aging", "Recovery & Injury Prevention", "Sleep & Recovery"],
    image: "photo-1506794778202-cad84cf45f1d",
    initials: "05",
    featured: false,
  },
  {
    id: 6,
    name: "Expert Profile 06",
    role: "Fitness Technology Specialist",
    location: "Global Network",
    bio: "A demo profile representing a professional exploring fitness technology and training.",
    categories: ["Fitness Technology", "HIIT & Conditioning", "Men's Fitness"],
    image: "photo-1507003211169-0a1dd7228f2d",
    initials: "06",
    featured: false,
  },
  {
    id: 7,
    name: "Expert Profile 07",
    role: "Pilates & Mobility Specialist",
    location: "Global Network",
    bio: "A demo profile representing a professional in Pilates, movement and mobility.",
    categories: ["Pilates", "Mobility & Flexibility", "Functional Fitness"],
    image: "photo-1531123897727-8f129e1688ce",
    initials: "07",
    featured: false,
  },
  {
    id: 8,
    name: "Expert Profile 08",
    role: "Outdoor Fitness Specialist",
    location: "Global Network",
    bio: "A demo profile representing an outdoor fitness and adventure professional.",
    categories: ["Outdoor Fitness", "Walking & Hiking", "Sports Performance"],
    image: "photo-1506794778202-cad84cf45f1d",
    initials: "08",
    featured: false,
  },
];

const photo = (id: string, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const roles = Array.from(new Set(experts.map((expert) => expert.role)));
const locations = ["Global Network"];

export default function ExpertsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category");

  if (
    selectedCategory &&
    categories.some((item) => item.name === selectedCategory)
  ) {
    setCategory(selectedCategory);
    setPage(1);
  }
}, []);
  const [role, setRole] = useState("All Roles");
  const [location, setLocation] = useState("All Locations");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [page, setPage] = useState(1);

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const searchMatch =
        !search ||
        expert.name.toLowerCase().includes(search.toLowerCase()) ||
        expert.role.toLowerCase().includes(search.toLowerCase()) ||
        expert.bio.toLowerCase().includes(search.toLowerCase()) ||
        expert.categories.some((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        );

      const categoryMatch =
        category === "All Categories" || expert.categories.includes(category);
      const roleMatch = role === "All Roles" || expert.role === role;
      const locationMatch =
        location === "All Locations" || expert.location === location;

      return searchMatch && categoryMatch && roleMatch && locationMatch;
    });
  }, [search, category, role, location]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredExperts.length / pageSize));
  const visibleExperts = filteredExperts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setRole("All Roles");
    setLocation("All Locations");
    setPage(1);
  };

  const featuredExperts = experts.filter((expert) => expert.featured);

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

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Expert name or topic"
              className="golden-input min-w-0 rounded-xl px-4 py-3 text-sm text-[#23473C] placeholder:text-[#8A978E]"
            />
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="golden-input rounded-xl px-3 py-3 text-sm text-[#345448]">
              <option>All Categories</option>
              {categories.map((item) => <option key={item.name}>{item.name}</option>)}
            </select>
            <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="golden-input rounded-xl px-3 py-3 text-sm text-[#345448]">
              <option>All Roles</option>
              {roles.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={location} onChange={(e) => { setLocation(e.target.value); setPage(1); }} className="golden-input rounded-xl px-3 py-3 text-sm text-[#345448]">
              <option>All Locations</option>
              {locations.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#839087]">Search by specialist, category, professional role or location.</p>
            <button onClick={resetFilters} className="text-xs font-bold text-[#438D35] hover:text-[#063B35]">Clear filters ↺</button>
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
              21 specialist categories
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, showAllCategories ? 21 : 8).map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  setCategory(item.name);
                  setPage(1);
                  document.getElementById("directory-results")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="lime-glow group overflow-hidden rounded-2xl border border-[#E8EEE5] bg-white text-left shadow-[0_5px_18px_rgba(6,59,53,.04)]"
              >
                <div className="relative h-32 overflow-hidden sm:h-40">
                  <img src={photo(item.image, 600)} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
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
            ))}
          </div>

          <div className="mt-9 text-center">
            <button onClick={() => setShowAllCategories(!showAllCategories)} className="rounded-full border border-[#C6D98A] bg-gradient-to-r from-white to-[#F8F9E9] px-7 py-3 text-sm font-extrabold text-[#638B35] shadow-[0_5px_18px_rgba(185,216,91,.10)] transition hover:border-[#8BD77D] hover:shadow-[0_0_20px_rgba(98,217,87,.18)]">
              {showAllCategories ? "Show fewer categories ↑" : "Explore all 21 categories ↓"}
            </button>
          </div>
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
            {featuredExperts.map((expert) => (
  <Link
    key={expert.id}
    href={`/experts/${expert.id}`}
    className="expert-luxury group block overflow-hidden rounded-[25px]"
  >
    <div className="relative h-64 overflow-hidden bg-[#DDE8DC]">
                  <img src={photo(expert.image, 850)} alt={expert.name} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#063B35]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">Featured</div>
                  <div className="absolute right-4 top-4 rounded-full border border-[#E6D18B]/60 bg-[#063B35]/75 px-3 py-1.5 text-[10px] font-bold text-[#E9D994] backdrop-blur-md">Profile {expert.initials}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#063B35]/65 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-xs font-semibold text-white">FitnessXpods Network</div>
                </div>

                <div className="p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[.17em] text-[#9A843A]">Specialist · {expert.initials}</div>
                  <h3 className="mt-2 text-xl font-extrabold text-[#063B35]">{expert.role}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#718078]">{expert.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {expert.categories.map((item) => (
                      <span key={item} className="rounded-full border border-[#DDE9C9] bg-gradient-to-r from-[#F3F8E9] to-[#FBF7E9] px-3 py-1.5 text-[10px] font-bold text-[#587B35]">{item}</span>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-[#EDF0EA] pt-4">
                    <span className="text-[10px] font-semibold text-[#9A6C22]">Illustrative demo profile · Not a verified expert</span>
                  </div>
                </div>
              </Link>
            ))}
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
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#718078]">Search the directory and discover professionals by expertise, specialism and location.</p>
            </div>
            <div className="rounded-full border border-[#BFE1B9] bg-gradient-to-r from-white to-[#E5F5E2] px-4 py-2 text-xs font-bold text-[#438D42]">
              {filteredExperts.length} demo profiles shown
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-[#CDE5C9] bg-gradient-to-r from-white via-[#F2FAF0] to-[#E4F3E1] p-4 shadow-[0_12px_34px_rgba(40,110,55,.08)] sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-bold text-[#174B38]">Refine your results</div>
            <div className="flex flex-wrap gap-2">
              <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="golden-input max-w-full rounded-xl px-3 py-2.5 text-xs">
                <option>All Categories</option>
                {categories.map((item) => <option key={item.name}>{item.name}</option>)}
              </select>
              <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="golden-input max-w-full rounded-xl px-3 py-2.5 text-xs">
                <option>All Roles</option>
                {roles.map((item) => <option key={item}>{item}</option>)}
              </select>
              <select value={location} onChange={(e) => { setLocation(e.target.value); setPage(1); }} className="golden-input max-w-full rounded-xl px-3 py-2.5 text-xs">
                <option>All Locations</option>
                {locations.map((item) => <option key={item}>{item}</option>)}
              </select>
              <button onClick={resetFilters} className="rounded-xl border border-[#BFE1B9] bg-white px-4 py-2.5 text-xs font-bold text-[#438D42] hover:bg-[#EFF9ED]">Clear filters</button>
            </div>
          </div>

          {visibleExperts.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleExperts.map((expert) => (
                <Link
  key={expert.id}
  href={`/experts/${expert.id}`}
  className="directory-luxury group block overflow-hidden rounded-2xl bg-white"
>
                  <div className="flex gap-4 p-5">
                    <div className="relative shrink-0 rounded-xl p-[2px] bg-gradient-to-br from-[#BDE7A9] via-[#8BD77D] to-[#D5EED0]">
                      <img src={photo(expert.image, 300)} alt={expert.name} className="h-24 w-24 rounded-[10px] object-cover" loading="lazy" />
                    </div>
                    <div className="min-w-0 pt-1">
                      <div className="text-[9px] font-extrabold uppercase tracking-widest text-[#548D4A]">FitnessXpods Network</div>
                      <h3 className="mt-2 text-base font-black text-[#063B35]">{expert.name}</h3>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#597166]">{expert.role}</p>
                      <p className="mt-1 text-[10px] text-[#929D95]">{expert.location}</p>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <p className="text-xs leading-6 text-[#75837A]">{expert.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {expert.categories.map((item) => (
                        <span key={item} className="rounded-full border border-[#D5E9D0] bg-gradient-to-r from-[#F0F8EE] to-[#EAF6E7] px-2.5 py-1 text-[9px] font-bold text-[#54834B]">{item}</span>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-[#E5EFE2] pt-3 text-[10px] font-semibold text-[#72966B]">Demo profile · Details coming soon</div>
                  </div>
               </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#C8D9C5] bg-[#F8FAF7] px-5 py-12 text-center">
              <div className="text-lg font-black text-[#174B38]">No matching demo profiles</div>
              <p className="mt-2 text-sm text-[#78867E]">Try a different search or clear your filters.</p>
              <button onClick={resetFilters} className="mt-4 rounded-full bg-[#063B35] px-5 py-2.5 text-xs font-bold text-white">Clear filters</button>
            </div>
          )}

          {filteredExperts.length > pageSize && (
            <div className="mt-9 flex items-center justify-center gap-4">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded-full border border-[#DCE7D9] px-4 py-2.5 text-xs font-bold text-[#174B38] disabled:opacity-30">← Previous</button>
              <span className="text-xs font-bold text-[#718078]">{page} / {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-full border border-[#DCE7D9] px-4 py-2.5 text-xs font-bold text-[#174B38] disabled:opacity-30">Next →</button>
            </div>
          )}
          <p className="mt-5 text-center text-[10px] leading-5 text-[#9AA49C]">These are illustrative demo entries for layout and testing. They are not real or verified professional listings.</p>
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



