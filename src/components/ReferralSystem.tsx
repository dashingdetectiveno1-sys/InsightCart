import React, { useState, useEffect } from 'react';
import { Share2, Users, Gift, RefreshCcw, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ReferralSystem() {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [token, setToken] = useState('REF-8A9X-21M');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Regenerate token to prevent screenshot sharing
          setToken(`REF-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Gift className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">
              InsightCart Family Network
            </span>
            <h2 className="text-2xl font-display font-black tracking-tight mt-1">
              Refer a Family <br />
              <span className="text-amber-300">Earn ₹50 Flat Cashback</span>
            </h2>
            <p className="mt-2 text-xs text-emerald-50 max-w-[250px] leading-relaxed">
              Grocery margins are tight. But a loyal household is priceless. Keep markets local and get rewarded directly to your family ledger.
            </p>
          </div>
        </div>
      </div>

      {/* Mechanics / Plan Explainer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
            <Share2 className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-800">1. Share Code</h4>
          <p className="text-[10px] text-slate-500 mt-1">
            Let another family scan your time-locked code below.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-800">2. They Purchase</h4>
          <p className="text-[10px] text-slate-500 mt-1">
            Referred family completes a shop of ₹500 or more.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
            <Gift className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-amber-800">3. Both Earn ₹50</h4>
          <p className="text-[10px] text-amber-700/70 mt-1">
            Fixed reward maintains Kirana margins while bringing in new bulk buyers.
          </p>
        </div>
      </div>

      {/* Dynamic Time-locked QR Code */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center">
        <div className="text-center space-y-1 mb-4">
          <h3 className="text-sm font-bold text-slate-800">Your Shareable Code</h3>
          <p className="text-[10px] text-slate-500">
            Valid for local scans. Screenshotting is disabled.
          </p>
        </div>

        {/* Pseudo QR Code Box */}
        <div className="relative w-48 h-48 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center p-4">
          <div className="w-full h-full bg-slate-200 grid grid-cols-4 grid-rows-4 gap-1 rounded-lg overflow-hidden opacity-50 blur-[1px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`bg-slate-800 ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
            ))}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 text-center">
              <span className="block text-[10px] font-bold uppercase text-slate-400">Micro-Token</span>
              <span className="block font-mono text-lg font-black text-slate-800 tracking-tight">{token}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <RefreshCcw className={`w-3.5 h-3.5 text-slate-400 ${timeRemaining < 10 ? 'animate-spin' : ''}`} />
          <span className="text-[10px] font-mono text-slate-500 font-medium">
            Regenerating in <strong className={timeRemaining < 10 ? 'text-rose-500' : 'text-slate-700'}>{timeRemaining}s</strong>
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg font-semibold w-full justify-center">
          <ShieldCheck className="w-3.5 h-3.5" />
          Proximity limits active. Only families within 5km can link.
        </div>
      </div>
    </div>
  );
}
