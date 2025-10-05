import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import SectionHeader from "@/components/SectionHeader";
import PostClient from "@/components/PostClient"; // 👈 import client component

export async function generateMetadata({ params }) {
  const db = await getDb();
  const post = await db.collection("posts").findOne({ _id: new ObjectId(params.id) });
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} — Knowledge & Wisdom Hub` };
}

export default async function PostPage({ params }) {
  const db = await getDb();
  const post = await db.collection("posts").findOne({ _id: new ObjectId(params.id) });

  if (!post) {
    return <div className="container py-12">❌ Post not found</div>;
  }

  const safePost = {
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt ? post.createdAt.toString() : null,
    likes: post.likes || 0,
    comments: post.comments || [],
  };

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <SectionHeader
        title={safePost.title}
        subtitle={`${safePost.category} • ${safePost.readTime} min read`}
      />

      {/* Pass post to client component */}
      <PostClient post={safePost} />
    </div>
  );
}
