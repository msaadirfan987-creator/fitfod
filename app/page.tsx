import Link from "next/link";

const categories = [
{ name: "Weight Loss", subcategories: "Fat loss, metabolic health, obesity" },
{ name: "Nutrition & Diet", subcategories: "Keto, Mediterranean, vegan, paleo" },
{ name: "Strength Training", subcategories: "Weightlifting, bodybuilding, powerlifting" },
{ name: "Cardiovascular Fitness", subcategories: "Heart health, aerobic conditioning" },
{ name: "Running", subcategories: "Marathons, jogging, trail running" },
{ name: "Walking & Hiking", subcategories: "Daily walking, trekking, rucking" },
{ name: "Yoga", subcategories: "Hatha, Vinyasa, restorative yoga" },
{ name: "Pilates", subcategories: "Mat, reformer, core strengthening" },
{ name: "Mobility & Flexibility", subcategories: "Stretching, joint mobility" },
{ name: "Longevity & Healthy Aging", subcategories: "Fitness over 50, 60, and 70" },
{ name: "Women's Fitness", subcategories: "Pregnancy, postpartum, menopause" },
{ name: "Men's Fitness", subcategories: "Muscle development, age-related fitness" },
{ name: "Sports Performance", subcategories: "Athletic training, speed, agility" },
{ name: "Functional Fitness", subcategories: "Everyday strength, balance" },
{ name: "HIIT & Conditioning", subcategories: "Interval training, circuit workouts" },
{ name: "Recovery & Injury Prevention", subcategories: "Rehabilitation, physical therapy" },
{ name: "Sleep & Recovery", subcategories: "Sleep optimization, rest" },
{ name: "Mind-Body Wellness", subcategories: "Meditation, stress reduction" },
{ name: "Outdoor Fitness", subcategories: "Cycling, swimming, adventure" },
{ name: "Fitness Technology", subcategories: "Wearables, tracking, AI coaching" },
{ name: "Specialized Fitness", subcategories: "Disability-adapted fitness, chronic conditions" },
];

export default function CategoriesPage() {
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
      Discover fitness, health, and wellness experts across 21 specialized  
      categories.  
    </p>  
  </section>  

  <section className="mx-auto max-w-7xl px-6 py-16">  
    <div className="mb-10">  
      <p className="text-sm font-semibold text-[#9A843A]">  
        EXPLORE OUR NETWORK  
      </p>  
      <h2 className="mt-2 text-3xl font-extrabold text-[#063B35]">  
        21 Fitness Categories  
      </h2>  
    </div>  

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">  
      {categories.map((category, index) => (  
        <Link  
          key={category.name}  
         href={`/experts?category=${encodeURIComponent(category.name)}`} 
          className="group rounded-[24px] border border-[#E7EDE3] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"  
        >  
          <p className="text-xs font-bold uppercase tracking-widest text-[#9A843A]">  
            Category {String(index + 1).padStart(2, "0")}  
          </p>  

          <h3 className="mt-4 text-xl font-extrabold text-[#063B35]">  
            {category.name}  
          </h3>  

          <p className="mt-3 text-sm leading-6 text-[#718078]">  
            {category.subcategories}  
          </p>  

          <div className="mt-6 text-sm font-bold text-[#587B35]">  
            Explore Experts →  
          </div>  
        </Link>  
      ))}  
    </div>  
  </section>  
</main>

);
}