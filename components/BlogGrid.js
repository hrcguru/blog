import BlogCard from "./BlogCard";

export default function BlogGrid({ posts }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {posts.map(p => <BlogCard key={p._id || p.title} post={p} />)}
    </div>
  );
}
