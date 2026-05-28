/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProfileStep } from '../types';
import { Award, CheckCircle2, Circle, ArrowRight, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';

interface OnboardingProgressBarProps {
  steps: ProfileStep[];
  onToggleStep: (id: string) => void;
  language?: string;
}

const trans: Record<string, Record<string, string>> = {
  en: {
    onboarding: "Onboarding",
    activated: "Activated",
    ready: "Ready",
    setupTitle: "Kirana Digital Setup",
    setupDesc: "Complete these 5 critical digital keys to unlock government wholesale scheme interest benefits.",
    tracker: "Milestone Tracker",
    completed: "Completed"
  },
  hi: {
    onboarding: "ऑनबोर्डिंग",
    activated: "सक्रिय",
    ready: "तैयार",
    setupTitle: "किराना डिजिटल सेटअप",
    setupDesc: "सरकारी थोक योजना लाभों को अनलॉक करने के लिए इन 5 डिजिटल कुंजियों को पूरा करें।",
    tracker: "माइलस्टोन ट्रैकर",
    completed: "पूरा हुआ"
  },
  mr: {
    onboarding: "ऑनबोर्डिंग",
    activated: "सक्रिय",
    ready: "तयार",
    setupTitle: "किराणा डिजिटल सेटअप",
    setupDesc: "सरकारी होलसेल योजनेचे फायदे अनलॉक करण्यासाठी या ५ डिजिटल चाव्या पूर्ण करा.",
    tracker: "माइलस्टोन ट्रॅकर",
    completed: "पूर्ण झाले"
  },
  gu: {
    onboarding: "ઓનબોર્ડિંગ",
    activated: "સક્રિય",
    ready: "તૈયાર",
    setupTitle: "કિરાના ડિજિટલ સેટઅપ",
    setupDesc: "સરકારી જથ્થાબંધ યોજનાના લાભો અનલૉક કરવા માટે આ 5 ડિજિટલ કીઝ પૂર્ણ કરો.",
    tracker: "માઇલસ્ટોન ટ્રેકર",
    completed: "પૂર્ણ થયું"
  }
};

export default function OnboardingProgressBar({ steps, onToggleStep, language = 'en' }: OnboardingProgressBarProps) {
  const t = trans[language] || trans['en'];
  const completedCount = steps.filter((step) => step.completed).length;
  const percentage = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs relative overflow-hidden">
      {/* Decorative accent top-right corner to make it friendly and interactive */}
      <div className="absolute top-0 right-0 p-3 flex gap-1">
        <span className="p-1 px-1.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-extrabold uppercase tracking-wide">
          {t.onboarding}
        </span>
        {percentage === 100 && (
          <span className="p-1 px-1.5 rounded bg-amber-50 text-amber-600 text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> {t.activated}
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Core Percentage Card with visual score container */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex flex-col items-center justify-center shadow-md relative group shrink-0">
            <span className="text-xl font-display font-black leading-none">{percentage}%</span>
            <span className="text-[8px] font-extrabold uppercase tracking-wider mt-1 opacity-90">{t.ready}</span>
            {percentage === 100 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center text-slate-900 text-[9px]">
                ★
              </span>
            )}
          </div>

          <div>
            <h4 className="text-base font-display font-black text-slate-800 flex items-center gap-1.5">
              <Award className="w-5 h-5 text-amber-500 animate-bounce" />
              {t.setupTitle}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.setupDesc}
            </p>
          </div>
        </div>

        {/* Dynamic Progress Bar with satisfying scale width */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">{t.tracker}</span>
            <span className="text-emerald-700 font-mono tracking-wider">
              {completedCount} / {steps.length} {t.completed}
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/55 p-[2px] relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            >
              <div className="w-full h-full bg-linear-to-r from-white/10 to-transparent animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onToggleStep(step.id)}
            className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between h-28 group/item ${
              step.completed
                ? 'bg-emerald-50/40 border-emerald-150 text-emerald-900 hover:bg-emerald-50'
                : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-white'
            }`}
          >
            <div>
              <div className="flex justify-between items-start">
                <span className={`p-1.5 rounded-lg ${
                  step.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
                }`}>
                  {step.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Circle className="w-3.5 h-3.5" />
                  )}
                </span>
                
                <span className="text-[10px] font-mono text-slate-400">
                  {step.id.replace('step_', 'Key ')}
                </span>
              </div>

              <h5 className="text-xs font-bold mt-2.5 font-display text-slate-800 leading-tight">
                {step.label}
              </h5>
            </div>

            <p className="text-[10px] text-slate-400 mt-2 line-clamp-1 group-hover/item:line-clamp-none transition-all">
              {step.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
