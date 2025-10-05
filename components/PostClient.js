"use client";
import { useState, useEffect } from "react";

export default function PostClient({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // ✅ Load comments dynamically
  useEffect(() => {
    async function loadComments() {
      const res = await fetch(`/api/posts/${post._id}/comment`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    }
    loadComments();
  }, [post._id]);

  async function handleLike() {
    const res = await fetch(`/api/posts/${post._id}/like`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setLikes(data.likes);
    }
  }

  async function handleAddComment() {
    if (!comment.trim()) return;
    const res = await fetch(`/api/posts/${post._id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: "Guest", text: comment }),
    });
    if (res.ok) {
      const updatedComments = await res.json();
      setComments(updatedComments); // 👈 refresh
      setComment("");
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {/* 👍 Likes */}
      <button
        onClick={handleLike}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        👍 Like ({likes})
      </button>

      {/* 💬 Comments */}
      <div>
        <h3 className="text-xl font-semibold mb-2">💬 Comments</h3>
        <ul className="space-y-2">
          {comments.map((c, i) => (
            <li key={i} className="p-2 border rounded bg-gray-50">
              <p className="font-medium">{c.user}</p>
              <p>{c.text}</p>
              <p className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Add
          </button>
        </div>
      </div>
    </div>
  );
}
