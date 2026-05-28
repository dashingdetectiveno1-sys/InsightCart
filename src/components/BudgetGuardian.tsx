/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LedgerItem, Role, FamilyConfig, SecurityAuditToken } from '../types';
import { ShieldCheck, User, Users, PlusCircle, AlertTriangle, CheckCircle, XCircle, KeyRound, Lock } from 'lucide-react';

interface BudgetGuardianProps {
  ledger: LedgerItem[];
  config: FamilyConfig;
  auditTrail: SecurityAuditToken[];
  onUpdateLimit: (limit: number) => void;
  onUpdateRole: (role: Role) => void;
  onApproveItem: (id: string) => void;
  onRejectItem: (id: string) => void;
  onAddItem: (description: string, amount: number, category: string) => void;
  language?: string;
}

const trans: Record<string, Record<string, string>> = {
  en: {
    hubTitle: "Budget Guardian & Family Hub",
    hubDesc: "Secure collaborative ledger utilizing Role-Based Access Control (RBAC).",
    parentRole: "Parent (Approver)",
    childRole: "Child (Viewer/Requester)",
    limitCrossedTitle: "Budget Guardian Limit Crossed",
    limitCrossedDesc: "The total payment requests exceeds your configured monthly limit. Parents might need to prune lists or approve critical items only.",
    nearLimitTitle: "Approaching Monthly Limit",
    nearLimitDesc: "Budget warning: Family spending has hit 85% of your limit. Please monitor additional items.",
    monthlyLimit: "Monthly Spending Limit",
    resets: "Resets on 1st",
    enterLimit: "Enter Limit",
    parentAccess: "Parent Access: Drag/adjust limit slide freely.",
    limitLock: "🔒 Limit lock: Only parents can adjust.",
    totalSpending: "Total Spending",
    approved: "Approved",
    pending: "Pending Approvals",
    requestNew: "Request New Household item",
    hide: "Hide",
    addItem: "Add Item",
    descLabel: "Describe item",
    amountLabel: "Amount (₹)",
    categoryLabel: "Category",
    createLedger: "Create Ledger Entry",
    awaitingAppr: "(Awaiting Approval)",
    autoAppr: "(Auto-Approved)",
    reqDetails: "Request Details",
    requestedBy: "Requested By",
    status: "Status",
    actions: "Actions",
    noRequests: "No family ledger requests recorded. Click 'Add Item' to make a request.",
    securityTrail: "Verifiable Cryptographic Security Trail",
    securityDesc: "To prevent fraud, actions are timestamped and assigned an SHA-256 signature.",
    ssl: "SSL Enabled • Sync Channel Encrypted",
    approveBtn: "Approve",
    rejectBtn: "Reject",
    awaitingParent: "Awaiting Parent"
  },
  hi: {
    hubTitle: "बजट गार्जियन और फैमिली हब",
    hubDesc: "भूमिका-आधारित पहुंच नियंत्रण (RBAC) का उपयोग कर सुरक्षित सहयोगी लेज़र।",
    parentRole: "माता-पिता (अनुमोदक)",
    childRole: "बच्चा (दर्शक / अनुरोधकर्ता)",
    limitCrossedTitle: "बजट सीमा पार हो गई",
    limitCrossedDesc: "कुल भुगतान अनुरोध आपकी मासिक सीमा से अधिक हो गए हैं।",
    nearLimitTitle: "मासिक सीमा के करीब",
    nearLimitDesc: "बजट चेतावनी: परिवार का खर्च आपकी सीमा के 85% तक पहुंच गया है।",
    monthlyLimit: "मासिक खर्च सीमा",
    resets: "1 तारीख को रीसेट",
    enterLimit: "सीमा दर्ज करें",
    parentAccess: "माता-पिता की पहुंच: सीमा समायोजित करें।",
    limitLock: "🔒 सीमा लॉक: केवल माता-पिता समायोजित कर सकते हैं।",
    totalSpending: "कुल खर्च",
    approved: "स्वीकृत",
    pending: "लंबित अनुमोदन",
    requestNew: "नए घरेलू आइटम का अनुरोध करें",
    hide: "छिपाएं",
    addItem: "आइटम जोड़ें",
    descLabel: "आइटम का वर्णन करें",
    amountLabel: "राशि (₹)",
    categoryLabel: "श्रेणी",
    createLedger: "लेज़र प्रविष्टि बनाएं",
    awaitingAppr: "(अनुमोदन की प्रतीक्षा में)",
    autoAppr: "(स्वत: स्वीकृत)",
    reqDetails: "अनुरोध विवरण",
    requestedBy: "द्वारा अनुरोध किया गया",
    status: "स्थिति",
    actions: "कार्रवाई",
    noRequests: "कोई पारिवारिक लेज़र अनुरोध नहीं है। 'आइटम जोड़ें' पर क्लिक करें।",
    securityTrail: "क्रिप्टोग्राफ़िक सुरक्षा ट्रेल",
    securityDesc: "धोखाधड़ी को रोकने के लिए, क्रियाएं टाइमस्टैम्प की जाती हैं।",
    ssl: "SSL सक्षम • सिंक चैनल एन्क्रिप्टेड",
    approveBtn: "स्वीकारें",
    rejectBtn: "अस्वीकारें",
    awaitingParent: "माता-पिता की प्रतीक्षा"
  },
  mr: {
    hubTitle: "बजेट गार्डियन आणि फॅमिली हब",
    hubDesc: "रोल-बेस्ड ऍक्सेस कंट्रोल (RBAC) वापरून सुरक्षित सहयोगी लेजर.",
    parentRole: "पालक (मंजूरकर्ता)",
    childRole: "मुल (दर्शक/विनंतीकर्ता)",
    limitCrossedTitle: "बजेट मर्यादा ओलांडली",
    limitCrossedDesc: "एकूण पेमेंट विनंत्या तुमच्या मासिक मर्यादेपेक्षा जास्त आहेत.",
    nearLimitTitle: "मासिक मर्यादेच्या जवळ",
    nearLimitDesc: "बजेट चेतावणी: कुटुंबाचा खर्च 85% मर्यादेपर्यंत पोहोचला आहे.",
    monthlyLimit: "मासिक खर्च मर्यादा",
    resets: "१ तारखेला रीसेट",
    enterLimit: "मर्यादा प्रविष्ट करा",
    parentAccess: "पालक प्रवेश: मर्यादा समायोजित करा.",
    limitLock: "🔒 मर्यादा लॉक: फक्त पालक बदलू शकतात.",
    totalSpending: "एकूण खर्च",
    approved: "मंजूर",
    pending: "प्रलंबित मंजुरी",
    requestNew: "नवीन घरगुती वस्तूची विनंती करा",
    hide: "लपवा",
    addItem: "वस्तू जोडा",
    descLabel: "वस्तूचे वर्णन करा",
    amountLabel: "रक्कम (₹)",
    categoryLabel: "श्रेणी",
    createLedger: "लेजर एंट्री तयार करा",
    awaitingAppr: "(मंजुरीच्या प्रतीक्षेत)",
    autoAppr: "(स्वयं-मंजूर)",
    reqDetails: "विनंती तपशील",
    requestedBy: "द्वारे विनंती",
    status: "स्थिती",
    actions: "कृती",
    noRequests: "कोणतीही कौटुंबिक लेजर विनंती नाही. विनंती करण्यासाठी 'वस्तू जोडा' वर क्लिक करा.",
    securityTrail: "क्रिप्टोग्राफिक सुरक्षा ट्रेल",
    securityDesc: "फसवणूक टाळण्यासाठी, क्रिया टाइमस्टॅम्प केल्या जातात.",
    ssl: "SSL सक्षम • सिंक चॅनेल एनक्रिप्टेड",
    approveBtn: "मंजूर करा",
    rejectBtn: "नाकारा",
    awaitingParent: "पालकांची प्रतीक्षा"
  },
  gu: {
    hubTitle: "બજેટ ગાર્ડિયન અને ફેમિલી હબ",
    hubDesc: "રોલ-બેસ્ડ એક્સેસ કંટ્રોલ (RBAC) નો ઉપયોગ કરીને સુરક્ષિત સહયોગી લેજર.",
    parentRole: "માતાપિતા (મંજૂર કરનાર)",
    childRole: "બાળક (દર્શક/વિનંતી કરનાર)",
    limitCrossedTitle: "બજેટ મર્યાદા પાર થઈ ગઈ",
    limitCrossedDesc: "કુલ ચુકવણી વિનંતીઓ તમારી માસિક મર્યાદા કરતાં વધી ગઈ છે.",
    nearLimitTitle: "માસિક મર્યાદાની નજીક",
    nearLimitDesc: "બજેટ ચેતવણી: પરિવારનો ખર્ચ 85% મર્યાદા સુધી પહોંચી ગયો છે.",
    monthlyLimit: "માસિક ખર્ચ મર્યાદા",
    resets: "1 તારીખે રીસેટ",
    enterLimit: "મર્યાદા દાખલ કરો",
    parentAccess: "માતાપિતાની ઍક્સેસ: મર્યાદાને સમાયોજિત કરો.",
    limitLock: "🔒 મર્યાદા લૉક: ફક્ત માતાપિતા જ બદલી શકે છે.",
    totalSpending: "કુલ ખર્ચ",
    approved: "મંજૂર",
    pending: "બાકી મંજૂરીઓ",
    requestNew: "નવી ઘરગથ્થુ વસ્તુની વિનંતી કરો",
    hide: "છુપાવો",
    addItem: "આઇટમ ઉમેરો",
    descLabel: "આઇટમ વર્ણવો",
    amountLabel: "રકમ (₹)",
    categoryLabel: "કેટેગરી",
    createLedger: "લેજર એન્ટ્રી બનાવો",
    awaitingAppr: "(મંજૂરીની રાહમાં)",
    autoAppr: "(સ્વતઃ મંજૂર)",
    reqDetails: "વિનંતી વિગતો",
    requestedBy: "દ્વારા વિનંતી",
    status: "સ્થિતિ",
    actions: "ક્રિયાઓ",
    noRequests: "કોઈ કૌટુંબિક લેજર વિનંતી નથી. 'આઇટમ ઉમેરો' પર ક્લિક કરો.",
    securityTrail: "ક્રિપ્ટોગ્રાફિક સુરક્ષા ટ્રેલ",
    securityDesc: "છેતરપિંડી અટકાવવા માટે, ક્રિયાઓ ટાઇમસ્ટેમ્પ કરવામાં આવે છે.",
    ssl: "SSL સક્ષમ • સિંક ચેનલ એન્ક્રિપ્ટેડ",
    approveBtn: "મંજૂર કરો",
    rejectBtn: "નકારો",
    awaitingParent: "માતાપિતાની રાહ જોવાય છે"
  }
};

