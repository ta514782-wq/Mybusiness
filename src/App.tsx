import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { 
  LayoutDashboard, 
  Database, 
  Zap, 
  MessageSquare, 
  Code, 
  ArrowRight, 
  ChevronRight,
  Upload,
  BarChart3,
  BrainCircuit,
  ShieldCheck,
  Globe,
  Mail,
  Linkedin,
  Github,
  Menu,
  X,
  Search,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';
import { cn } from './lib/utils';
import { getBIInsights } from './services/gemini';
import ReactMarkdown from 'react-markdown';

// --- Mock Data ---
const SALES_DATA = [
  { month: 'Jan', revenue: 45000, users: 1200, growth: 5 },
  { month: 'Feb', revenue: 52000, users: 1450, growth: 15 },
  { month: 'Mar', revenue: 48000, users: 1300, growth: -8 },
  { month: 'Apr', revenue: 61000, users: 1800, growth: 27 },
  { month: 'May', revenue: 55000, users: 1650, growth: -10 },
  { month: 'Jun', revenue: 67000, users: 2100, growth: 22 },
];

const CATEGORY_DATA = [
  { name: 'AI Consulting', value: 400 },
  { name: 'BI Dashboards', value: 300 },
  { name: 'Automation', value: 200 },
  { name: 'Custom Dev', value: 100 },
];

const COLORS = ['#00FF00', '#00CC00', '#009900', '#006600'];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center neon-glow">
              <BrainCircuit className="text-brand-dark" size={24} />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">
              INTELLIFORGE<span className="text-brand-primary">AI</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Solutions', 'MVP Demo', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
            <button className="bg-brand-primary text-brand-dark px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-all neon-glow">
              GET STARTED
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-surface border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {['Services', 'Solutions', 'MVP Demo', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-lg font-medium text-white/70"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden scanline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={14} /> Next-Gen Intelligence
            </div>
            <h1 className="text-6xl lg:text-8xl font-display font-bold leading-[0.9] mb-8">
              BUILDING <span className="text-brand-primary italic">INTELLIGENT</span> SYSTEMS.
            </h1>
            <p className="text-xl text-white/60 max-w-lg mb-10 leading-relaxed">
              IntelliForge AI empowers organizations with AI-driven intelligence, BI-based decision systems, and automation tools that transform data into actionable insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-brand-primary text-brand-dark px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform neon-glow flex items-center gap-2">
                BOOK A FREE CONSULTATION <ArrowRight size={20} />
              </button>
              <button className="border border-white/20 hover:bg-white/5 px-8 py-4 rounded-full font-bold transition-all">
                VIEW OUR WORK
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square glass rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent opacity-30" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">System Status</p>
                    <p className="text-brand-primary font-mono text-sm">OPTIMIZED // 99.9%</p>
                  </div>
                  <Activity className="text-brand-primary animate-pulse" />
                </div>
                
                <div className="space-y-6">
                  <div className="h-32 w-full flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                        className="flex-1 bg-brand-primary/40 rounded-t-sm border-t border-brand-primary"
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[10px] uppercase text-white/40 mb-1">Data Processed</p>
                      <p className="text-2xl font-display font-bold">1.2TB</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-[10px] uppercase text-white/40 mb-1">AI Accuracy</p>
                      <p className="text-2xl font-display font-bold text-brand-primary">98.4%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-4 glass rounded-2xl shadow-2xl"
            >
              <Database className="text-brand-primary" size={32} />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 p-4 glass rounded-2xl shadow-2xl"
            >
              <Zap className="text-brand-primary" size={32} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <BrainCircuit size={32} />,
      title: "AI Agent Services",
      desc: "Autonomous agents that automate customer support, generate reports, and provide predictive recommendations.",
      tags: ["LLMs", "NLP", "Agents"]
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Business Intelligence",
      desc: "Interactive dashboards and automated reporting that transform complex data into clear business insights.",
      tags: ["Power BI", "Tableau", "Python"]
    },
    {
      icon: <Zap size={32} />,
      title: "Workflow Automation",
      desc: "Streamline sales pipelines, marketing campaigns, and financial reporting with intelligent automation.",
      tags: ["Zapier", "Python", "Workflows"]
    },
    {
      icon: <Code size={32} />,
      title: "Software Development",
      desc: "Custom AI-powered web applications and SaaS platforms built for scalability and performance.",
      tags: ["React", "Node.js", "API"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Our Expertise</h2>
          <h3 className="text-4xl lg:text-5xl font-display font-bold">CORE SOLUTIONS</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 glass rounded-3xl border-white/5 hover:border-brand-primary/30 transition-all group"
            >
              <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h4 className="text-xl font-bold mb-4">{s.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10 text-white/40">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MVPDemo = () => {
  const [query, setQuery] = useState('');
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query) return;
    setLoading(true);
    const result = await getBIInsights(SALES_DATA, query);
    setInsight(result);
    setLoading(false);
  };

  return (
    <section id="mvp-demo" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">MVP Showcase</h2>
              <h3 className="text-4xl font-display font-bold mb-6">AI BUSINESS INTELLIGENCE ASSISTANT</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Experience our core MVP. This tool connects to your business data, generates real-time dashboards, and answers complex questions using advanced AI.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                      <TrendingUp className="text-brand-primary" size={18} />
                    </div>
                    <span className="font-bold">Predictive Insights</span>
                  </div>
                  <p className="text-xs text-white/40">AI-driven forecasting based on historical trends.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                      <Search className="text-brand-primary" size={18} />
                    </div>
                    <span className="font-bold">Natural Language Query</span>
                  </div>
                  <p className="text-xs text-white/40">Ask questions about your data in plain English.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Dashboard Mockup */}
            <div className="glass rounded-3xl p-8 border-white/10">
              <div className="flex justify-between items-center mb-8">
                <h4 className="font-display font-bold text-xl uppercase tracking-wider">Revenue Analysis</h4>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded-full border border-brand-primary/20">LIVE DATA</div>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SALES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `$${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '12px' }}
                      itemStyle={{ color: '#00FF00' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#00FF00" 
                      strokeWidth={3} 
                      dot={{ fill: '#00FF00', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] uppercase text-white/40 mb-1">Avg Revenue</p>
                  <p className="text-xl font-bold">$55.3k</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] uppercase text-white/40 mb-1">User Growth</p>
                  <p className="text-xl font-bold text-brand-primary">+12.4%</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] uppercase text-white/40 mb-1">Retention</p>
                  <p className="text-xl font-bold">88%</p>
                </div>
              </div>
            </div>

            {/* AI Interaction */}
            <div className="glass rounded-3xl p-8 border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="text-brand-primary" />
                <h4 className="font-display font-bold text-xl uppercase tracking-wider">Ask IntelliForge AI</h4>
              </div>
              
              <div className="flex gap-4 mb-6">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., What caused the dip in March revenue?"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors"
                />
                <button 
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="bg-brand-primary text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-white transition-all disabled:opacity-50"
                >
                  {loading ? 'ANALYZING...' : 'ANALYZE'}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {insight ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl"
                  >
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{insight}</ReactMarkdown>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
                    <MessageSquare className="mx-auto text-white/10 mb-4" size={48} />
                    <p className="text-white/30 text-sm italic">Enter a query above to generate AI insights from the dashboard data.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass rounded-[3rem] p-12 lg:p-20 border-white/10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.3em] mb-4">Get in Touch</h2>
              <h3 className="text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">READY TO <span className="text-brand-primary">FORGE</span> YOUR FUTURE?</h3>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                Whether you're a startup or an enterprise, we're here to help you navigate the AI revolution. Let's build something intelligent together.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Mail className="text-brand-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-white/40">Email Us</p>
                    <p className="font-bold">hello@intelliforgeai.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Globe className="text-brand-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-white/40">Location</p>
                    <p className="font-bold">Islamabad, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors" placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Service Interest</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors appearance-none">
                  <option className="bg-brand-dark">AI Consulting</option>
                  <option className="bg-brand-dark">BI Dashboards</option>
                  <option className="bg-brand-dark">Workflow Automation</option>
                  <option className="bg-brand-dark">Custom Development</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors" placeholder="Tell us about your project..."></textarea>
              </div>
              <button className="w-full bg-brand-primary text-brand-dark py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all neon-glow">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center">
              <BrainCircuit className="text-brand-dark" size={18} />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter">
              INTELLIFORGE<span className="text-brand-primary">AI</span>
            </span>
          </div>
          
          <p className="text-white/40 text-sm">
            © 2026 IntelliForge AI. All rights reserved. Registered with SECP.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Github size={20} /></a>
            <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-brand-dark">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <MVPDemo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
