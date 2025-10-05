import { getDb } from "@/lib/mongodb";

export async function POST() {
  try {
    const db = await getDb();
    const samples = [
      { title: "AI and Machine Learning Trends", category: "Science & Tech", excerpt: "Exploring the latest developments in AI and their impact on society and business.", readTime: 5 },
      { title: "Quantum Computing Breakthrough", category: "Science & Tech", excerpt: "Understanding recent advances in quantum computing and potential applications.", readTime: 8 },
      { title: "Sustainable Technology Solutions", category: "Science & Tech", excerpt: "How technology addresses climate change and environmental challenges.", readTime: 6 },
      { title: "Bhagavad Gita in Corporate Leadership", category: "Scripture", excerpt: "Krishna's teachings for modern business leaders.", readTime: 10 },
      { title: "Ramcharitmanas: Lessons in Team Management", category: "Scripture", excerpt: "Characters and stories offering insights into team dynamics.", readTime: 12 },
      { title: "Daily Dharma for Work-Life Balance", category: "Scripture", excerpt: "Practical applications of scriptural principles for harmony.", readTime: 7 },
      { title: "Classical Ragas and Emotional Healing", category: "Music", excerpt: "How ragas affect emotional states and therapeutic use.", readTime: 9 },
      { title: "Music Theory Meets Modern Production", category: "Music", excerpt: "Bridging traditional theory with digital production.", readTime: 11 },
      { title: "Devotional Music and Meditation", category: "Music", excerpt: "Bhajans and kirtans in spiritual practice and psychology.", readTime: 8 },
      { title: "Consciousness and Quantum Physics", category: "Esoteric Science", excerpt: "Investigating consciousness and quantum phenomena.", readTime: 15 },
      { title: "Sacred Geometry in Nature", category: "Esoteric Science", excerpt: "Mathematical patterns and geometry in nature.", readTime: 12 },
      { title: "Energy Fields and Bioelectromagnetism", category: "Esoteric Science", excerpt: "Bioelectric fields and implications for health.", readTime: 13 },
      { title: "Current Affairs Analysis", category: "UPSC", excerpt: "Weekly analysis of important current events with UPSC perspective.", readTime: 20 },
      { title: "Ethics Case Studies", category: "UPSC", excerpt: "Real-world ethical dilemmas for Paper IV preparation.", readTime: 18 },
      { title: "Study Strategy and Time Management", category: "UPSC", excerpt: "Effective study techniques and time management strategies.", readTime: 14 }
    ];
    await db.collection("posts").insertMany(samples);
    return new Response(JSON.stringify({ inserted: samples.length }), { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Failed to seed" }), { status: 500 });
  }
}
