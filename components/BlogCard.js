"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link href={`/post/${post._id}`} className="block">
      <motion.div
        whileHover={{ y: -6 }}
        className="card p-5 hover-lift cursor-pointer h-full flex flex-col justify-between"
      >
        <div>
          <h3 className="font-serif text-xl text-primary-red mb-2">
            {post.title}
          </h3>
          <p className="text-[var(--text-secondary)] mb-3">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-light-green">
          <span>{post.category}</span>
          <span>{post.readTime} min read</span>
        </div>
      </motion.div>
    </Link>
  );
}
