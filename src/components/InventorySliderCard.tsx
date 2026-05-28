import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2 } from 'lucide-react';
import { InventoryItem } from '../types';

interface Props {
  item: InventoryItem;
  onUpdatePrice: (id: string, price: number) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
  language?: string;
}

const trans: Record<string, Record<string, string>> = {
  en: { deleteItem: "Delete item", retailRate: "Retail Rate:", stockQuantity: "Stock quantity:", unlockSliders: "Unlock Sliders to Edit", cancel: "Cancel", confirmUpdates: "Confirm Updates" },
  hi: { deleteItem: "आइटम हटाएं", retailRate: "खुदरा दर:", stockQuantity: "स्टॉक मात्रा:", unlockSliders: "संपादित करने के लिए अनलॉक करें", cancel: "रद्द करें", confirmUpdates: "अद्यतन की पुष्टि करें" },
  mr: { deleteItem: "वस्तू हटवा", retailRate: "किरकोळ दर:", stockQuantity: "स्टॉक प्रमाण:", unlockSliders: "संपादित करण्यासाठी अनलॉक करा", cancel: "रद्द करा", confirmUpdates: "अद्यतनांची पुष्टी करा" },
  gu: { deleteItem: "વસ્તુ કાઢી નાખો", retailRate: "છૂટક દર:", stockQuantity: "સ્ટોક જથ્થો:", unlockSliders: "સંપાદિત કરવા માટે અનલૉક કરો", cancel: "રદ કરો", confirmUpdates: "અપડેટ્સની પુષ્ટિ કરો" }
};

export default function InventorySliderCard({ item, onUpdatePrice, onUpdateQuantity, onDelete, language = 'en' }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [stagedPrice, setStagedPrice] = useState(item.price);
  const [stagedQuantity, setStagedQuantity] = useState(item.quantity);
  const t = trans[language] || trans['en'];

  // Sync state if item updates externally
  useEffect(() => {
    setStagedPrice(item.price);
    setStagedQuantity(item.quantity);
  }, [item.price, item.quantity]);

  const hasChanges = stagedPrice !== item.price || stagedQuantity !== item.quantity;
  const isLow = item.quantity < 30;

  const handleConfirm = () => {
    if (stagedPrice !== item.price) {
      onUpdatePrice(item.id, stagedPrice);
    }
    if (stagedQuantity !== item.quantity) {
      onUpdateQuantity(item.id, stagedQuantity);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setStagedPrice(item.price);
    setStagedQuantity(item.quantity);
    setIsEditing(false);
  };

  return (
    <div className={`bg-white rounded-xl border p-4 transition-colors relative group ${isEditing ? 'border-emerald-300 shadow-md ring-1 ring-emerald-100' : 'border-slate-150 hover:border-slate-300'}`}>
      <button
        onClick={() => onDelete(item.id)}
        className="absolute top-2 right-2 p-1 rounded text-slate-350 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
        title={t.deleteItem}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      <div className="flex justify-between items-start mb-4 gap-2">
        <div>
          <span className="text-[10px] font-mono text-slate-400 capitalize bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
            {item.category}
          </span>
          <h5 className="font-bold text-slate-800 text-sm mt-1 leading-tight flex items-baseline gap-1 pr-6">
            {item.name}
          </h5>
          {item.nativeName && (
            <span className="text-xs text-slate-400 font-medium">{item.nativeName}</span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Price Slider representation */}
        <div className={`space-y-1 ${!isEditing ? 'opacity-80' : ''}`}>
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-500 font-semibold">{t.retailRate}</span>
            <strong className={`${stagedPrice !== item.price ? 'text-emerald-600' : 'text-slate-800'}`}>
              ₹{stagedPrice}
            </strong>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            value={stagedPrice}
            onChange={(e) => setStagedPrice(parseInt(e.target.value))}
            disabled={!isEditing}
            className={`w-full h-1 bg-slate-200 rounded-lg appearance-none ${isEditing ? 'cursor-pointer accent-emerald-600' : 'cursor-not-allowed accent-slate-400'}`}
          />
        </div>

        {/* Stock Quantity slider represent */}
        <div className={`space-y-1 ${!isEditing ? 'opacity-80' : ''}`}>
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-500 font-semibold">{t.stockQuantity}</span>
            <strong className={`${stagedQuantity !== item.quantity ? 'text-amber-600' : isLow ? 'text-orange-600 animate-pulse font-bold' : 'text-slate-700'}`}>
              {stagedQuantity} kg
            </strong>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={stagedQuantity}
            onChange={(e) => setStagedQuantity(parseInt(e.target.value))}
            disabled={!isEditing}
            className={`w-full h-1 bg-slate-200 rounded-lg appearance-none ${isEditing ? 'cursor-pointer accent-amber-500' : 'cursor-not-allowed accent-slate-400'}`}
          />
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {!isEditing ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 pt-3 border-t border-slate-100 flex justify-center"
          >
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 w-full text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" /> {t.unlockSliders}
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2"
          >
            <button 
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              onClick={handleConfirm}
              className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors"
            >
              {t.confirmUpdates}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
