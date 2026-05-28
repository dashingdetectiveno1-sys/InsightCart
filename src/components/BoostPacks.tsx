import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Megaphone, TrendingUp, ShieldCheck, Tag } from 'lucide-react';

export default function BoostPacks() {
  const packs = [
    {
      id: 'free',
      name: 'Essential Digital Store',
      icon: <ShieldCheck className="w-6 h-6" />,
      color: 'bg-slate-50 text-slate-700 border-slate-200',
      price: '₹0',
      period: 'forever',
      features: [
        'List up to 50 local products',
        'Basic QR settlements (standard fees)',
        'Store visibility in 1km radius',
        'Manual inventory management'
      ],
      popular: false
    },
    {
      id: 'starter',
      name: 'Local Starter Boost',
      icon: <Megaphone className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      price: '₹299',
      period: '/ month',
      features: [
        'Unlimited product listings',
        'Highlight store in 3km radius',
        'Top of local discovery for 2 products',
        'Basic insight dashboard',
      ],
      popular: false
    },
    {
      id: 'growth',
      name: 'Market Ruler Boost',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-md',
      price: '₹899',
      period: '/ month',
      features: [
        'Highlight store in 10km radius',
        'Top of discovery for 10 products',
        'Live localized demand pulses',
        'Zero commission QR settlements'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Wholesale Prime',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      price: '₹1499',
      period: '/ month',
      features: [
        'Exclusive supplier tag for local shops',
        'Bulk order inquiries unlocked',
        'Dedicated SMS marketing to 500 locals',
        'Priority support VIP desk'
      ],
      popular: false
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="text-center max-w-lg mx-auto py-4">
        <h2 className="text-2xl font-black font-display tracking-tight text-slate-900">
          Supercharge Your Local Reach
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Unlock premium merchant features to broadcast your inventory to thousands of nearby buyers automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packs.map((pack, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={pack.id}
            className={`relative rounded-2xl border p-6 flex flex-col justify-between ${pack.color} bg-white`}
            style={{
              borderColor: pack.popular ? '#10b981' : undefined
            }}
          >
            {pack.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${pack.color.split(' ')[0]} ${pack.color.split(' ')[1]}`}>
                  {pack.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{pack.name}</h3>
              </div>
              
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{pack.price}</span>
                <span className="text-xs font-medium text-slate-500">{pack.period}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button className={`w-full py-2.5 font-bold rounded-xl transition-all ${
              pack.popular 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}>
              Select {pack.name.split(' ')[0]}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