export default function BudgetGuardian({
  ledger,
  config,
  auditTrail,
  onUpdateLimit,
  onUpdateRole,
  onApproveItem,
  onRejectItem,
  onAddItem,
  language = 'en'
}: BudgetGuardianProps) {
  const [desc, setDesc] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [category, setCategory] = useState('Kitchen Groceries');
  const [showForm, setShowForm] = useState(false);
  const t = trans[language] || trans['en'];

  // Math for the budget
  const approvedSpending = ledger
    .filter((it) => it.status === 'approved')
    .reduce((sum, it) => sum + it.amount, 0);

  const pendingSpending = ledger
    .filter((it) => it.status === 'pending')
    .reduce((sum, it) => sum + it.amount, 0);

  const totalSpending = approvedSpending + pendingSpending;
  const isOverLimit = totalSpending > config.spendingLimit;
  // Let's also sound warning if it is near (e.g., within 90% space)
  const isNearLimit = totalSpending >= config.spendingLimit * 0.85 && totalSpending <= config.spendingLimit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountStr);
    if (!desc.trim() || isNaN(val) || val <= 0) return;

    onAddItem(desc, val, category);
    setDesc('');
    setAmountStr('');
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-150 p-6 md:p-8 shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-display font-semibold tracking-tight text-slate-800">
              {t.hubTitle}
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {t.hubDesc}
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 self-start">
          <button
            onClick={() => onUpdateRole('parent')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              config.role === 'parent'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            {t.parentRole}
          </button>
          <button
            onClick={() => onUpdateRole('child')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              config.role === 'child'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {t.childRole}
          </button>
        </div>
      </div>

      {/* WARNING AREA: Soft non-intrusive amber warnings if total crosses limit */}
      {isOverLimit && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
              {t.limitCrossedTitle}
            </span>
            <span className="text-sm text-amber-700 font-medium">
              ⚠️ {t.limitCrossedDesc}
            </span>
          </div>
        </div>
      )}

      {isNearLimit && !isOverLimit && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50/40 border border-amber-200/60 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
              {t.nearLimitTitle}
            </span>
            <span className="text-sm text-amber-600 font-medium">
              {t.nearLimitDesc}
            </span>
          </div>
        </div>
      )}

      {/* Grid: Stats and Ledger View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* Left Column: Stats & Limit Changer (33% content) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {t.monthlyLimit}
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded-full uppercase">
                {t.resets}
              </span>
            </div>
            {config.role === 'parent' ? (
              <div className="mt-2">
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-slate-500 text-sm font-semibold">₹</span>
                  </div>
                  <input
                    type="number"
                    value={config.spendingLimit}
                    onChange={(e) => onUpdateLimit(Math.max(0, parseInt(e.target.value) || 0))}
                    className="block w-full rounded-lg border border-slate-200 bg-white py-2 pl-7 pr-3 text-slate-900 text-sm font-semibold focus:border-green-500 focus:outline-hidden"
                    placeholder={t.enterLimit}
                  />
                </div>
                <p className="text-[11px] text-emerald-600 mt-1.5 font-medium">
                  {t.parentAccess}
                </p>
              </div>
            ) : (
              <div className="mt-2">
                <span className="text-2xl font-display font-bold text-slate-800">
                  ₹{config.spendingLimit.toLocaleString('en-IN')}
                </span>
                <p className="text-[11px] text-slate-400 mt-1 bg-slate-100 px-2 py-0.5 rounded-sm inline-block">
                  {t.limitLock}
                </p>
              </div>
            )}
          </div>

          {/* Progress Visual Mini-Bar */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3">
            <div className="flex justify-between text-xs text-slate-500">
              <span>{t.totalSpending}</span>
              <span className="font-semibold text-slate-800">
                ₹{totalSpending.toLocaleString('en-IN')} / ₹{config.spendingLimit.toLocaleString('en-IN')}
              </span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-305 ${
                  isOverLimit ? 'bg-amber-500' : isNearLimit ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (totalSpending / (config.spendingLimit || 1)) * 100)}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">{t.approved}</span>
                <span className="text-xs font-bold text-emerald-600">₹{approvedSpending.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">{t.pending}</span>
                <span className="text-xs font-bold text-amber-600">₹{pendingSpending.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Quick Request form for Child/Parent */}
          <div className="border border-slate-150 rounded-xl p-4 bg-emerald-50/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">{t.requestNew}</span>
              <button
                onClick={() => setShowForm(!showForm)}
                className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                {showForm ? t.hide : t.addItem}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                    {t.descLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="E.g., Groceries from Kirana"
                    className="w-full text-xs rounded-md border border-slate-200 bg-white p-2 focus:border-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                      {t.amountLabel}
                    </label>
                    <input
                      type="number"
                      required
                      value={amountStr}
                      onChange={(e) => setAmountStr(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full text-xs rounded-md border border-slate-200 bg-white p-2 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
                      {t.categoryLabel}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs rounded-md border border-slate-200 bg-white p-1.5 focus:border-emerald-500"
                    >
                      <option value="Grains">Grains Wholesale</option>
                      <option value="Kitchen Groceries">Kitchen Groceries</option>
                      <option value="Education">Education / Pencil box</option>
                      <option value="Dairy Products">Dairy Products</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-md p-2 text-xs font-semibold"
                >
                  {t.createLedger} {config.role === 'child' ? t.awaitingAppr : t.autoAppr}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Ledger Entry table with status actions (66% space) */}
        <div className="lg:col-span-8">
          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-150 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-3">{t.reqDetails}</th>
                  <th className="p-3">{t.requestedBy}</th>
                  <th className="p-3">{t.categoryLabel}</th>
                  <th className="p-3">{t.amountLabel}</th>
                  <th className="p-3">{t.status}</th>
                  <th className="p-3 text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ledger.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 bg-white transition-colors">
                    <td className="p-3 font-medium text-slate-900">
                      {item.description}
                    </td>
                    <td className="p-3 text-slate-500">
                      {item.requestedBy}
                    </td>
                    <td className="p-3">
                      <span className="px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-800">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      {item.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          <CheckCircle className="w-3 h-3" />
                          {t.approved}
                        </span>
                      )}
                      {item.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 animate-pulse">
                          {t.pending}
                        </span>
                      )}
                      {item.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                          <XCircle className="w-3 h-3" />
                          {t.rejectBtn}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {item.status === 'pending' ? (
                        config.role === 'parent' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onApproveItem(item.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] font-medium"
                            >
                              {t.approveBtn}
                            </button>
                            <button
                              onClick={() => onRejectItem(item.id)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-md text-[10px] font-medium transition-colors"
                            >
                              {t.rejectBtn}
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">
                            {t.awaitingParent}
                          </span>
                        )
                      ) : (
                        <span className="text-[10.5px] text-slate-400">
                          {item.status === 'approved' ? `${t.approved} by ${item.approvedBy || 'Parent'}` : t.rejectBtn}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {ledger.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-slate-400 text-sm">
                      {t.noRequests}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cryptographic Security Audit Log Panel */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between pb-3.5 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-900 text-slate-100 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
                {t.securityTrail}
              </h4>
              <p className="text-[10px] text-slate-400">
                {t.securityDesc}
              </p>
            </div>
          </div>
          <span className="text-[9px] font-mono bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500">
            {t.ssl}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {auditTrail.slice(0, 6).map((log) => (
            <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <KeyRound className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-extrabold uppercase text-emerald-800">
                    {log.action}
                  </span>
                  <span className="text-[8.5px] font-mono text-slate-400">
                    {log.id}
                  </span>
                </div>
                <p className="text-[10.5px] font-semibold text-slate-705 leading-snug">
                  {log.details}
                </p>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200/50">
                  <span className="text-[8.5px] text-slate-400">
                    By {log.actor}
                  </span>
                  <span className="text-[8.5px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded truncate max-w-[120px]" title={log.fingerprint}>
                    {log.fingerprint}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
