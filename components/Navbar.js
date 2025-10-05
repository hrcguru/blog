"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/category/science-tech", label: "Science & Tech" },
    { href: "/category/scripture", label: "Scripture" },
    { href: "/category/music", label: "Music" },
    { href: "/category/esoteric", label: "Esoteric Science" },
    { href: "/category/upsc", label: "UPSC" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-primary-yellow nav-blur shadow-md bg-[var(--nav-bg)] backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
        >
          Hritik Blog
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Links */}
        <ul
          className={`md:flex gap-6 items-center transition-all duration-300 ${
            open
              ? "absolute top-16 left-0 w-full bg-[var(--bg-primary)] p-6 flex flex-col gap-4 shadow-lg"
              : "hidden md:flex"
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 ${
                  pathname === l.href
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 shadow-md"
                    : "text-[var(--text-primary)]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Dark/Light Toggle */}
          <li>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-4 py-2 rounded-full border-2 border-yellow-400 font-medium transition hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </li>

          {/* Admin / Login */}
          <li>
            {loggedIn ? (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                🛠 Admin
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                🔑 Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
