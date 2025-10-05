"use client";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setOk(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setLoading(false);
      setOk(res.ok);

      if (res.ok) {
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setLoading(false);
      setOk(false);
    }
  }

  return (
    <div className="container py-16">
      <SectionHeader
        title="📩 Get In Touch"
        subtitle="Let's connect and share knowledge together"
      />

      <form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto bg-[var(--bg-secondary)] p-8 rounded-2xl shadow-lg space-y-6 border border-[var(--border-color)]"
      >
        <div>
          <label className="block mb-2 font-semibold text-primary-yellow">
            Name
          </label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] focus:ring-2 focus:ring-yellow-400 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-primary-yellow">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] focus:ring-2 focus:ring-yellow-400 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-primary-yellow">
            Subject
          </label>
          <input
            required
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] focus:ring-2 focus:ring-yellow-400 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-primary-yellow">
            Message
          </label>
          <textarea
            required
            rows={5}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className="w-full p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] focus:ring-2 focus:ring-yellow-400 outline-none transition"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[var(--dark-green)] font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          {loading ? "⏳ Sending..." : "📤 Send Message"}
        </button>

        {ok === true && (
          <p className="text-green-700 font-medium mt-2 text-center animate-fadeIn">
            ✅ Thank you! Your message has been received.
          </p>
        )}
        {ok === false && (
          <p className="text-red-700 font-medium mt-2 text-center animate-fadeIn">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
