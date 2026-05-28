/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InventoryItem, DemandTrend } from '../types';
import { ShoppingBag, Navigation, Tag, Star, Award, ShieldCheck, Bookmark, Flame, Store } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocalDiscoveryProps {
  inventory: InventoryItem[];
  trends: DemandTrend[];
  onSelectItem: (item: InventoryItem) => void;
  onAddToCart?: (item: InventoryItem) => void;
  language?: string;
}

const trans: Record<string, Record<string, string>> = {
  en: { activeEngine: "Active Proximity Engine", discover: "Discover Local Merchants", gpsLocked: "GPS Locked: Village Sector 4", match: "Best Match", verified: "verified items ready", promo1Title: "Monsoon Oil Deal", promo1Text: "Flat ₹20 Off on Mustard Oil Refills (1L/2L packs)", promo2Title: "Pure Ghee Fresh Stock", promo2Text: "Buy Ghee Packet & get 1 packet sugar free", code: "CODE:", discoverItems: "Discover Instant Food Stocks & Essentials", exploreLocal: "Explore inventory verified in nearby stores in real-time.", popular: "Popular", lastUpdated: "Last updated:", rate: "Rate:", available: "Available:", units: "units", low: "(Low)", inspect: "Inspect Item", addToCart: "Add to Cart" },
  hi: { activeEngine: "सक्रिय निकटता इंजन", discover: "स्थानीय व्यापारी खोजें", gpsLocked: "जीपीएस लॉक: गांव सेक्टर 4", match: "सर्वश्रेष्ठ मिलान", verified: "सत्यापित आइटम तैयार", promo1Title: "मानसून ऑयल डील", promo1Text: "सरसों के तेल 1L/2L रिफिल पर फ्लैट ₹20 की छूट", promo2Title: "शुद्ध घी ताजा स्टॉक", promo2Text: "घी खरीदें और 1 पैकेट चीनी मुक्त पाएं", code: "कोड:", discoverItems: "त्वरित खाद्य स्टॉक और आवश्यक वस्तुएं खोजें", exploreLocal: "रीयल-टाइम में आस-पास के स्टोर में सत्यापित इन्वेंट्री एक्सप्लोर करें।", popular: "लोकप्रिय", lastUpdated: "अंतिम अपडेट:", rate: "दर:", available: "उपलब्ध:", units: "इकाइयां", low: "(कम)", inspect: "आइटम का निरीक्षण करें", addToCart: "कार्ट में डालें" },
  mr: { activeEngine: "सक्रिय जवळीक इंजिन", discover: "स्थानिक व्यापारी शोधा", gpsLocked: "जीपीएस लॉक: गाव सेक्टर 4", match: "सर्वोत्तम जुळणी", verified: "सत्यापित आयटम तयार", promo1Title: "पावसाळा तेल डील", promo1Text: "मोहरीच्या तेलावर फ्लॅट ₹20 सूट", promo2Title: "शुद्ध तूप ताजे स्टॉक", promo2Text: "तूप खरेदी करा आणि 1 पॅकेट शुगर फ्री मिळवा", code: "कोड:", discoverItems: "इन्स्टंट फूड स्टॉक्स आणि आवश्यक वस्तू शोधा", exploreLocal: "रिअल-टाइममध्ये जवळच्या दुकानांमध्ये सत्यापित यादी एक्सप्लोर करा.", popular: "लोकप्रिय", lastUpdated: "अंतिम अद्यतन:", rate: "दर:", available: "उपलब्ध:", units: "युनिट्स", low: "(कमी)", inspect: "आयटमची पाहणी करा", addToCart: "कार्टमध्ये जोडा" },
  gu: { activeEngine: "સક્રિય નિકટતા એંજીન", discover: "સ્થાનિક વેપારીઓને શોધો", gpsLocked: "જીપીએસ લૉક: ગામ સેક્ટર 4", match: "શ્રેષ્ઠ મેચ", verified: "ચકાસાયેલ વસ્તુઓ તૈયાર", promo1Title: "ચોમાસાની હંગામી ઓફર", promo1Text: "મસ્ટર્ડ તેલ પર ફ્લેટ ₹ 20 ડિસ્કાઉન્ટ", promo2Title: "શુદ્ધ ઘી ફ્રેશ સ્ટોક", promo2Text: "ઘી ખરીદો અને 1 પેકેટ શુગર ફ્રી મેળવો", code: "કોડ:", discoverItems: "ઇન્સ્ટન્ટ ફૂડ સ્ટોક્સ અને આવશ્યક ચીજો શોધો", exploreLocal: "રીઅલ-ટાઇમમાં નજીકના સ્ટોર્સમાં ચકાસાયેલ ઇન્વેન્ટરીનું અન્વેષણ કરો.", popular: "લોકપ્રિય", lastUpdated: "છેલ્લું અપડેટ:", rate: "દર:", available: "ઉપલબ્ધ:", units: "એકમો", low: "(ઓછું)", inspect: "વસ્તુની તપાસ કરો", addToCart: "કાર્ટમાં ઉમેરો" }
};

