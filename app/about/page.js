import SectionHeader from "@/components/SectionHeader";

export const metadata = {
  title: "About Me and Blogs"
};

export default function AboutPage() {
  return (
    <div className="container py-12">
      <SectionHeader title="About Me" subtitle="A passionate explorer of knowledge, bridging ancient wisdom with modern insights" />
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <div className="w-56 h-56 rounded-full mx-auto flex items-center justify-center text-6xl"
             style={{ background: "linear-gradient(135deg, var(--accent-color), #F7DC6F)" }}>👨‍💼</div>
        <div className="md:col-span-2 space-y-4 text-[var(--text-secondary)]">
          <p>I'm a multifaceted individual passionate about exploring the depths of knowledge across various domains. From the timeless wisdom of Bhagavad Gita and Ramcharitmanas to cutting-edge science and technology, I believe in the power of diverse learning.</p>
          <p>My journey encompasses civil services preparation, musical exploration, and the fascinating world of esoteric sciences. Through this platform, I share insights that bridge ancient wisdom with modern applications.</p>
          <p>Join me as we explore how traditional scriptures can guide us in corporate affairs and daily life, while staying updated with the latest in science and technology.</p>
        </div>
      </div>
    </div>
  );
}
