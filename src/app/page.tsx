"use client";

import { useState } from "react";
import Link from "next/link";

const FEATURES = [
  {
    icon: "🔬",
    title: "AI Correlation Engine",
    description:
      "Our algorithm analyzes your food-symptom data to find hidden patterns that even gastroenterologists miss. Average time to first actionable insight: 7 days.",
  },
  {
    icon: "🍽️",
    title: "Smart Meal Plans",
    description:
      "Personalized elimination diets generated from YOUR data. No generic FODMAP lists - these plans are built around your unique trigger profile.",
  },
  {
    icon: "📊",
    title: "Gut Health Score",
    description:
      "A composite score tracking diet diversity, inflammation load, symptom trends, and regularity. Watch your gut health improve in real-time.",
  },
  {
    icon: "🧪",
    title: "Lab Integration",
    description:
      "Connect microbiome test results from providers like Viome, Ombre, and Thryve. Overlay your microbial data with symptom patterns.",
  },
  {
    icon: "🤖",
    title: "AI Health Assistant",
    description:
      "Ask questions about your data in natural language. 'What should I eat today?' 'Why did I feel bad last Tuesday?' - instant, data-backed answers.",
  },
  {
    icon: "👨‍⚕️",
    title: "Provider Reports",
    description:
      "Generate gastroenterologist-ready reports with your food-symptom correlations, eliminating months of manual food diaries.",
  },
];

const STATS = [
  { value: "70M+", label: "Americans with digestive issues" },
  { value: "6 years", label: "Average time to diagnosis" },
  { value: "83%", label: "Report food triggers they can't identify" },
  { value: "$136B", label: "Annual GI healthcare costs in the US" },
];