export default function LocalDiscovery({
  inventory,
  trends,
  onSelectItem,
  onAddToCart,
  language = 'en'
}: LocalDiscoveryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Dairy', 'Grains', 'Oils', 'Sweeteners', 'Spices', 'Beverages'];
  const t = trans[language] || trans['en'];

  const PROMOTIONS = [
    { id: 'promo-1', title: t.promo1Title, text: t.promo1Text, code: 'MONSOON20', tag: 'Kachi Ghani', gradient: 'from-amber-400 to-orange-500' },
    { id: 'promo-2', title: t.promo2Title, text: t.promo2Text, code: 'PUREGHEE', tag: 'Dairy', gradient: 'from-blue-400 to-indigo-500' }
  ];

  const NEARBY_STORES = [
    { id: 'store-1', name: "Rajiv's InsightCart Store", distance: '0.3 km away', rating: '4.8', itemsInStock: 250, location: 'Opp. Panchayati Ghar', gradient: 'from-emerald-400 to-teal-600' },
    { id: 'store-2', name: 'Gupta Wholesale Kirana', distance: '1.2 km away', rating: '4.5', itemsInStock: 80, location: 'Market Main Corner', gradient: 'from-amber-400 to-red-500' },
    { id: 'store-3', name: 'Rural Co-operative Grains', distance: '2.5 km away', rating: '4.2', itemsInStock: 120, location: 'State Warehouse Road', gradient: 'from-purple-400 to-indigo-600' }
  ];

  const filteredItems = selectedCategory === 'All'
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Visual map & store-selectors strip */}
      <div className="bg-white text-slate-800 rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Navigation className="w-32 h-32 text-emerald-600 animate-pulse" />
        </div>
        
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Navigation className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-extrabold text-emerald-600 tracking-wider">
                {t.activeEngine}
              </span>
              <h4 className="text-sm font-display font-black text-slate-900">
                {t.discover}
              </h4>
            </div>
          </div>
          <span className="text-[10.5px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono py-1 px-2.5 rounded-md font-bold">
            {t.gpsLocked}
          </span>
        </div>

        {/* Store directory scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
          {NEARBY_STORES.map((st, i) => (
            <motion.div
              whileHover={{ y: -2 }}
              key={st.id}
              className={`rounded-xl border transition-all text-left flex flex-col justify-between overflow-hidden relative group ${
                i === 0
                  ? 'bg-emerald-50 border-emerald-500 text-slate-800 shadow-[0_0_0_2px_rgba(16,185,129,0.1)]'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className={`h-16 w-full relative bg-gradient-to-br ${st.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Store className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="p-3.5 pt-2">
                <div className="flex justify-between items-start">
                  <span className={`text-[9.5px] font-mono p-1 rounded font-bold ${
                    i === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-50 border border-slate-100 text-slate-500'
                  }`}>
                    {st.distance}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {st.rating}
                  </div>
                </div>

                <h5 className="text-xs font-bold font-display mt-2 group-hover:text-emerald-700 text-slate-900">
                  {st.name}
                </h5>

                <p className="text-[10px] text-slate-500 mt-0.5">
                  📍 {st.location}
                </p>
              </div>

              <div className="flex items-center justify-between mt-0 pt-2 pb-3 px-3.5 border-t border-slate-100">
                <span className="text-[9px] text-slate-500 italic">
                  {st.itemsInStock} {t.verified}
                </span>
                {i === 0 && (
                  <span className="inline-flex items-center gap-0.5 text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    <Award className="w-2.5 h-2.5" /> {t.match}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Promos slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROMOTIONS.map((promo) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            key={promo.id}
            className="p-0 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 transition-all flex items-stretch gap-3.5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-xl group-hover:bg-amber-400/10 transition-all"></div>
            
            <div className={`w-24 min-h-[100px] shrink-0 relative bg-gradient-to-br ${promo.gradient} flex items-center justify-center`}>
              <Tag className="w-8 h-8 text-white opacity-50" />
            </div>

            <div className="space-y-1 py-4 pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800 font-display">
                  {promo.title}
                </span>
                <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                  {promo.tag.toUpperCase()}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-snug">
                {promo.text}
              </p>
              <div className="text-[9.5px] font-mono tracking-wider font-extrabold text-amber-700 bg-white border border-amber-200/50 py-0.5 px-2 rounded w-fit uppercase mt-2">
                {t.code} {promo.code}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Categories and product stream discovery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
          <div>
            <h5 className="text-sm font-display font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
              <ShoppingBag className="w-4.5 h-4.5 text-emerald-600" />
              {t.discoverItems}
            </h5>
            <p className="text-[11px] text-slate-400 mt-0.5">{t.exploreLocal}</p>
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-200/70 rounded-xl p-0.5 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-850 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product listing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => {
            const isLowStock = item.quantity < 35;
            
            // Core matching with live trends logic for personalized labels!
            const matchedTrend = trends.find(t => item.name.toLowerCase().includes(t.keyword.toLowerCase().split(' ')[0]));

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                key={item.id}
                className="bg-white rounded-xl border border-slate-150 p-4 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group h-auto relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 z-10">
                    {matchedTrend && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[9px] font-black border border-amber-100/40 shadow-sm shadow-amber-200/20">
                        <Flame className="w-2.5 h-2.5 text-amber-500 animate-pulse" /> {t.popular}
                      </span>
                    )}
                </div>

                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9.5px] font-mono text-slate-400 uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="flex-1">
                  <h6 className="text-xs font-bold text-slate-800 mt-1 font-display flex flex-wrap gap-1 items-baseline">
                    <span>{item.name}</span>
                    {item.nativeName && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({item.nativeName})
                      </span>
                    )}
                  </h6>

                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    {t.lastUpdated} {new Date(item.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="space-y-2.5 mt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400">{t.rate}</span>
                      <span className="text-sm font-display font-black text-slate-800 ml-1">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9.5px] text-slate-400 block font-semibold">{t.available}</span>
                      <span className={`text-[10.5px] font-bold font-mono ${
                        isLowStock ? 'text-amber-600 animate-pulse' : 'text-slate-700'
                      }`}>
                        {item.quantity} {t.units} {isLowStock && t.low}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="flex-1 py-1 px-3 text-[10.5px] font-semibold border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors text-center"
                    >
                      {t.inspect}
                    </button>
                    {onAddToCart && (
                      <button
                        onClick={() => onAddToCart(item)}
                        className="py-1 px-3 text-[10.5px] font-bold bg-emerald-600 hover:bg-emerald-700 hover:shadow-xs text-white rounded-lg transition-colors shrink-0"
                      >
                        {t.addToCart}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
