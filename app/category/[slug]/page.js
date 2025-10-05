import SectionHeader from "@/components/SectionHeader";
import BlogGrid from "@/components/BlogGrid";

const MAP = {
  "science-tech": { title: "Science & Tech", subtitle: "Exploring the frontiers of innovation and scientific discovery" },
  "scripture": { title: "Scripture", subtitle: "Ancient wisdom for modern corporate and daily life" },
  "music": { title: "Music", subtitle: "Harmony between sound, emotion, and consciousness" },
  "esoteric": { title: "Esoteric Science", subtitle: "Mysteries at the intersection of science and spirituality" },
  "upsc": { title: "UPSC", subtitle: "Strategic insights and resources for civil services exam" }
};

async function fetchPosts(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/posts?category=${encodeURIComponent(category)}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const info = MAP[slug];
  if (!info) {
    return <div className="container py-12">Unknown category.</div>
  }
  const posts = await fetchPosts(info.title);
  return (
    <div className="container py-12">
      <SectionHeader title={info.title} subtitle={info.subtitle} />
      <BlogGrid posts={posts} />
    </div>
  );
}
