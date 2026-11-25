"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const experts = [
{
id: 1,
name: "Expert Profile 01",
role: "Nutrition & Wellness Specialist",
location: "Global Network",
image: "photo-1571019613454-1cb2f99b2d8b",
categories: ["Nutrition & Diet", "Weight Loss", "Women's Fitness"],
bio: "A dedicated nutrition and wellness specialist focused on helping individuals build healthier lifestyles through practical nutrition strategies and sustainable fitness habits.",
about:
"With a passion for health and wellness, this expert supports individuals in improving their overall well-being through balanced nutrition, personalized guidance, and realistic lifestyle changes.",
experience: "5+ Years",
specialty: "Nutrition & Wellness",
},
{
id: 2,
name: "Expert Profile 02",
role: "Strength & Conditioning Specialist",
location: "Global Network",
image: "photo-1534438327276-14e5300c3a48",
categories: ["Strength Training", "Sports Performance", "Functional Fitness"],
bio: "A strength and conditioning specialist passionate about improving physical performance, strength, and functional fitness.",
about:
"This expert focuses on structured strength programs, performance development, and helping individuals achieve sustainable fitness progress.",
experience: "6+ Years",
specialty: "Strength & Conditioning",
},
{
id: 3,
name: "Expert Profile 03",
role: "Yoga & Mind-Body Specialist",
location: "Global Network",
image: "photo-1544367567-0f2fcb009e0b",
categories: ["Yoga", "Mobility & Flexibility", "Mind-Body Wellness"],
bio: "A yoga and mind-body specialist helping individuals improve flexibility, balance, mobility, and mental well-being.",
about:
"Through mindful movement and structured yoga practices, this expert encourages a balanced approach to physical and mental wellness.",
experience: "5+ Years",
specialty: "Yoga & Mind-Body Wellness",
},
{
id: 4,
name: "Expert Profile 04",
role: "Running & Endurance Specialist",
location: "Global Network",
image: "photo-1552674605-db6ffd4facb5",
categories: ["Running", "Cardiovascular Fitness", "Outdoor Fitness"],
bio: "An endurance specialist focused on helping individuals improve stamina, cardiovascular fitness, and running performance.",
about:
"This expert promotes consistent training, endurance development, and practical fitness strategies for active lifestyles.",
experience: "4+ Years",
specialty: "Running & Endurance",
},
{
id: 5,
name: "Expert Profile 05",
role: "Recovery & Healthy Aging Specialist",
location: "Global Network",
image: "photo-1571019614242-c5c5dee9f50b",
categories: ["Longevity & Healthy Aging", "Recovery & Injury Prevention", "Sleep & Recovery"],
bio: "A wellness specialist interested in recovery, healthy aging, and sustainable long-term health practices.",
about:
"This expert emphasizes recovery strategies, healthy routines, and lifestyle practices that support long-term well-being.",
experience: "7+ Years",
specialty: "Recovery & Healthy Aging",
},
{
id: 6,
name: "Expert Profile 06",
role: "Fitness Technology Specialist",
location: "Global Network",
image: "photo-1517836357463-d25dfeac3438",
categories: ["Fitness Technology", "HIIT & Conditioning", "Men's Fitness"],
bio: "A fitness technology specialist exploring modern training methods and technology-supported fitness experiences.",
about:
"This expert focuses on combining modern fitness approaches with practical training methods to support better performance.",
experience: "5+ Years",
specialty: "Fitness Technology",
},
{
id: 7,
name: "Expert Profile 07",
role: "Pilates & Mobility Specialist",
location: "Global Network",
image: "photo-1518611012118-696072aa579a",
categories: ["Pilates", "Mobility & Flexibility", "Functional Fitness"],
bio: "A Pilates and mobility specialist focused on posture, flexibility, body control, and functional movement.",
about:
"This expert encourages mindful movement and structured exercises to improve mobility, stability, and overall body awareness.",
experience: "4+ Years",
specialty: "Pilates & Mobility",
},
{
id: 8,
name: "Expert Profile 08",
role: "Outdoor Fitness Specialist",
location: "Global Network",
image: "photo-1530549387789-4c1017266635",
categories: ["Outdoor Fitness", "Walking & Hiking", "Sports Performance"],
bio: "An outdoor fitness specialist passionate about active lifestyles, outdoor training, and physical performance.",
about:
"This expert promotes outdoor activities and practical fitness routines that help individuals stay active and motivated.",
experience: "5+ Years",
specialty: "Outdoor Fitness",
},
];

const photo = (id: string) =>
"https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85";

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

const expert = experts.find((item) => String(item.id) === String(slug));

