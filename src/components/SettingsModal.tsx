import React from 'react';
import { X, Globe, Moon, Bell, HelpCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  onClose: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const trans: Record<string, any> = {
  en: { settings: "App Settings", lang: "Language", langDesc: "Choose your preferred app language", dark: "Dark Mode", darkDesc: "Switch to a dark theme for night viewing", notif: "Notifications", notifDesc: "Manage order and stock alerts", priv: "Privacy Center", help: "Help & Support", privTitle: "Privacy & Security", privDesc: "Your data is stored locally. We do not sell your info.", helpTitle: "Help & Support", helpDesc: "Need assistance? Contact support@insightcart.com" },
  hi: { settings: "ऐप सेटिंग्स", lang: "भाषा", langDesc: "अपनी पसंद की भाषा चुनें", dark: "डार्क मोड", darkDesc: "रात में देखने के लिए डार्क थीम पर स्विच करें", notif: "सूचनाएं", notifDesc: "ऑर्डर और स्टॉक अलर्ट प्रबंधित करें", priv: "गोपनीयता केंद्र", help: "सहायता केंद्र", privTitle: "गोपनीयता और सुरक्षा", privDesc: "आपका डेटा स्थानीय रूप से संग्रहीत है। हम आपकी जानकारी नहीं बेचते हैं।", helpTitle: "सहायता केंद्र", helpDesc: "सहायता चाहिए? support@insightcart.com पर संपर्क करें" },
  mr: { settings: "अॅप सेटिंग्ज", lang: "भाषा", langDesc: "आपली आवडती भाषा निवडा", dark: "डार्क मोड", darkDesc: "रात्री पाहण्यासाठी डार्क थीमवर स्विच करा", notif: "सूचना", notifDesc: "ऑर्डर आणि स्टॉक अलर्ट व्यवस्थापित करा", priv: "गोपनीयता केंद्र", help: "मदत आणि सपोर्ट", privTitle: "गोपनीयता आणि सुरक्षितता", privDesc: "तुमचा डेटा स्थानिकरित्या संग्रहित केला जातो. आम्ही तुमची माहिती विकत नाही.", helpTitle: "मदत आणि सपोर्ट", helpDesc: "मदत हवी आहे? support@insightcart.com वर संपर्क साधा" },
  gu: { settings: "એપ સેટિંગ્સ", lang: "ભાષા", langDesc: "તમારી પસંદીદા ભાષા પસંદ કરો", dark: "ડાર્ક મોડ", darkDesc: "રાત્રે જોવા માટે ડાર્ક થીમ પર સ્વિચ કરો", notif: "સૂચનાઓ", notifDesc: "ઓર્ડર અને સ્ટોક એલર્ટ મેનેજ કરો", priv: "ગોપનીયતા કેન્દ્ર", help: "મદદ અને આધાર", privTitle: "ગોપનીયતા અને સુરક્ષા", privDesc: "તમારો ડેટા સ્થાનિક રીતે સંગ્રહિત છે. અમે તમારી માહિતી વેચતા નથી.", helpTitle: "મદદ અને આધાર", helpDesc: "મદદ જોઈએ છે? support@insightcart.com પર સંપર્ક કરો" },
};

export default function SettingsModal({ onClose, language, setLanguage, theme, setTheme }: Props) {
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  const t = trans[language] || trans['en'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-display font-bold text-slate-800 text-lg">{t.settings}</h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Language Setting */}
          <div className="p-3 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{t.lang}</h4>
                <p className="text-xs text-slate-500">{t.langDesc}</p>
              </div>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
            </select>
          </div>

          {/* Theme Setting */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Moon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{t.dark}</h4>
                <p className="text-xs text-slate-500">{t.darkDesc}</p>
              </div>
            </div>
            <div className={`w-10 h-6 ${theme === 'dark' ? 'bg-indigo-500' : 'bg-slate-200'} rounded-full relative cursor-pointer transition-colors`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${theme === 'dark' ? 'left-5' : 'left-1'}`}></div>
            </div>
          </button>

          {/* Notification Setting */}
          <button className="w-full p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Bell className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-amber-600 transition-colors">{t.notif}</h4>
                <p className="text-xs text-slate-500">{t.notifDesc}</p>
              </div>
            </div>
            <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button 
              onClick={() => { setShowPrivacy(!showPrivacy); setShowHelp(false); }}
              className={`p-3 border ${showPrivacy ? 'border-emerald-300 bg-emerald-50' : 'border-slate-100 hover:bg-slate-50'} rounded-xl transition-colors flex flex-col items-center gap-2 justify-center ${showPrivacy ? 'text-emerald-700' : 'text-slate-600'}`}>
              <Lock className="w-5 h-5" />
              <span className="text-xs font-bold">{t.priv}</span>
            </button>
            <button 
              onClick={() => { setShowHelp(!showHelp); setShowPrivacy(false); }}
              className={`p-3 border ${showHelp ? 'border-blue-300 bg-blue-50' : 'border-slate-100 hover:bg-slate-50'} rounded-xl transition-colors flex flex-col items-center gap-2 justify-center ${showHelp ? 'text-blue-700' : 'text-slate-600'}`}>
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-bold">{t.help}</span>
            </button>
          </div>

          {showPrivacy && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800 mt-2">
              <h5 className="font-bold mb-1 flex items-center gap-2"><Lock className="w-4 h-4"/> {t.privTitle}</h5>
              <p className="text-xs opacity-90 leading-relaxed">{t.privDesc}</p>
            </motion.div>
          )}

          {showHelp && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800 mt-2">
              <h5 className="font-bold mb-1 flex items-center gap-2"><HelpCircle className="w-4 h-4"/> {t.helpTitle}</h5>
              <p className="text-xs opacity-90 leading-relaxed">{t.helpDesc}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
