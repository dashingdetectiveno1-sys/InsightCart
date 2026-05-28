import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Users, ArrowRight, Store, ChevronRight } from 'lucide-react';

interface Props {
  onEnterApp: () => void;
  language?: string;
}

const translations: Record<string, any> = {
  en: { heroTag: 'Built for Local Shops & Buyers', heroTitle: <>Connect your shop <br className="hidden md:block"/> with your neighborhood.</>, heroP: 'InsightCart makes it easy to manage your store items, give daily discounts, and let nearby buyers find fresh groceries quickly. No hard tech—just scan, update, and sell.', heroBtn: 'Start Shop Now' },
  hi: { heroTag: 'स्थानीय दुकानों और खरीदारों के लिए', heroTitle: <>पड़ोसियों से <br className="hidden md:block"/> अपनी दुकान को जोड़ें।</>, heroP: 'इनसाइटकार्ट स्टॉक प्रबंधित करना आसान बनाता है और स्थानीय ग्राहकों को खोजने में मदद करता है। कोई जटिल तकनीक नहीं - बस स्कैन करें और बेचें।', heroBtn: 'दुकान शुरू करें' },
  mr: { heroTag: 'स्थानिक दुकाने आणि खरेदीदारांसाठी', heroTitle: <>तुमचे दुकान <br className="hidden md:block"/> शेजाऱ्यांशी जोडा.</>, heroP: 'इनसाइटकार्ट स्टॉक व्यवस्थापित करणे आणि स्थानिक ग्राहकांना शोधण्यात मदत करते. कोणतेही कठीण तंत्रज्ञान नाही.', heroBtn: 'आता प्रारंभ करा' },
  gu: { heroTag: 'સ્થાનિક દુકાનો અને ખરીદદારો માટે', heroTitle: <>તમારી દુકાનને <br className="hidden md:block"/> પડોશ સાથે જોડો.</>, heroP: 'સ્ટોકનું સંચાલન કરવું અને ગ્રાહકોને શોધવું સરળ બને છે.', heroBtn: 'હવે શરૂ કરો' }
};

export default function LandingPage({ onEnterApp, language = 'en' }: Props) {
  const t = translations[language] || translations['en'];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const imageScaleVariants = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl flex items-center justify-center text-white font-extrabold relative shadow-lg">
              <span className="text-lg font-display drop-shadow-md">ic</span>
            </div>
            <span className="font-display font-black tracking-tight text-xl text-slate-800">InsightCart</span>
          </div>
          <button 
            onClick={onEnterApp}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-slate-800 hover:scale-105 transition-all"
          >
            Open App <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.nav>

      <main className="pt-28 pb-16">
        <motion.div 
          className="max-w-7xl mx-auto px-4 md:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Hero Section */}
          <section className="py-16 md:py-24 text-center max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold shadow-sm">
              {t.heroTag}
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-black tracking-tight text-slate-900 leading-tight mb-8">
              {t.heroTitle}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.heroP}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onEnterApp}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg shadow-[0_8px_30px_rgb(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 group hover:scale-105"
              >
                {t.heroBtn} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </section>

          {/* Image Banner */}
          <motion.section variants={imageScaleVariants} className="mb-24 md:mb-32 relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-900 via-emerald-900 to-slate-900 h-[450px] md:h-[600px] flex items-center justify-center">
            
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000" 
              alt="Fresh Local Groceries" 
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[20s]"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-8 md:p-14">
              <div className="max-w-2xl">
                <span className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-3 block">Simple & Smart</span>
                <h2 className="text-3xl md:text-5xl font-display text-white font-bold leading-tight">
                  Help small shops grow with easy digital tools.
                </h2>
              </div>
            </div>
          </motion.section>

          {/* Features */}
          <section className="mb-24 md:mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900">What makes it special?</h2>
              <p className="text-slate-600 mt-4 text-lg">Simple features to help you run your store smoothly.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-150 transition-all hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Fast Updates</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Use your phone camera to scan barcodes and update your item prices or stock amounts in just seconds.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-150 transition-all hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Find Buyers</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  People in your area can see what you have in stock right now. Easily share your daily deals to attract them!
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-150 transition-all hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Safe & Easy Checkout</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  A simple cart to add items, total the price, and accept digital payments quickly without the need for loose cash.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Terms & Conditions preview / Goal */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 bg-slate-900 text-white rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-10">Our Goal & Promise</h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed relative z-10 mb-8">
              We want to empower local grocery stores to stay relevant and competitive. We promise simple tools, no hidden fees, and absolute respect for your local business. By using InsightCart, you agree to connect honestly with your community.
            </p>
            <button 
              onClick={onEnterApp}
              className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 hover:scale-105 transition-all shadow-lg relative z-10"
            >
              Start Free Trial
            </button>
          </motion.section>
        </motion.div>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 text-center text-sm border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-white font-bold">ic</div>
            <span className="font-display font-medium text-white text-lg">InsightCart</span>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed mb-6">
            Bringing local stores and families closer through simple digital lists.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-slate-500 font-medium">
            <span>&copy; 2026 InsightCart</span>
            <span>•</span>
            <button className="hover:text-emerald-400 transition-colors">Privacy Rules</button>
            <span>•</span>
            <button className="hover:text-emerald-400 transition-colors">Terms of Use</button>
            <span>•</span>
            <button className="hover:text-emerald-400 transition-colors">Contact Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