if (!expert) {
return (
<main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8f5] px-6 text-center">
<h1 className="text-3xl font-bold text-[#183b32]">
Expert Not Found
</h1>
<p className="mt-3 text-gray-600">
The expert profile you are looking for is unavailable.
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

        <p className="mb-3 text-sm font-medium text-[#b8d7a9]">
          {expert.location}
        </p>

        <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
          {expert.name}
        </h1>

        <p className="mt-4 text-lg text-[#d5e2dc]">
          {expert.role}
        </p>

        <p className="mt-6 max-w-xl leading-8 text-[#d5e2dc]">
          {expert.bio}
        </p>

        <a
          href="#about"
          className="mt-9 inline-flex rounded-full bg-[#62D957] px-7 py-3.5 font-semibold text-[#183b32] transition hover:bg-white"
        >
          Explore Profile
        </a>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-4 rounded-[2rem] border border-white/20" />
        <img
          src={photo(expert.image)}
          alt={expert.name}
          className="relative h-[420px] w-full rounded-[1.5rem] object-cover shadow-2xl"
        />
        <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-white p-5 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Primary Specialty
          </p>
          <p className="mt-1 text-lg font-bold text-[#183b32]">
            {expert.specialty}
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* PROFILE HIGHLIGHTS */}
  <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
    <div className="rounded-2xl border border-gray-200 bg-white p-7">
      <p className="text-sm text-gray-500">Professional Experience</p>
      <h3 className="mt-3 text-3xl font-bold">{expert.experience}</h3>
    </div>

    <div className="rounded-2xl border border-gray-200 bg-white p-7">
      <p className="text-sm text-gray-500">Primary Specialty</p>
      <h3 className="mt-3 text-xl font-bold">{expert.specialty}</h3>
    </div>

    <div className="rounded-2xl border border-gray-200 bg-white p-7">
      <p className="text-sm text-gray-500">Network</p>
      <h3 className="mt-3 text-xl font-bold">Global Network</h3>
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
      <p className="mt-6 max-w-3xl leading-8 text-gray-600">
        {expert.about}
      </p>
    </div>

    <div className="rounded-2xl border border-gray-200 bg-white p-7">
      <h3 className="text-xl font-bold">Areas of Expertise</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {expert.categories.map((item) => (
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
      <p className="mt-4 max-w-2xl leading-7 text-gray-600">
        Professional qualifications, certifications, and verified
        credentials help visitors understand an expert's background.
      </p>
      <div className="mt-8">
        <EmptyState message="Verified credentials and qualifications will be displayed here when available." />
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
      <p className="mt-4 max-w-2xl leading-7 text-gray-600">
        Explore books and published resources connected to the expert's
        field of knowledge.
      </p>
      <div className="mt-8">
        <EmptyState message="Published books, verified retailer ratings, and purchase options will appear here when confirmed." />
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
      <p className="mt-4 max-w-2xl leading-7 text-gray-600">
        Find the expert's official website and verified social media
        profiles in one place.
      </p>
      <div className="mt-8">
        <EmptyState message="Official website and verified social media links will be added when available." />
      </div>
    </div>
  </section>

  {/* MEDIA APPEARANCES */}
  <section className="px-6 py-16">
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#69aa5b]">
        Featured Content
      </p>
      <h2 className="mt-3 text-3xl font-bold">
        Media Appearances
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-gray-600">
        Discover interviews, articles, and other public appearances
        featuring the expert.
      </p>
      <div className="mt-8">
        <EmptyState message="Verified interviews, articles, and media appearances will appear here when available." />
      </div>
    </div>
  </section>

  {/* PODCAST EPISODES */}
  <section className="bg-[#eaf1e7] px-6 py-16">
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#619b55]">
        FitPod Episodes
      </p>
      <h2 className="mt-3 text-3xl font-bold">
        Expert Interviews & Conversations
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-gray-600">
        Explore expert conversations, valuable insights, and discussions
        covering fitness, health, and wellness.
      </p>
      <div className="mt-8">
        <EmptyState message="Podcast episodes will be displayed here when available and authorized for publication." />
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
      to expand your reach through FitPod's managed podcast services.
    </p>
    <Link
      href="/experts"
      className="mt-8 inline-flex rounded-full bg-[#62D957] px-8 py-4 font-semibold text-[#183b32] transition hover:bg-white"
    >
      Explore FitPod Network
    </Link>
  </section>

  {/* DISCLAIMER */}
  <section className="border-t border-gray-200 bg-white px-6 py-8">
    <p className="mx-auto max-w-5xl text-center text-xs leading-6 text-gray-500">
      This is an illustrative profile layout, not a live FitPod listing or
      an indication of expert participation. Profile details, credentials,
      book ratings, audience information, media appearances, and podcast
      episodes must be independently verified before publication.
    </p>
  </section>

  {/* FOOTER */}
  <footer className="bg-[#142e28] px-6 py-8 text-center text-sm text-[#c7d4ce]">
    © {new Date().getFullYear()} FitPod. All rights reserved.
  </footer>
</main>

);
}