import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface TermsProps {
  onClose: () => void;
  language?: string;
}

const trans: Record<string, Record<string, string>> = {
  en: {
    title: "InsightCart Terms & Conditions",
    lastUpdated: "Last updated: May 2026",
    close: "Close",
    understand: "I Understand",
    q1: "Wait, What is InsightCart?",
    a1: "InsightCart is your neighborhood's very own Progressive Web Application (PWA) designed to seamlessly bridge the gap between local verified merchants and nearby family buyers.",
    q2: "1. Subscription Plans & Boost Packs",
    a2_1: "Essential Digital Store (Free Plan)",
    a2_2: "Local Starter Boost (₹299/mo)",
    a2_3: "Market Ruler Boost (₹899/mo)",
    a2_4: "Wholesale Prime (₹1499/mo)",
    q3: "2. Payments & Digital Settlement (Dynamic QR)",
    a3: "By utilizing the InsightCart Digital Interoperability QR engine, you acknowledge that all generated QR codes are strictly mapped to the merchant's unified BHIM/UPI identifier.",
    q4: "3. Voice Station Integration",
    a4: "The Voice Station is an AI-powered conversational interface designed to accelerate stock management. The merchant bears full responsibility.",
    q5: "4. Buyer Network: Family Ledgers & Household Authority",
    a5: "The application provides a 'Budget Guardian'. Users acting as 'Parent' or 'Admin' roles accept liability for approving requests.",
    q6: "5. Family Referral Systems",
    a6: "Buyers participating in the 'Invite Neighbours' referral program generate network codes."
  },
  hi: {
    title: "InsightCart नियम व शर्तें",
    lastUpdated: "अंतिम अपडेट: मई 2026",
    close: "बंद करें",
    understand: "मैं समझता हूँ",
    q1: "रुकिए, InsightCart क्या है?",
    a1: "InsightCart आपके पड़ोस का अपना प्रगतिशील वेब एप्लिकेशन (PWA) है जिसे स्थानीय व्यापारियों और आस-पास के पारिवारिक खरीदारों के बीच की दूरी को पाटने के लिए बनाया गया है।",
    q2: "1. सदस्यता योजनाएँ और बूस्ट पैक",
    a2_1: "आवश्यक डिजिटल स्टोर (निःशुल्क)",
    a2_2: "स्थानीय स्टार्टर बूस्ट (₹299/माह)",
    a2_3: "मार्केट रूलर बूस्ट (₹899/माह)",
    a2_4: "थोक प्राइम (₹1499/माह)",
    q3: "2. भुगतान और डिजिटल निपटान (डायनामिक क्यूआर)",
    a3: "InsightCart डिजिटल QR इंजन का उपयोग करके, आप स्वीकार करते हैं कि सभी जनरेट किए गए QR कोड पूरी तरह से व्यापारी के UPI से जुड़े हैं।",
    q4: "3. वॉयस स्टेशन एकीकरण",
    a4: "वॉयस स्टेशन स्टॉक प्रबंधन को तेज करने के लिए बनाया गया है। व्यापारी पूरी जिम्मेदारी लेता है।",
    q5: "4. क्रेता नेटवर्क: पारिवारिक लेजर",
    a5: "एप्लिकेशन एक 'बजट गार्जियन' प्रदान करता है। 'माता-पिता' की भूमिका अनुरोधों को मंजूरी देने के लिए है।",
    q6: "5. पारिवारिक रेफरल प्रणाली",
    a6: "रेफरल कार्यक्रम में भाग लेने वाले खरीदार नेटवर्क कोड उत्पन्न करते हैं।"
  },
  mr: {
    title: "InsightCart अटी आणि शर्ती",
    lastUpdated: "अंतिम अद्यतन: मे २०२६",
    close: "बंद करा",
    understand: "मला समजले",
    q1: "थांबा, InsightCart काय आहे?",
    a1: "InsightCart हे स्थानिक व्यापारी आणि जवळच्या खरेदीदारांमधील अंतर कमी करण्यासाठी बनवलेले तुमचे स्वतःचे प्रोग्रेसिव्ह वेब ॲप्लिकेशन (PWA) आहे.",
    q2: "1. सदस्यता योजना आणि बूस्ट पॅक",
    a2_1: "आवश्यक डिजिटल स्टोअर (विनामूल्य)",
    a2_2: "स्थानिक स्टार्टर बूस्ट (₹२९९/महिना)",
    a2_3: "मार्केट रूलर बूस्ट (₹८९९/महिना)",
    a2_4: "होलसेल प्राइम (₹१४९९/महिना)",
    q3: "2. देयके आणि डिजिटल सेटलमेंट",
    a3: "InsightCart QR इंजिन वापरून, आपण हे मान्य करता की सर्व QR कोड व्यापाऱ्याच्या UPI शी जोडलेले आहेत.",
    q4: "3. व्हॉइस स्टेशन इंटिग्रेशन",
    a4: "व्हॉइस स्टेशन स्टॉक व्यवस्थापनाला गती देण्यासाठी डिझाइन केले आहे. व्यापारी पूर्ण जबाबदारी घेतो.",
    q5: "4. खरेदीदार नेटवर्क: फॅमिली लेजर",
    a5: "ॲप्लिकेशन 'बजेट गार्डियन' प्रदान करते. विनंत्यांना मंजुरी देण्याची जबाबदारी 'पालक' भूमिकेची आहे.",
    q6: "5. फॅमिली रेफरल सिस्टम",
    a6: "रेफरल प्रोग्राममध्ये सहभागी होणारे खरेदीदार नेटवर्क कोड तयार करतात."
  },
  gu: {
    title: "InsightCart નિયમો અને શરતો",
    lastUpdated: "છેલ્લું અપડેટ: મે 2026",
    close: "બંધ કરો",
    understand: "હું સમજું છું",
    q1: "થોભો, InsightCart શું છે?",
    a1: "InsightCart એ સ્થાનિક વેપારીઓ અને નજીકના ખરીદદારો વચ્ચેના અંતરને દૂર કરવા માટે રચાયેલ તમારી પોતાની પ્રોગ્રેસિવ વેબ એપ્લિકેશન (PWA) છે.",
    q2: "1. સબ્સ્ક્રિપ્શન પ્લાન અને બૂસ્ટ પેક",
    a2_1: "આવશ્યક ડિજિટલ સ્ટોર (મફત)",
    a2_2: "લોકલ સ્ટાર્ટર બૂસ્ટ (₹299/મહિનો)",
    a2_3: "માર્કેટ રૂલર બૂસ્ટ (₹899/મહિનો)",
    a2_4: "હોલસેલ પ્રાઇમ (₹1499/મહિનો)",
    q3: "2. ચૂકવણી અને ડિજિટલ સેટલમેન્ટ",
    a3: "InsightCart QR એન્જિનનો ઉપયોગ કરીને, તમે સ્વીકારો છો કે બધા જોડાયેલા QR કોડ વેપારીના UPI સાથે સંબંધિત છે.",
    q4: "3. વૉઇસ સ્ટેશન એકીકરણ",
    a4: "વૉઇસ સ્ટેશન એ સ્ટોક મેનેજમેન્ટને વેગ આપવા માટે રચાયેલ છે. વેપારી સંપૂર્ણ જવાબદારી લે છે.",
    q5: "4. ખરીદનાર નેટવર્ક: કૌટુંબિક લેજર",
    a5: "એપ્લિકેશન 'બજેટ ગાર્ડિયન' પ્રદાન કરે છે. વિનંતીઓ મંજૂર કરવાની જવાબદારી 'પેરેન્ટ' ભૂમિકા પર છે.",
    q6: "5. ફેમિલી રેફરલ સિસ્ટમ",
    a6: "રેફરલ પ્રોગ્રામમાં ભાગ લેનારા ખરીદદારો નેટવર્ક કોડ બનાવે છે."
  }
};

export default function TermsAndConditions({ onClose, language = 'en' }: TermsProps) {
  const t = trans[language] || trans['en'];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-display font-black text-slate-900">{t.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{t.lastUpdated}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
          <section>
            <h3 className="font-bold text-slate-900 mb-2 font-display text-base">{t.q1}</h3>
            <p>{t.a1}</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2 font-display text-base">{t.q2}</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>{t.a2_1}</strong></li>
              <li><strong>{t.a2_2}</strong></li>
              <li><strong>{t.a2_3}</strong></li>
              <li><strong>{t.a2_4}</strong></li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2 font-display text-base">{t.q3}</h3>
            <p>{t.a3}</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2 font-display text-base">{t.q4}</h3>
            <p>{t.a4}</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2 font-display text-base">{t.q5}</h3>
            <p>{t.a5}</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2 font-display text-base">{t.q6}</h3>
            <p>{t.a6}</p>
          </section>
        </div>
        
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors"
          >
            {t.close}
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-colors"
          >
            {t.understand}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
