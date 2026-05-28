/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DemandTrend } from '../types';
import { DEMAND_TRENDS } from '../data';
import { Flame, TrendingUp, Search, BellRing, Target } from 'lucide-react';

interface PulseCardProps {
  trends?: DemandTrend[];
  onTrendSelect?: (keyword: string) => void;
  language?: string;
}

const trans: Record<string, Record<string, string>> = {
  en: { livePulse: "Live Local Market Pulse", nearbyDemand: "Nearby Demand Trends", active3km: "Active 3km Geo-hash", proximityShow: "Proximity matching shows what customers nearby are searching for. Tap any query to instantly inspect or stocks boost!", storeTip: "Store Tip:", considerPromo: "Consider the", neighborhoodPromo: "Neighborhood Promo", demandUp: "feature for Mustard Oil (demand up by 340% around you).", thisPuts: "This puts your discount at the top of the buyer app so locals visit your store rather than the big supermarket." },
  hi: { livePulse: "लाइव लोकल मार्केट पल्स", nearbyDemand: "आसपास की मांग के रुझान", active3km: "सक्रिय 3 किमी जियो-हैश", proximityShow: "निकटता मिलान दिखाता है कि आस-पास के ग्राहक क्या खोज रहे हैं।", storeTip: "स्टोर टिप:", considerPromo: "विचार करें", neighborhoodPromo: "नेबरहुड प्रोमो", demandUp: "सुविधा सरसों के तेल के लिए (मांग 340% बढ़ी)।", thisPuts: "यह आपके डिस्काउंट को खरीदार ऐप के शीर्ष पर रखता है।" },
  mr: { livePulse: "थेट स्थानिक बाजार नाडी", nearbyDemand: "जवळपासची मागणी कल", active3km: "सक्रिय 3 किमी जिओ-हॅश", proximityShow: "तुमच्या जवळील ग्राहक काय शोधत आहेत हे दर्शवते.", storeTip: "स्टोअर टीप:", considerPromo: "विचार करा", neighborhoodPromo: "नेबरहुड प्रोमो", demandUp: "सुविधा मोहरीच्या तेलासाठी (मागणी 340% वाढली).", thisPuts: "हे तुमचे सवलत खरेदीदार अॅपच्या शीर्षस्थानी ठेवते." },
  gu: { livePulse: "લાઇવ લોકલ માર્કેટ પલ્સ", nearbyDemand: "નજીકની માંગના વલણો", active3km: "સક્રિય 3 કિમી જિઓ-હેશ", proximityShow: "નજીકના ગ્રાહકો શું શોધી રહ્યા છે તે બતાવે છે.", storeTip: "સ્ટોર ટિપ:", considerPromo: "વિચાર કરો", neighborhoodPromo: "નેબરહુડ પ્રોમો", demandUp: "સુવિધા મસ્ટર્ડ ઓઇલ માટે (માંગ 340% વધી).", thisPuts: "આ તમારું ડિસ્કાઉન્ટ ખરીદનાર એપ્લિકેશનની ટોચ પર મૂકે છે." }
};

export default function PulseCard({ trends = DEMAND_TRENDS, onTrendSelect, language = 'en' }: PulseCardProps) {
  const t = trans[language] || trans['en'];

  return (
    <div className="bg-white text-slate-800 rounded-2xl border border-slate-200 p-5 shadow-sm relative overflow-hidden group">
      {/* Absolute glow decorative elements to establish premium design depth */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl transition-all"></div>
      
      {/* Title */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center animate-pulse">
            <Flame className="w-4 h-4" />
          </span>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider">
              {t.livePulse}
            </span>
            <h4 className="text-sm font-display font-black text-slate-900">
              {t.nearbyDemand}
            </h4>
          </div>
        </div>
        <div className="text-[10px] bg-slate-50 text-slate-500 border border-slate-200 font-mono py-1 px-2.5 rounded-md flex items-center gap-1">
          <Target className="w-3 h-3 text-emerald-600" /> {t.active3km}
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-2.5">
        {t.proximityShow}
      </p>

      {/* horizontal scroll list for trend pills/cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {trends.map((trend) => {
          const isHigh = trend.interest === 'high';
          return (
            <button
              key={trend.id}
              onClick={() => onTrendSelect?.(trend.keyword)}
              className="p-3 bg-slate-50 border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl transition-all text-left relative group/trend"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono tracking-tight font-semibold">
                  {trend.category}
                </span>
                <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-bold ${
                  isHigh ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  <TrendingUp className="w-2.5 h-2.5" />
                  {trend.interest.toUpperCase()}
                </span>
              </div>

              <h5 className="text-xs font-bold text-slate-800 mt-2 font-display group-hover/trend:text-emerald-700 transition-colors">
                {trend.keyword}
              </h5>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-200">
                <span className="text-[10px] text-emerald-600 font-semibold">
                  {trend.growth}
                </span>
                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-0.5">
                  <Search className="w-2.5 h-2.5" /> {trend.searches}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-150 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
        <div className="flex items-start gap-2">
          <BellRing className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10.5px] text-slate-700 block">
              <strong>{t.storeTip}</strong> {t.considerPromo} <strong className="text-emerald-700">{t.neighborhoodPromo}</strong> {t.demandUp}
            </span>
            <span className="text-[9.5px] text-slate-500 block mt-1">
              {t.thisPuts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
