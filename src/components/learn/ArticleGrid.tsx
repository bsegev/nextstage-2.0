"use client";

import { motion } from 'framer-motion';

const featuredArticles = [
  {
    title: "Why I Unsubscribed from Every Newsletter—and Ended Up a Better Email Marketer",
    excerpt: "A personal experiment that reveals counterintuitive strategies.",
    category: "Marketing",
    readTime: "7 min",
    image: "/images/articles/unsubscribe.png"
  },
  {
    title: "The Month I Let AI Run My Schedule: Lessons in Trust, Delegation, and Sanity",
    excerpt: "A peek into balancing convenience with caution when using automation.",
    category: "Productivity",
    readTime: "8 min",
    image: "/images/articles/ai-schedule.png"
  },
  {
    title: "How My Worst Logo Redesign Taught Me the Value of Brand Authenticity",
    excerpt: "Emphasizes learning from mistakes to refine brand strategy.",
    category: "Design",
    readTime: "6 min",
    image: "/images/articles/logo-redesign.jpg"
  }
];

export function ArticleGrid() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 justify-center">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
              <span className="font-mono text-sm text-ethereal-dark/60 tracking-wider uppercase">
                Featured Articles
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-px bg-ethereal-dark/20" 
              />
            </div>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-serif mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Latest Insights
          </motion.h2>
          <motion.p 
            className="text-lg text-secondary-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore featured articles on design, strategy, and digital innovation
          </motion.p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <motion.article 
              key={article.title}
              className="group bg-white rounded-xl shadow-sm border border-ethereal-glass-border overflow-hidden hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-secondary-500">{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-secondary-200" />
                  <span className="text-xs font-mono text-secondary-500">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-serif mb-3 group-hover:text-primary-600 transition-colors">{article.title}</h3>
                <p className="text-secondary-600">{article.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
} 