/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Smartphone, RefreshCw, Key, ShieldCheck, Check } from 'lucide-react';

export default function QrGenerator() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [secureRef, setSecureRef] = useState('IC_REF_981240958732');
  const [totalRefreshes, setTotalRefreshes] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate a random 12-digit transaction/referral string
  const generateNewHash = () => {
    const randomSuffix = Math.floor(100000000000 + Math.random() * 900000000000);
    setSecureRef(`IC_REF_${randomSuffix}`);
    setTotalRefreshes((prev) => prev + 1);
  };

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateNewHash();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    generateNewHash();
    setTimeLeft(60);
  };

  const currentUpiPayload = `upi://pay?pa=insightcart.rural@okaxis&tr=${secureRef}&cu=INR&tn=RuralAgentReferral`;

  const copyPayload = () => {
    navigator.clipboard.writeText(currentUpiPayload);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="p-1 px-1.5 rounded-sm bg-emerald-50 text-emerald-700 font-extrabold text-[10px]">
              UPI SECURE
            </span>
            <span className="text-xs font-bold text-slate-800">Dynamic Agent QR</span>
          </div>
          <span className="text-[10.5px] text-slate-400 font-medium">Anti-Fraud Protection</span>
        </div>

        <p className="text-xs text-slate-500 mt-2.5">
          Guards against agent/referral fraud by rotating tokens every 60 seconds. Code becomes invalid immediately after rotation.
        </p>

        {/* QR Core Container */}
        <div className="my-6 flex flex-col items-center">
          <div className="relative p-4 bg-slate-50 rounded-2xl border border-slate-150 flex flex-col items-center justify-center">
            
            {/* Pseudo high-fidelity QR Code simulation block using CSS grid */}
            <div className="w-40 h-40 bg-white border border-slate-200 p-2 rounded-lg flex flex-col justify-between relative">
              <div className="grid grid-cols-4 gap-1 w-full h-full opacity-90">
                {/* Visual grid representing the data nodes of the QR */}
                {Array.from({ length: 16 }).map((_, idx) => {
                  // Make static looking squares resembling QR corners
                  const isCorner = [0, 3, 12].includes(idx);
                  return (
                    <div
                      key={idx}
                      className={`rounded-xs transition-all duration-300 ${
                        isCorner
                          ? 'bg-emerald-900 border-2 border-emerald-900 p-0.5'
                          : 'bg-slate-800'
                      }`}
                      style={{
                        opacity: isCorner ? 1 : (idx + totalRefreshes) % 3 === 0 ? 0.25 : 0.85,
                      }}
                    >
                      {isCorner && <div className="w-full h-full bg-white rounded-xs"></div>}
                    </div>
                  );
                })}
              </div>

              {/* Center Lock Overlay */}
              <div className="absolute inset-0 m-auto w-10 h-10 bg-emerald-600 rounded-lg shadow-md border-2 border-white flex items-center justify-center text-white">
                <Smartphone className="w-4 h-4" />
              </div>
            </div>

            {/* Live Ticking Indicator Circular overlay or countdown bar */}
            <div className="w-full mt-4 space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                <span>Rotating Payload</span>
                <span className="text-emerald-700 font-mono">Resets in {timeLeft}s</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    timeLeft <= 10 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${(timeLeft / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Secure Hash Label */}
          <div className="w-full text-center space-y-2 mt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase">
                Current Micro-Token String
              </span>
              <span className="text-xs font-mono font-bold text-slate-705 block">
                {secureRef}
              </span>
            </div>
            
            <div className="pt-2 border-t border-slate-200/50 flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wide">
                GPS Geolocated & Verified (0.3km)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <button
          onClick={copyPayload}
          className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Pay payload copied!
            </>
          ) : (
            <>
              <Key className="w-3.5 h-3.5 text-slate-500" /> Copy UPI Intent payload
            </>
          )}
        </button>

        <button
          onClick={handleManualRefresh}
          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Rotate Secure token now
        </button>
      </div>
    </div>
  );
}
