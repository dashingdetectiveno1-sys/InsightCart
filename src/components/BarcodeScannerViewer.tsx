import React, { useState, useEffect } from 'react';
import { Camera, ScanLine, X, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onScanComplete: (code: string) => void;
}

export default function BarcodeScannerViewer({ onScanComplete }: Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanHistory, setScanHistory] = useState<string[]>([]);

  const startScan = () => {
    setIsScanning(true);
    setHasCameraPermission(true); // Simulate getting permission

    // Simulate finding a barcode after 2.5 seconds
    setTimeout(() => {
      const simulatedCodes = ['89010_oil', '777_tea', '555_butter', '123_sugar'];
      const randomCode = simulatedCodes[Math.floor(Math.random() * simulatedCodes.length)];
      
      setScanHistory(prev => {
        const newHistory = [randomCode, ...prev];
        return newHistory.slice(0, 5); // Keep only last 5 items
      });
      
      onScanComplete(randomCode);
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {isScanning ? (
        <div className="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden shadow-inner flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-40 blur-sm mix-blend-luminosity"></div>
          
          <div className="relative z-10 w-3/4 h-24 border-2 border-emerald-500/50 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.2)]">
             <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="absolute left-0 w-full h-0.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] z-20"
              />
          </div>
          
          <p className="mt-3 text-[10px] text-emerald-400 font-mono z-10 animate-pulse font-bold tracking-widest">
            ANALYZING BARCODE...
          </p>

          <button
            onClick={() => setIsScanning(false)}
            className="absolute top-2 right-2 p-1 bg-slate-800/80 rounded-full text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={startScan}
          className="w-full py-4 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-colors flex flex-col items-center justify-center gap-2 group"
        >
          <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-center">
            <h5 className="text-xs font-bold text-slate-700">Open Camera to Scan</h5>
            <p className="text-[10px] text-slate-500 mt-0.5">Auto-detects products from barcode</p>
          </div>
        </button>
      )}

      {/* History List */}
      <AnimatePresence>
        {scanHistory.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-slate-200 rounded-lg overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-200">
              <History className="w-3.5 h-3.5 text-slate-500" />
              <h4 className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">Recent Scans</h4>
            </div>
            <ul className="divide-y divide-slate-100">
              {scanHistory.map((code, index) => (
                <motion.li 
                  key={`${code}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-2 text-xs text-slate-600 font-mono flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {code}
                  </span>
                  <span className="text-[9px] text-slate-400 font-sans">Just now</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
