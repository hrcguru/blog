"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// ✅ Rich text editor (client-only)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("write"); 
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]); // ✅ store comments
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    readTime: 5,
  });

  const categories = [
    { value: "science-tech", label: "Science & Tech" },
    { value: "scripture", label: "Scripture" },
    { value: "music", label: "Music" },
    { value: "esoteric", label: "Esoteric Science" },
    { value: "upsc", label: "UPSC" },
  ];

  // ✅ Fetch blogs
  async function fetchPosts() {
    const res = await fetch("/api/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
  }

  // ✅ Fetch messages
  async function fetchMessages() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/contact", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  }

  // ✅ Fetch comments from all posts
  async function fetchComments() {
    try {
      let allComments = [];
      for (const post of posts) {
        const res = await fetch(`/api/posts/${post._id}/comment`);
        if (res.ok) {
          const data = await res.json();
          const withPost = data.map((c) => ({ ...c, postId: post._id, postTitle: post.title }));
          allComments = [...allComments, ...withPost];
        }
      }
      setComments(allComments);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setAuthorized(true);
    fetchPosts();
    fetchMessages();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      fetchComments();
    }
  }, [posts]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  // ✅ Blog Submit
  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = editingId ? `/api/posts/${editingId}` : "/api/posts";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: "", category: "", excerpt: "", content: "", readTime: 5 });
      setEditingId(null);
      fetchPosts();
      alert(editingId ? "✏️ Blog updated!" : "✅ Blog created!");
    } else {
      alert("❌ Failed to save blog");
    }
  }

  function handleEdit(post) {
    setEditingId(post._id);
    setForm({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      readTime: post.readTime,
    });
    setActiveTab("write");
  }

  async function handleDelete(id) {
    if (!confirm("Delete this blog?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchPosts();
      alert("🗑 Blog deleted");
    } else {
      alert("❌ Failed to delete blog");
    }
  }

  // ✅ Delete comment
  async function handleDeleteComment(postId, commentId) {
    if (!confirm("Delete this comment?")) return;
    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });
      if (res.ok) {
        fetchComments();
        alert("🗑 Comment deleted");
      } else {
        alert("❌ Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete comment failed", err);
    }
  }

  if (!authorized) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-800 to-gray-900 text-white flex flex-col p-6 space-y-4 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">🛠 Admin</h1>
        <nav className="space-y-2">
          <button className={`w-full text-left px-4 py-2 rounded ${activeTab === "write" ? "bg-green-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("write")}>
            ✍️ Write Blog
          </button>
          <button className={`w-full text-left px-4 py-2 rounded ${activeTab === "blogs" ? "bg-green-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("blogs")}>
            📚 Existing Blogs
          </button>
          <button className={`w-full text-left px-4 py-2 rounded ${activeTab === "messages" ? "bg-green-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("messages")}>
            📩 Messages
          </button>
          <button className={`w-full text-left px-4 py-2 rounded ${activeTab === "comments" ? "bg-green-600" : "hover:bg-gray-700"}`} onClick={() => setActiveTab("comments")}>
            💬 Comments
          </button>
        </nav>
        <button onClick={handleLogout} className="mt-auto px-4 py-2 bg-red-600 rounded hover:bg-red-700">
          🚪 Logout
        </button>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        
        {/* Blog Writing */}
        {activeTab === "write" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">{editingId ? "✏️ Edit Blog" : "➕ Write Blog"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
              <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <input name="excerpt" placeholder="Excerpt" value={form.excerpt} onChange={handleChange} className="w-full p-2 border rounded" />

              {/* ✅ Rich Text Editor */}
              <ReactQuill theme="snow" value={form.content} onChange={(value) => setForm({ ...form, content: value })} className="bg-white rounded" placeholder="Write blog content..." />

              <input type="number" name="readTime" placeholder="Read Time" value={form.readTime} onChange={handleChange} className="w-full p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                {editingId ? "Update Blog" : "Add Blog"}
              </button>
            </form>
          </section>
        )}

        {/* Existing Blogs */}
        {activeTab === "blogs" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">📚 Existing Blogs</h2>
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post._id} className="p-4 border rounded flex justify-between items-center bg-white shadow">
                  <div>
                    <h3 className="font-bold">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.category} • {post.readTime} min read</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(post)} className="px-3 py-1 bg-blue-500 text-white rounded">✏️ Edit</button>
                    <button onClick={() => handleDelete(post._id)} className="px-3 py-1 bg-red-500 text-white rounded">🗑 Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Contact Messages */}
        {activeTab === "messages" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">📩 Messages</h2>
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages yet.</p>
            ) : (
              <ul className="space-y-4">
                {messages.map((msg) => (
                  <li key={msg._id} className="p-4 border rounded bg-white shadow">
                    <p className="font-semibold">
                      {msg.name}{" "}
                      <span className="text-sm text-gray-500">
                        (<a href={`mailto:${msg.email}`} className="text-blue-600">{msg.email}</a>)
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">{msg.subject}</p>
                    <p className="mt-2">{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* ✅ Comments Management */}
        {activeTab === "comments" && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">💬 Comments</h2>
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li key={c._id} className="p-4 border rounded bg-white shadow flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{c.user} <span className="text-xs text-gray-500">on {c.postTitle}</span></p>
                      <p className="mt-1 text-gray-700">{c.text}</p>
                      <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleDeleteComment(c.postId, c._id)} className="px-3 py-1 bg-red-500 text-white rounded">🗑 Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

      </main>
    </div>
  );
}