const TESTIMONIALS = [
  {
    quote:
      "After 3 years of IBS hell, GutGuidance found that garlic and onions were my main triggers in just 10 days. My gastro confirmed it was likely fructan intolerance. Life-changing.",
    name: "Sarah M.",
    condition: "IBS-D",
    improvement: "78% symptom reduction",
  },
  {
    quote:
      "The meal plans are incredible. I went from dreading every meal to actually enjoying food again. The AI figured out my pattern: dairy + stress = flare-up within 6 hours.",
    name: "James K.",
    condition: "IBD / Crohn's",
    improvement: "65% fewer flare days",
  },
  {
    quote:
      "I shared my GutGuidance report with my doctor and she said it was better than any food diary she'd ever seen. We identified SIBO based on the patterns it found.",
    name: "Dr. Priya L.",
    condition: "SIBO patient & physician",
    improvement: "Faster diagnosis",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-[#1b4332]">
              GutGuidance
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-[#2d6a4f] transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-[#2d6a4f] transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#2d6a4f] transition-colors">Pricing</a>
            <Link
              href="/dashboard"
              className="bg-[#2d6a4f] text-white px-5 py-2 rounded-lg hover:bg-[#1b4332] transition-colors font-medium"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm mb-6">
              <span className="w-2 h-2 bg-[#e9c46a] rounded-full animate-pulse"></span>
              Y Combinator W26 Applicant
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Your gut is talking.
              <br />
              <span className="text-[#e9c46a]">We translate.</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              GutGuidance uses AI to find hidden food-symptom correlations from
              your daily logs. Get personalized elimination diets that actually
              work - backed by your own data, not generic advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="bg-[#e9c46a] text-[#1b4332] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#d4a843] transition-colors text-center"
              >
                Try the Live Demo
              </Link>
              <a
                href="#how-it-works"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-[#2d6a4f]">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1b4332] mb-6">
              The $136B Problem Nobody&apos;s Solving Right
            </h2>
            <p className="text-lg text-gray-600">
              70 million Americans suffer from digestive diseases. The average
              IBS patient sees <strong>3-4 specialists</strong> over{" "}
              <strong>6 years</strong> before getting answers. Paper food
              diaries fail. Generic elimination diets ignore individual
              biochemistry. Patients are desperate for personalized, data-driven
              solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <div className="text-3xl mb-4">😤</div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                The Status Quo
              </h3>
              <p className="text-red-700">
                Paper food diaries are tedious, imprecise, and doctors spend 30
                seconds reviewing them. Patients track for weeks but get no
                actionable insights.
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
              <div className="text-3xl mb-4">🤷</div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Generic Diets Fail
              </h3>
              <p className="text-amber-700">
                Low-FODMAP eliminates 70+ foods when most patients react to only
                3-5. Overly restrictive diets cause nutritional deficiencies and
                eating anxiety.
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                GutGuidance Solution
              </h3>
              <p className="text-green-700">
                AI finds YOUR specific triggers in days, not years. Personalized
                elimination targets only problem foods while keeping your diet
                diverse and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1b4332] mb-4">
              Your Personal Gut Intelligence Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to decode your digestive health, powered by AI
              and backed by gastroenterology research.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#1b4332] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1b4332] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              From confused to confident in three simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Log Your Meals & Symptoms",
                description:
                  "Quick, guided logging takes under 60 seconds per entry. Our food database auto-categorizes ingredients by FODMAP rating and inflammatory score.",
              },
              {
                step: "02",
                title: "AI Finds Your Patterns",
                description:
                  "Our correlation engine analyzes timing, combinations, and severity to identify your unique trigger foods with statistical confidence scores.",
              },
              {
                step: "03",
                title: "Follow Your Personal Protocol",
                description:
                  "Receive a custom elimination diet, meal plans, and shopping lists built around YOUR triggers. Track improvements as you heal.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-[#1b4332] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b4332] mb-12 text-center">
            What Our Beta Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <p className="text-gray-700 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#1b4332]">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.condition}</div>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {t.improvement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1b4332] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Start free. Upgrade when you see results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: [
                  "Basic symptom & meal logging",
                  "7-day correlation analysis",
                  "Gut Health Score",
                  "Community access",
                ],
                cta: "Start Free",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$14.99",
                period: "/month",
                features: [
                  "Everything in Free",
                  "Unlimited correlation history",
                  "AI meal plan generation",
                  "Provider-ready reports",
                  "Lab result integration",
                  "Priority AI assistant",
                ],
                cta: "Start 14-Day Trial",
                highlight: true,
              },
              {
                name: "Clinical",
                price: "$49",
                period: "/patient/mo",
                features: [
                  "Everything in Pro",
                  "Multi-patient dashboard",
                  "HIPAA-compliant data",
                  "EHR integration (Epic, Cerner)",
                  "Custom protocols",
                  "Dedicated support",
                ],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 ${plan.highlight ? "bg-[#2d6a4f] text-white ring-4 ring-[#2d6a4f]/20 scale-105" : "bg-white border border-gray-200"}`}
              >
                <div className="text-lg font-semibold mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlight ? "text-white/70" : "text-gray-500"}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className={plan.highlight ? "text-[#e9c46a]" : "text-[#2d6a4f]"}>
                        &#10003;
                      </span>
                      <span className={plan.highlight ? "text-white/90" : "text-gray-600"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${plan.highlight ? "bg-[#e9c46a] text-[#1b4332] hover:bg-[#d4a843]" : "bg-[#2d6a4f] text-white hover:bg-[#1b4332]"}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Waitlist */}
      <section className="py-20 px-6 gradient-hero">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Decode Your Gut?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join 12,000+ people on the waitlist. Early access launching March
            2026.
          </p>
          {submitted ? (
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-xl text-white font-semibold">
                You&apos;re on the list!
              </p>
              <p className="text-white/70 mt-2">
                We&apos;ll email you when early access opens. In the meantime,
                try the demo.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleWaitlist}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e9c46a]"
              />
              <button
                type="submit"
                className="bg-[#e9c46a] text-[#1b4332] px-8 py-4 rounded-xl font-semibold hover:bg-[#d4a843] transition-colors whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1b4332] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-lg font-bold text-white">
                  GutGuidance
                </span>
              </div>
              <p className="text-white/60 text-sm">
                AI-powered gut health optimization. Personalized protocols
                backed by your data.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>HIPAA Compliance</li>
                <li>Data Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
            &copy; 2026 GutGuidance, Inc. All rights reserved. Not a substitute
            for medical advice.
          </div>
        </div>
      </footer>
    </div>
  );
}
