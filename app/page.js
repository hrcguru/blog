import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import BlogGrid from "@/components/BlogGrid";

// ✅ fetch by slug
async function fetchPosts(slug) {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "http://localhost:3000";

  const res = await fetch(`${base}/api/posts?category=${slug}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  // ✅ define display name + slug separately
  const sections = [
    { key: "Science & Tech", slug: "science-tech", subtitle: "Exploring innovation..." },
    { key: "Scripture", slug: "scripture", subtitle: "Ancient wisdom..." },
    { key: "Music", slug: "music", subtitle: "Harmony between sound..." },
    { key: "Esoteric Science", slug: "Esoteric Science", subtitle: "Mysteries of science & spirituality..." },
    { key: "UPSC", slug: "UPSC", subtitle: "Civil services insights..." }
  ];

  // ✅ fetch by slug, not display key
  const data = await Promise.all(
    sections.map(async (s) => ({
      ...s,
      posts: await fetchPosts(s.slug)
    }))
  );

  return (
    <>
      <Hero />
      <div className="container py-12">
        {data.map((section) => (
          <section key={section.slug} className="mb-16">
            <SectionHeader title={section.key} subtitle={section.subtitle} />
            <BlogGrid posts={section.posts} />
          </section>
        ))}
      </div>
    </>
  );
}
