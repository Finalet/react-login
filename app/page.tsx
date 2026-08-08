"use client";

import React, { useState, useEffect } from "react";

// Pride Theme Presets
type ThemeKey = "progress" | "classic" | "trans" | "bi" | "nonbinary" | "lesbian" | "pan";

interface PrideTheme {
  name: string;
  icon: string;
  gradient: string;
  bgGlow: string;
  accentColor: string;
  borderGlow: string;
  colors: string[];
}

const PRIDE_THEMES: Record<ThemeKey, PrideTheme> = {
  progress: {
    name: "Progress Pride",
    icon: "🌈",
    gradient: "from-rose-500 via-amber-400 via-emerald-400 via-sky-400 to-purple-500",
    bgGlow: "rgba(236, 72, 153, 0.15)",
    accentColor: "text-pink-400",
    borderGlow: "hover:border-pink-500/50",
    colors: ["#e11d48", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#a855f7", "#ec4899"],
  },
  trans: {
    name: "Trans Pride",
    icon: "🏳️‍⚧️",
    gradient: "from-sky-400 via-pink-300 via-white via-pink-300 to-sky-400",
    bgGlow: "rgba(56, 189, 248, 0.15)",
    accentColor: "text-sky-300",
    borderGlow: "hover:border-sky-400/50",
    colors: ["#38bdf8", "#f472b6", "#ffffff", "#f472b6", "#38bdf8"],
  },
  bi: {
    name: "Bisexual Pride",
    icon: "💖",
    gradient: "from-pink-600 via-purple-600 to-blue-600",
    bgGlow: "rgba(192, 38, 211, 0.15)",
    accentColor: "text-purple-400",
    borderGlow: "hover:border-purple-500/50",
    colors: ["#d946ef", "#9333ea", "#2563eb"],
  },
  nonbinary: {
    name: "Non-Binary Pride",
    icon: "💛",
    gradient: "from-yellow-400 via-white via-purple-500 to-slate-900",
    bgGlow: "rgba(234, 179, 8, 0.15)",
    accentColor: "text-yellow-400",
    borderGlow: "hover:border-yellow-400/50",
    colors: ["#facc15", "#ffffff", "#a855f7", "#1e293b"],
  },
  lesbian: {
    name: "Lesbian Pride",
    icon: "🧡",
    gradient: "from-orange-600 via-rose-400 via-white via-pink-400 to-purple-700",
    bgGlow: "rgba(244, 63, 94, 0.15)",
    accentColor: "text-rose-400",
    borderGlow: "hover:border-rose-400/50",
    colors: ["#ea580c", "#f43f5e", "#ffffff", "#ec4899", "#7e22ce"],
  },
  pan: {
    name: "Pansexual Pride",
    icon: "💜",
    gradient: "from-pink-500 via-yellow-400 to-cyan-400",
    bgGlow: "rgba(6, 182, 212, 0.15)",
    accentColor: "text-cyan-400",
    borderGlow: "hover:border-cyan-400/50",
    colors: ["#ec4899", "#facc15", "#06b6d4"],
  },
  classic: {
    name: "Rainbow Classic",
    icon: "✨",
    gradient: "from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600",
    bgGlow: "rgba(34, 197, 94, 0.15)",
    accentColor: "text-emerald-400",
    borderGlow: "hover:border-emerald-400/50",
    colors: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#9333ea"],
  },
};

interface RandomFact {
  id: number;
  category: "Quirky 🤪" | "Tech 💻" | "Lifestyle ☕" | "LGBTQ+ 🌈" | "Pet & Fun 🐱";
  fact: string;
  detail: string;
  emoji: string;
}

const RANDOM_FACTS: RandomFact[] = [
  {
    id: 1,
    category: "Quirky 🤪",
    fact: "I solve code bugs faster while wearing bright mismatched rainbow socks.",
    detail: "It's a scientifically proven fact in my household. Left sock red, right sock blue = 40% speed boost.",
    emoji: "🧦",
  },
  {
    id: 2,
    category: "Tech 💻",
    fact: "My first website ever was a glittery HTML fansite built in 2012 with neon marquee tags.",
    detail: "It featured auto-playing MIDI background music and custom animated rainbow cursor trails.",
    emoji: "✨",
  },
  {
    id: 3,
    category: "LGBTQ+ 🌈",
    fact: "I organized a virtual Pride game night that hosted over 150 queer devs worldwide!",
    detail: "We played multiplayer trivia, showcased mechanical keyboard builds, and raised funds for LGBTQ+ youth.",
    emoji: "🎮",
  },
  {
    id: 4,
    category: "Lifestyle ☕",
    fact: "I consume iced matcha lattes year-round, even during sub-zero winter blizzards.",
    detail: "Oat milk + two pumps of vanilla + matcha = my absolute life fuel.",
    emoji: "🍵",
  },
  {
    id: 5,
    category: "Pet & Fun 🐱",
    fact: "My cat Pixel is my unofficial co-pilot and code auditor.",
    detail: "She frequently steps on the keyboard to insert `\\\\\\\\\\\\\\\\\\\\\\\\` into production CSS.",
    emoji: "🐾",
  },
  {
    id: 6,
    category: "Quirky 🤪",
    fact: "I have a collection of over 25 custom enamel pins attached to my favorite denim jacket.",
    detail: "My prized pin is a glowing 8-bit rainbow floppy disk that says 'Queer Code'.",
    emoji: "🎨",
  },
  {
    id: 7,
    category: "Tech 💻",
    fact: "I firmly believe that dark mode should be the default theme for all software universally.",
    detail: "Light mode burns the soul; neon colors pop 10x harder on dark obsidian backgrounds!",
    emoji: "🌙",
  },
  {
    id: 8,
    category: "LGBTQ+ 🌈",
    fact: "Did you know computer science pioneer Alan Turing is one of the most celebrated queer icons in history?",
    detail: "His foundational work birthed modern computing and artificial intelligence. Proud to stand on such shoulders!",
    emoji: "🏛️",
  },
  {
    id: 9,
    category: "Lifestyle ☕",
    fact: "I am a synthwave & 80s pop enthusiast while coding at night.",
    detail: "Give me retrowave synth solos, neon grid vibes, and slow reverbed vocals while debugging React state.",
    emoji: "🎧",
  },
  {
    id: 10,
    category: "Pet & Fun 🐱",
    fact: "I can name all 8 colors of the original 1978 Gilbert Baker Pride flag from memory.",
    detail: "Hot Pink (Sex), Red (Life), Orange (Healing), Yellow (Sunlight), Green (Nature), Turquoise (Magic/Art), Indigo (Serenity), Violet (Spirit)!",
    emoji: "🚩",
  },
  {
    id: 11,
    category: "Quirky 🤪",
    fact: "I over-use code comments with playful emojis to make code reviews enjoyable.",
    detail: "Example: `// 🧙‍♂️ Magic happens here - do not poke the dragon`",
    emoji: "💬",
  },
  {
    id: 12,
    category: "Lifestyle ☕",
    fact: "I propagate house succulents and name each one after a CSS property.",
    detail: "Say hi to Flexbox, Grid, Margin-Auto, and Z-Index!",
    emoji: "🪴",
  },
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("progress");
  const [activeTab, setActiveTab] = useState<"story" | "drives" | "vibes" | "pride">("story");
  const [randomFact, setRandomFact] = useState<RandomFact>(RANDOM_FACTS[0]);
  const [factFilter, setFactFilter] = useState<string>("All");
  const [isSparkling, setIsSparkling] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(42);
  const [loveClicked, setLoveClicked] = useState<boolean>(false);
  const [expandedFactId, setExpandedFactId] = useState<number | null>(null);

  const theme = PRIDE_THEMES[currentTheme];

  // Pick a random fact
  const handleGenerateFact = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 400);

    const availableFacts = RANDOM_FACTS.filter((f) => f.id !== randomFact.id);
    const randomIndex = Math.floor(Math.random() * availableFacts.length);
    setRandomFact(availableFacts[randomIndex]);
  };

  const handleAddLove = () => {
    setLoveCount((prev) => prev + 1);
    setLoveClicked(true);
    setTimeout(() => setLoveClicked(false), 600);
  };

  const filteredFacts =
    factFilter === "All"
      ? RANDOM_FACTS
      : RANDOM_FACTS.filter((f) => f.category.includes(factFilter));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Top Dynamic Pride Stripe Bar */}
      <div className="w-full h-2.5 bg-gradient-to-r from-rose-500 via-orange-400 via-amber-300 via-emerald-400 via-sky-400 via-indigo-400 to-purple-500 animate-pulse" />

      {/* Decorative Glow Orbs in Background */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: theme.colors[0] || "#ec4899" }}
      />
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: theme.colors[theme.colors.length - 1] || "#3b82f6" }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: theme.colors[Math.floor(theme.colors.length / 2)] || "#a855f7" }}
      />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-float">🌈</span>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
              Alex's Pride Corner
            </span>
            <span className="text-xs text-slate-400 font-mono">Queer Dev • Rainbow & Code</span>
          </div>
        </div>

        {/* Theme Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-full border border-slate-800">
          {(Object.keys(PRIDE_THEMES) as ThemeKey[]).map((key) => {
            const t = PRIDE_THEMES[key];
            const isActive = currentTheme === key;
            return (
              <button
                key={key}
                onClick={() => setCurrentTheme(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                  isActive
                    ? "bg-slate-800 text-white shadow-lg ring-1 ring-white/20 scale-105"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
                title={`Switch to ${t.name} Palette`}
              >
                <span>{t.icon}</span>
                <span className="hidden md:inline">{t.name}</span>
              </button>
            );
          })}
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-10 flex flex-col gap-12 z-10">
        {/* HERO SECTION */}
        <section className="rainbow-border rounded-3xl p-8 sm:p-12 glass-card relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Avatar / Pride Emblem */}
          <div className="relative group">
            <div
              className="absolute -inset-1.5 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.join(", ")})`,
              }}
            />
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-slate-900 p-1.5 flex items-center justify-center border-2 border-slate-700/80">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-slate-800 via-slate-900 to-slate-800 flex flex-col items-center justify-center text-center p-4 shadow-inner">
                <span className="text-5xl sm:text-6xl mb-1 animate-bounce">🦄</span>
                <span className="text-xs font-mono font-bold text-slate-300">QUEER & PROUD</span>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-900/90 border border-slate-700 text-slate-300">
              <span>{theme.icon}</span>
              <span>Theme: <strong className={theme.accentColor}>{theme.name}</strong></span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Hi, I'm <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>Alex</span> 🌈
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Full-stack developer, rainbow aesthetic lover, iced matcha enthusiast, and advocate for safe, inclusive spaces in tech. Welcome to my personal corner of the web!
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-pink-950/60 text-pink-300 border border-pink-500/30">
                🏳️‍🌈 Queer & Proud
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-500/30">
                💻 Web Architect
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-sky-950/60 text-sky-300 border border-sky-500/30">
                🎧 Synthwave & Pop
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-amber-950/60 text-amber-300 border border-amber-500/30">
                🐱 Cat Parent
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                🍵 Powered by Matcha
              </span>
            </div>
          </div>
        </section>

        {/* ABOUT ME TABBED BIO */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>📖</span> About Me & My Journey
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "story", label: "My Story", icon: "🌱" },
                { id: "drives", label: "What Drives Me", icon: "🚀" },
                { id: "vibes", label: "Interests & Vibe", icon: "🎨" },
                { id: "pride", label: "Pride & STEM", icon: "💜" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? "bg-slate-800 text-white border border-slate-700 shadow-md scale-105"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bio Tab Contents */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 transition-all duration-300">
            {activeTab === "story" && (
              <div className="flex flex-col gap-4 text-slate-300 leading-relaxed animate-sparkle">
                <h3 className="text-xl font-bold text-pink-400">Building With Heart & Authenticity</h3>
                <p>
                  I've always believed that technology is best when built by diverse voices. My coding journey started back when personal blogs were decorated with custom CSS gradients and MIDI tunes. Over the years, that curiosity grew into a career crafting fast, accessible, and delightful web applications.
                </p>
                <p>
                  Coming out as queer was one of the defining moments of my life. It gave me the courage to bring my whole self to every project I touch—advocating for inclusive design, safe tech spaces, and vibrant aesthetics.
                </p>
              </div>
            )}

            {activeTab === "drives" && (
              <div className="flex flex-col gap-4 text-slate-300 leading-relaxed animate-sparkle">
                <h3 className="text-xl font-bold text-sky-400">What Drives & Inspires Me</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-2xl">✨</span>
                    <h4 className="font-bold text-white mt-1">Inclusive UX</h4>
                    <p className="text-xs text-slate-400 mt-1">Creating web apps that are accessible, screen-reader friendly, and welcoming to everyone regardless of background.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-2xl">🌈</span>
                    <h4 className="font-bold text-white mt-1">Queer Mentorship</h4>
                    <p className="text-xs text-slate-400 mt-1">Helping early-career LGBTQ+ developers navigate tech careers and find supportive, queer-affirming environments.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-2xl">⚡</span>
                    <h4 className="font-bold text-white mt-1">Modern Web Engineering</h4>
                    <p className="text-xs text-slate-400 mt-1">Building responsive React, Next.js, and TypeScript applications with silky smooth 60fps animations.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-2xl">🎨</span>
                    <h4 className="font-bold text-white mt-1">Design & Color Theory</h4>
                    <p className="text-xs text-slate-400 mt-1">Exploring glassmorphism, dark themes, and rich color combinations that evoke joy and emotion.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vibes" && (
              <div className="flex flex-col gap-4 text-slate-300 leading-relaxed animate-sparkle">
                <h3 className="text-xl font-bold text-purple-400">My Favorites & Everyday Vibes</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
                    <span className="text-xl">🎧</span>
                    <span><strong>Music:</strong> Synthwave, Chiptune, 80s Pop, and Lady Gaga</span>
                  </li>
                  <li className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
                    <span className="text-xl">🕹️</span>
                    <span><strong>Gaming:</strong> Indie RPGs, Cozy Farmers, and Retro Platformers</span>
                  </li>
                  <li className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
                    <span className="text-xl">⌨️</span>
                    <span><strong>Hardware:</strong> Custom tactile 65% mechanical keyboards</span>
                  </li>
                  <li className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
                    <span className="text-xl">☕</span>
                    <span><strong>Fuel:</strong> Iced Oat Milk Matcha & Cold Brew Coffee</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "pride" && (
              <div className="flex flex-col gap-4 text-slate-300 leading-relaxed animate-sparkle">
                <h3 className="text-xl font-bold text-emerald-400">Pride in STEM & Community</h3>
                <p>
                  Did you know that LGBTQ+ engineers and scientists have been behind some of humanity's greatest achievements? From Alan Turing's codebreaking to Sally Ride's journeys into space, diversity fuels innovation.
                </p>
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-pink-950/40 border border-purple-800/40 text-sm">
                  <strong className="text-purple-300">My Personal Motto:</strong> "Never dim your light to fit into someone else's shadow. Code boldly, live authentically, and spread joy wherever you go!" 💖
                </div>
              </div>
            )}
          </div>
        </section>

        {/* INTERACTIVE RANDOM FACT GENERATOR */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>🎲</span> Random Fact Spotlight
              </h2>
              <p className="text-sm text-slate-400">Click the button below to draw a random fun fact about me!</p>
            </div>

            <button
              onClick={handleGenerateFact}
              className={`px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r ${theme.gradient} shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 ${
                isSparkling ? "animate-sparkle" : ""
              }`}
            >
              <span>✨</span>
              <span>Draw Random Fact</span>
              <span>🎲</span>
            </button>
          </div>

          {/* Featured Spotlight Card */}
          <div className="glass-card rounded-3xl p-8 border-2 border-slate-700/80 relative overflow-hidden shadow-2xl">
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-2xl opacity-20 pointer-events-none"
              style={{ backgroundColor: theme.colors[1] || "#f97316" }}
            />
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-4xl shrink-0 shadow-inner">
                {randomFact.emoji}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-pink-400 border border-slate-700 w-fit">
                  <span>Category:</span>
                  <span>{randomFact.category}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  "{randomFact.fact}"
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {randomFact.detail}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE VAULT OF ALL RANDOM FACTS */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>📚</span> The Random Fact Vault
              </h2>
              <p className="text-sm text-slate-400">Explore all 12 facts filtered by category. Click any card to expand details!</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              {["All", "Quirky", "Tech", "Lifestyle", "LGBTQ+", "Pet"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFactFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    factFilter === cat
                      ? "bg-slate-800 text-white shadow-sm ring-1 ring-slate-700"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Fact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFacts.map((fact) => {
              const isExpanded = expandedFactId === fact.id;
              return (
                <div
                  key={fact.id}
                  onClick={() => setExpandedFactId(isExpanded ? null : fact.id)}
                  className={`glass-card glass-card-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer flex flex-col justify-between gap-3 ${
                    theme.borderGlow
                  } ${isExpanded ? "ring-2 ring-pink-500/50 bg-slate-900/90" : ""}`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{fact.emoji}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                        {fact.category}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white leading-snug">
                      {fact.fact}
                    </p>
                  </div>

                  <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                    <span>{isExpanded ? "Hide details" : "Tap for story"}</span>
                    <span className="text-slate-500">{isExpanded ? "▲" : "▼"}</span>
                  </div>

                  {isExpanded && (
                    <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 mt-1 animate-sparkle">
                      {fact.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* PRIDE FLAGS & MEANINGS MINI-GALLERY */}
        <section className="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>🚩</span> Pride Flag & Color History
            </h2>
            <p className="text-sm text-slate-400">Did you know every color on the Pride Flag carries a meaningful symbol?</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { color: "#ef4444", name: "Red", meaning: "Life 🩸" },
              { color: "#f97316", name: "Orange", meaning: "Healing 🩹" },
              { color: "#eab308", name: "Yellow", meaning: "Sunlight ☀️" },
              { color: "#22c55e", name: "Green", meaning: "Nature 🌿" },
              { color: "#3b82f6", name: "Blue", meaning: "Serenity 🌌" },
              { color: "#9333ea", name: "Violet", meaning: "Spirit 💜" },
            ].map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center gap-1.5 hover:scale-105 transition-transform"
              >
                <div
                  className="w-full h-3 rounded-md shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-bold text-white">{item.name}</span>
                <span className="text-[11px] text-slate-400 font-mono">{item.meaning}</span>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE PRIDE LOVE REACTOR */}
        <section className="rounded-3xl bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-slate-900 border border-pink-500/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>💖</span> Send Virtual Pride Sparkles!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Click to leave some love and spread positive energy!
            </p>
          </div>

          <button
            onClick={handleAddLove}
            className={`px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 ${
              loveClicked ? "animate-bounce scale-110" : ""
            }`}
          >
            <span className="text-2xl">💖</span>
            <span>{loveCount} Love Sent!</span>
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-center flex flex-col items-center gap-3 z-10">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <span>Made with pride & love</span>
          <span className="animate-pulse">🌈</span>
          <span>• Alex's Personal Page</span>
        </div>
        <p className="text-xs text-slate-500 max-w-md font-mono">
          "Be yourself; everyone else is already taken." — Oscar Wilde
        </p>
      </footer>
    </div>
  );
}

