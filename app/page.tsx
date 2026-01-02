'use client';

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3, margin: "0px 0px -100px 0px" },
  transition: { 
    duration: 0.8, 
    ease: [0.16, 1, 0.3, 1],
    delay 
  }
});

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};


export default function LandingPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const shouldReduceMotion = useReducedMotion();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="space-y-20 md:space-y-24">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 p-8 md:p-16 lg:p-20 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >

        <div className="relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center lg:gap-14">
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-200 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              </span>
              Upload → Blindspot Report
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Drop your notes.{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Blindspot finds
              </span>{' '}
              the tricky parts.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl"
            >
              Upload PDFs, photos, links, or text. We highlight confusion pairs, hidden conditions, and
              exam twists before they catch you.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              ) : (
                <Link
                  href="/scan"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              )}
              <Link
                href="/example"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10"
              >
                See Example Report
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-2.5"
            >
              {["Confusion pairs", "Hidden conditions", "Tricky rephrasings", "Exam twists"].map((pill, idx) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-200 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10"
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-6 shadow-xl backdrop-blur-xl">
              <div className="absolute right-5 top-5 rounded-full border border-emerald-400/25 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
                Blindspot Report
              </div>
              
              <div className="mt-3 space-y-3">
                {[
                  { title: "Confusion pair", detail: "Velocity vs. acceleration (direction change)", color: "from-blue-500/15 to-cyan-500/15" },
                  { title: "Hidden condition", detail: "Log inputs must stay positive — watch x > 0", color: "from-purple-500/15 to-pink-500/15" },
                  { title: "Tricky rephrase", detail: "\"Only if\" ≠ \"if\"; don't flip the arrow", color: "from-indigo-500/15 to-blue-500/15" },
                  { title: "Exam twist", detail: "Axes swap? Redraw before answering", color: "from-cyan-500/15 to-teal-500/15" }
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + idx * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-300">{item.title}</p>
                    <p className="mt-1.5 text-sm font-medium text-white">{item.detail}</p>
                    <div className="mt-2.5 flex items-center gap-2 text-xs">
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-500/15 px-2.5 py-0.5 font-medium text-emerald-200">Quick check</span>
                      <span className="text-ink-300">MCQ or short answer</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Flow Section */}
      <motion.section {...fadeIn(0.12)}>
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400"
            >
              How it works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 text-4xl font-bold text-white md:text-5xl"
            >
              From upload to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Blindspot Report
              </span>
            </motion.h2>
          </div>
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              Get Started
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          ) : (
            <Link
              href="/scan"
              className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              Try it now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          )}
        </div>
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-8 shadow-2xl backdrop-blur-xl md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Scan anything",
              desc: "PDFs, photos of notes, links, or pasted text. Drag-and-drop friendly.",
              color: "from-blue-500 to-cyan-500",
              icon: "📄"
            },
            {
              title: "Playful analyzing",
              desc: "Progress screen with cheeky messages while we parse the tricky bits.",
              color: "from-indigo-500 to-purple-500",
              icon: "✨"
            },
            {
              title: "Blindspot Report",
              desc: "Confusion pairs, hidden conditions, rephrasings, and exam twists with quick checks.",
              color: "from-purple-500 to-pink-500",
              icon: "🎯"
            },
            {
              title: "Keep & revisit",
              desc: "Saved reports live in your Library. Mark items Got it / Not yet to boost confidence.",
              color: "from-cyan-500 to-blue-500",
              icon: "📚"
            }
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
              transition={{ 
                delay: idx * 0.08, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className={`absolute top-0 left-0 h-full w-1 bg-gradient-to-b ${item.color} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${item.color} shadow-lg`} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink-200">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        {...fadeIn(0.18)}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-10 shadow-2xl backdrop-blur-xl md:p-12"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="relative mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400"
          >
            Why students stay
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-3xl font-bold text-white md:text-4xl"
          >
            Not another{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              flashcard app
            </span>
          </motion.h3>
        </div>
        <div className="relative grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Trap-first focus",
              desc: "We surface confusing bits before they trip you—no endless decks.",
              gradient: "from-blue-500/20 to-cyan-500/20"
            },
            {
              title: "Quick checks",
              desc: "Mini MCQs or short answers inside each blindspot keep you honest.",
              gradient: "from-purple-500/20 to-pink-500/20"
            },
            {
              title: "Confidence meter",
              desc: "Mark Got it / Not yet and watch your confidence bar climb.",
              gradient: "from-indigo-500/20 to-blue-500/20"
            }
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
              transition={{ 
                delay: idx * 0.1, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative">
                <h4 className="mb-3 text-xl font-bold text-white">{item.title}</h4>
                <p className="text-sm leading-relaxed text-ink-200">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-10 shadow-2xl backdrop-blur-xl md:grid-cols-4 md:p-12"
        {...fadeIn(0.24)}
      >
        {[
          { value: "20+", label: "Common traps identified", color: "from-blue-400 to-cyan-400" },
          { value: "8", label: "Mistake categories", color: "from-purple-400 to-pink-400" },
          { value: "100%", label: "Focus on weak points", color: "from-indigo-400 to-blue-400" },
          { value: "∞", label: "Practice attempts", color: "from-cyan-400 to-teal-400" }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
            transition={{ 
              delay: idx * 0.08, 
              duration: 0.7, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-4xl font-bold text-transparent md:text-5xl`}>
              {stat.value}
            </div>
            <div className="mt-3 text-sm font-medium text-ink-300">{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* Testimonials Section */}
      <motion.section {...fadeIn(0.3)}>
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-bold text-white md:text-5xl"
          >
            What students are{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              saying
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-xl text-ink-300"
          >
            Real results from trap-first training
          </motion.p>
        </div>
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-8 shadow-2xl backdrop-blur-xl md:grid-cols-3 md:p-10">
          {[
            {
              quote: "I finally stopped making the same mistakes. Blindspot showed me exactly where I was going wrong.",
              author: "Sarah M.",
              role: "Medical Student",
              gradient: "from-blue-500/10 to-cyan-500/10"
            },
            {
              quote: "The prioritized feed saved me hours. I focused on weak areas instead of reviewing everything.",
              author: "James K.",
              role: "Engineering Student",
              gradient: "from-purple-500/10 to-pink-500/10"
            },
            {
              quote: "Exam mode helped me create a realistic study plan. I felt prepared and confident on test day.",
              author: "Emily R.",
              role: "Law Student",
              gradient: "from-indigo-500/10 to-blue-500/10"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${testimonial.gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-xl`}
            >
              <div className="mb-4 text-3xl font-bold text-blue-400/50">&quot;</div>
              <p className="mb-6 text-sm leading-relaxed text-ink-200">{testimonial.quote}</p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm font-bold text-white">{testimonial.author}</p>
                <p className="mt-1 text-xs text-ink-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section {...fadeIn(0.36)}>
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-bold text-white md:text-5xl"
          >
            Frequently asked{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              questions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-xl text-ink-300"
          >
            Everything you need to know
          </motion.p>
        </div>
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-8 shadow-2xl backdrop-blur-xl md:grid-cols-2 md:p-10">
          {[
            {
              question: "How does Blindspot work?",
              answer: "Upload your study materials (PDFs, photos, links, or text) and Blindspot analyzes them to identify confusion pairs, hidden conditions, tricky rephrasings, and exam twists that commonly trip students up.",
              gradient: "from-blue-500/10 to-cyan-500/10"
            },
            {
              question: "Do I need to upload my study materials?",
              answer: "Yes, that's how Blindspot works! Upload PDFs, photos of notes, links, or paste text. We analyze the content to find the tricky parts specific to your material.",
              gradient: "from-purple-500/10 to-pink-500/10"
            },
            {
              question: "Can I track my progress?",
              answer: "Yes! Mark items as 'Got it' or 'Not yet' in your Library. Watch your confidence meter climb as you master each blindspot.",
              gradient: "from-indigo-500/10 to-blue-500/10"
            },
            {
              question: "What makes this different from flashcards?",
              answer: "Blindspot shows you the trap first—the confusing part you're likely to miss—then teaches you why it's tricky and how to avoid it. It's trap-first, not answer-first.",
              gradient: "from-cyan-500/10 to-teal-500/10"
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${faq.gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-xl`}
            >
              <h3 className="mb-3 text-lg font-bold text-white">{faq.question}</h3>
              <p className="text-sm leading-relaxed text-ink-200">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section {...fadeIn(0.42)}>
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold text-white md:text-4xl"
          >
            Simple pricing for{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              students
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-base text-ink-400"
          >
            Choose the plan that fits your study needs
          </motion.p>
          
          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-ink-400'}`}>
              Pay monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
                isYearly ? 'bg-blue-500' : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform duration-300 ${
                  isYearly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-ink-400'}`}>
              Pay yearly
            </span>
            {isYearly && (
              <span className="ml-2 rounded-full bg-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-300">
                Save up to 20%
              </span>
            )}
          </motion.div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
          >
            <div className="mb-4">
              <h3 className="mb-1 text-2xl font-bold text-white">Free</h3>
              <p className="mb-2 text-sm text-ink-400">Try out Blindspot</p>
              <div className="mb-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-sm text-ink-400">/ {isYearly ? 'Year' : 'Month'}</span>
              </div>
              
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="mb-4 block w-full rounded-2xl border-2 border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
                >
                  Get started →
                </Link>
              ) : (
                <Link
                  href="/scan"
                  className="mb-4 block w-full rounded-2xl border-2 border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
                >
                  Get started →
                </Link>
              )}
            </div>
            
            <div className="mb-4 flex-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Featured Include:</p>
              <div className="space-y-2.5">
                {["Up to 5 Blindspot Reports", "Basic mistake detection", "Library access", "Progress tracking"].map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-ink-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs leading-relaxed text-ink-400">
                Track your mistakes automatically, get AI to identify blindspots, set reminders and study efficiently.
              </p>
            </div>
            
            <Link href="#" className="text-center text-xs text-ink-500 hover:text-ink-400">
              See compare →
            </Link>
          </motion.div>

          {/* Student Plan - Most Popular */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group relative z-10 flex flex-col overflow-hidden rounded-3xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-900/60 via-indigo-900/60 to-purple-900/60 p-4 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/60"
          >
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Student</h3>
                <span className="inline-flex items-center rounded-full bg-blue-500/30 border border-blue-400/30 px-2.5 py-1 text-xs font-semibold text-blue-200">
                  Popular
                </span>
              </div>
              <p className="mb-2 text-sm text-ink-300">Manage your blindspots</p>
              {isYearly && (
                <span className="mb-2 inline-block rounded-full bg-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-300">
                  Save up to 20%
                </span>
              )}
              <div className="mb-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-white">${isYearly ? 72 : 9}</span>
                <span className="text-sm text-ink-300">/ {isYearly ? 'Year' : 'Month'}</span>
              </div>
              
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="mb-4 block w-full rounded-2xl border-2 border-white/30 bg-white/10 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:bg-white/20"
                >
                  Get started →
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="mb-4 block w-full rounded-2xl border-2 border-white/30 bg-white/10 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:bg-white/20"
                >
                  Get started →
                </Link>
              )}
            </div>
            
            <div className="mb-4 flex-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-400">Everything in Free, plus:</p>
              <div className="space-y-2.5">
                {["Unlimited Blindspot Reports", "Advanced mistake detection", "Priority processing", "Export reports (PDF)", "Email support"].map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-ink-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs leading-relaxed text-ink-300">
                Access detailed reports, set study goals, track progress, export your data, and get priority support.
              </p>
            </div>
            
            <Link href="#" className="text-center text-xs text-ink-400 hover:text-ink-300">
              See compare →
            </Link>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
          >
            <div className="mb-4">
              <h3 className="mb-1 text-2xl font-bold text-white">Pro</h3>
              <p className="mb-2 text-sm text-ink-400">Advanced exam prep</p>
              {isYearly && (
                <span className="mb-2 inline-block rounded-full bg-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-300">
                  Save up to 20%
                </span>
              )}
              <div className="mb-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-white">${isYearly ? 152 : 19}</span>
                <span className="text-sm text-ink-400">/ {isYearly ? 'Year' : 'Month'}</span>
              </div>
              
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="mb-4 block w-full rounded-2xl border-2 border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
                >
                  Get started →
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="mb-4 block w-full rounded-2xl border-2 border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
                >
                  Get started →
                </Link>
              )}
            </div>
            
            <div className="mb-4 flex-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Everything in Student, plus:</p>
              <div className="space-y-2.5">
                {["AI-powered insights", "Custom study plans", "Team collaboration", "Priority support", "Advanced analytics"].map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-ink-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs leading-relaxed text-ink-400">
                Get AI-powered insights, create custom study plans, collaborate with teams, and access advanced analytics.
              </p>
            </div>
            
            <Link href="#" className="text-center text-xs text-ink-500 hover:text-ink-400">
              See compare →
            </Link>
          </motion.div>
          
          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -80px 0px" }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
          >
            <div className="mb-4">
              <h3 className="mb-1 text-2xl font-bold text-white">Enterprise</h3>
              <p className="mb-2 text-sm text-ink-400">Custom solutions</p>
              <div className="mb-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              
              <Link
                href="/login"
                className="mb-4 block w-full rounded-2xl border-2 border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
              >
                Get started →
              </Link>
            </div>
            
            <div className="mb-4 flex-1">
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-ink-300">Everything in Pro</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-ink-300">Dedicated support</span>
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs leading-relaxed text-ink-400">
                Enjoy customized support with a dedicated success partner tailored to your organization's needs.
              </p>
            </div>
            
            <Link href="#" className="text-center text-xs text-ink-500 hover:text-ink-400">
              See compare →
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-ink-500">
            All plans include a <span className="text-ink-400">7-day free trial</span>. Cancel anytime. Student discount available with valid .edu email.
          </p>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <motion.section
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/30 via-indigo-600/30 to-purple-600/30 p-12 text-center shadow-2xl backdrop-blur-xl md:p-16"
          {...fadeIn(0.48)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-blue-500/40 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-indigo-500/40 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              Ready to eliminate your{' '}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                blindspots?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-xl text-ink-200"
            >
              Start training with trap-first cards today. Login required to access your personalized dashboard.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <Link
                href="/login"
                className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-12 py-5 text-lg font-bold text-white shadow-2xl shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-3xl hover:shadow-blue-500/40"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <motion.footer
        className="mt-24 border-t border-white/10 pt-16 pb-12"
        {...fadeIn(0.48)}
      >
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white">
              Blindspot
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300">
              Trap-first exam training that helps you identify and master the mistakes you don&apos;t see coming.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-200">Product</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/example" className="text-sm text-ink-300 transition-colors hover:text-white">
                  Example Report
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-sm text-ink-300 transition-colors hover:text-white">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/scan" className="text-sm text-ink-300 transition-colors hover:text-white">
                  How it works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-200">Company</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/" className="text-sm text-ink-300 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-ink-300 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-ink-300 transition-colors hover:text-white">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-ink-400">
          <p>&copy; {new Date().getFullYear()} Blindspot. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
