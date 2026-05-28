/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  InventoryItem,
  SyncQueueItem,
  LedgerItem,
  ProfileStep,
  FamilyConfig,
  Role,
  ReviewItem,
  DemandTrend,
  SecurityAuditToken,
} from './types';
import {
  INITIAL_INVENTORY,
  INITIAL_LEDGER,
  PROFILE_STEPS,
  INITIAL_REVIEWS,
  DEMAND_TRENDS,
  INITIAL_AUDIT_LOG,
} from './data';
import BudgetGuardian from './components/BudgetGuardian';
import VoicePanel from './components/VoicePanel';
import QrGenerator from './components/QrGenerator';
import ReviewSystem from './components/ReviewSystem';
import LocalDiscovery from './components/LocalDiscovery';
import PulseCard from './components/PulseCard';
import OnboardingProgressBar from './components/OnboardingProgressBar';
import ReferralSystem from './components/ReferralSystem';
import BoostPacks from './components/BoostPacks';
import TermsAndConditions from './components/TermsAndConditions';
import InventorySliderCard from './components/InventorySliderCard';
import BarcodeScannerViewer from './components/BarcodeScannerViewer';
import LandingPage from './components/LandingPage';
import SettingsModal from './components/SettingsModal';

import {
  Store,
  Mic,
  ShieldAlert,
  QrCode,
  Terminal,
  Grid,
  Wifi,
  WifiOff,
  Plus,
  Search,
  ShoppingCart,
  TrendingUp,
  Award,
  Trash2,
  RefreshCw,
  X,
  Volume2,
  Smartphone,
  Tv,
  Monitor,
  Sparkles,
  Barcode,
  VolumeX,
  ShieldCheck,
  Star,
  Zap,
  ArrowRight,
  BookmarkCheck,
  Settings,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const trans: Record<string, Record<string, string>> = {
  en: {
    merchantMode: "👨‍💼 Merchant Mode", buyerMode: "👪 Family Buyer Mode", morning: "Morning, Rajiv!", visible: "Your store is visible to 5,000+ local buyers.", stockTab: "Stock & Price", voiceTab: "💡 Voice Station", qrTab: "Dynamic QR", boostTab: "🚀 Boost Packs", discoveryTab: "🔍 Shop Discovery Feed", ledgerTab: "🛡️ Family Ledger Safeguard", reviewTab: "⭐ Verified Reviews", referTab: "🤝 Refer & Earn"
  },
  hi: {
    merchantMode: "👨‍💼 व्यापारी मोड", buyerMode: "👪 पारिवारिक खरीदार", morning: "सुप्रभात, राजीव!", visible: "आपकी दुकान 5,000+ स्थानीय लोगों को दिखाई दे रही है।", stockTab: "स्टॉक और मूल्य", voiceTab: "💡 वॉयस स्टेशन", qrTab: "डायनामिक QR", boostTab: "🚀 बूस्ट पैक्स", discoveryTab: "🔍 दुकान खोजें", ledgerTab: "🛡️ पारिवारिक खाता", reviewTab: "⭐ प्रमाणित समीक्षाएं", referTab: "🤝 संदर्भ एवं कमाई"
  },
  mr: {
    merchantMode: "👨‍💼 व्यापारी मोड", buyerMode: "👪 कौटुंबिक खरेदीदार", morning: "शुभ सकाळ, राजीव!", visible: "तुमचे दुकान 5,000+ स्थानिक लोकांना दिसत आहे.", stockTab: "स्टॉक आणि किंमत", voiceTab: "💡 व्हॉइस स्टेशन", qrTab: "डायनॅमिक QR", boostTab: "🚀 बूस्ट पॅक", discoveryTab: "🔍 दुकान शोधा", ledgerTab: "🛡️ कौटुंबिक खाते", reviewTab: "⭐ सत्यापित पुनरावलोकने", referTab: "🤝 संदर्भ आणि कमाई"
  },
  gu: {
    merchantMode: "👨‍💼 વેપારી મોડ", buyerMode: "👪 કૌટુંબિક ખરીદનાર", morning: "સુપ્રભાત, રાજીવ!", visible: "તમારી દુકાન 5,000+ સ્થાનિક લોકોને દેખાય છે.", stockTab: "સ્ટોક અને કિંમત", voiceTab: "💡 વૉઇસ સ્ટેશન", qrTab: "ડાયનેમિક QR", boostTab: "🚀 બૂસ્ટ પેક", discoveryTab: "🔍 દુકાન શોધો", ledgerTab: "🛡️ કૌટુંબિક ખાતું", reviewTab: "⭐ ચકાસાયેલ સમીક્ષાઓ", referTab: "🤝 સંદર્ભ અને કમાણી"
  }
};

export default function App() {
  // Primary States (persisted locally with fail-safe database initializations)
  const [connection, setConnection] = useState<'online' | 'offline'>(() => {
    const saved = localStorage.getItem('ic_connection');
    return saved === 'offline' ? 'offline' : 'online';
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('ic_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [ledger, setLedger] = useState<LedgerItem[]>(() => {
    const saved = localStorage.getItem('ic_ledger');
    return saved ? JSON.parse(saved) : INITIAL_LEDGER;
  });

  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>(() => {
    const saved = localStorage.getItem('ic_sync_queue');
    return saved ? JSON.parse(saved) : [];
  });

  const [profileSteps, setProfileSteps] = useState<ProfileStep[]>(() => {
    const saved = localStorage.getItem('ic_profile_steps');
    return saved ? JSON.parse(saved) : PROFILE_STEPS;
  });

  const [familyConfig, setFamilyConfig] = useState<FamilyConfig>(() => {
    const saved = localStorage.getItem('ic_family_config');
    return saved
      ? JSON.parse(saved)
      : { spendingLimit: 3000, role: 'parent', currentUser: 'Rajiv (Parent)' };
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('ic_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [auditLog, setAuditLog] = useState<SecurityAuditToken[]>(() => {
    const saved = localStorage.getItem('ic_audit_log');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOG;
  });

  const [demandTrends, setDemandTrends] = useState<DemandTrend[]>(DEMAND_TRENDS);

  // Custom simulator configurations to preview adaptivity across Laptop, Smartboard, Phones
  const [selectedDevice, setSelectedDevice] = useState<'universal' | 'smartboard' | 'laptop' | 'mobile_portrait' | 'mobile_landscape'>('universal');

  // Multi-Persona View controller
  const [persona, setPersona] = useState<'merchant' | 'buyer'>('merchant');

  // Custom Navigation Tabs states inside Merchant/Buyer Persona
  const [merchantTab, setMerchantTab] = useState<'inventory' | 'voice' | 'qr' | 'boost'>('inventory');
  const [buyerTab, setBuyerTab] = useState<'discovery' | 'ledger' | 'reviews' | 'referral'>('discovery');

  // Interactive Focus States that adaptively hide bottom navbar (Defensive UX)
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Sync state loader simulation
  const [isSyncing, setIsSyncing] = useState(false);

  // Form states for inventory
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    nativeName: '',
    price: '',
    quantity: '',
    category: 'Grains',
  });

  // Track inventory updates to power step 3 of gamification
  const [editCount, setEditCount] = useState(() => {
    return parseInt(localStorage.getItem('ic_edit_count') || '0');
  });

  // Barcode entry simulation input
  const [barcodeInput, setBarcodeInput] = useState('');
  const [simulatedVoicePrice, setSimulatedVoicePrice] = useState('');
  const [barcodeNotification, setBarcodeNotification] = useState('');

  // "Shop Boost" Subscription states
  const [hasSubscription, setHasSubscription] = useState(() => {
    return localStorage.getItem('ic_subscribed') === 'true';
  });
  const [autoSettleAlert, setAutoSettleAlert] = useState(true);

  // Defensive UX: Quiet / Whisper mode for crowded marketplace noise reduction
  const [whisperMode, setWhisperMode] = useState(false);

  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [appLanguage, setAppLanguage] = useState(() => localStorage.getItem('ic_lang') || 'en');
  const [appTheme, setAppTheme] = useState(() => localStorage.getItem('ic_theme') || 'light');

  useEffect(() => {
    localStorage.setItem('ic_lang', appLanguage);
  }, [appLanguage]);

  useEffect(() => {
    localStorage.setItem('ic_theme', appTheme);
  }, [appTheme]);

  const t = trans[appLanguage] || trans['en'];

  // Real-time synchronization socket handler
  useEffect(() => {
    if (connection !== 'online') return;

    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProtocol}//${window.location.host}`;
    console.log('Attaching WebSocket listener to server:', wsUrl);

    let ws: WebSocket;
    try {
      ws = new WebSocket(wsUrl);

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          console.log('Received Synced Backend Event:', payload.type);

          if (payload.type === 'init') {
            setInventory(payload.data.inventory);
            setLedger(payload.data.ledger);
            setReviews(payload.data.reviews);
          } else if (payload.type === 'inventory_updated') {
            setInventory(payload.data);
            triggerHapticFeedback();
          } else if (payload.type === 'ledger_updated') {
            setLedger(payload.data);
            triggerHapticFeedback();
          } else if (payload.type === 'reviews_updated') {
            setReviews(payload.data);
            triggerHapticFeedback();
          }
        } catch (e) {
          console.warn('Error rendering live sync payload:', e);
        }
      };

      ws.onopen = () => {
        console.log('InsightCart Real-time server stream online.');
      };

      ws.onerror = (err) => {
        console.log('WebSocket handshake fallback. Preserving offline data integrity.');
      };
    } catch (e) {
      console.warn('Real-time sync socket inactive in local sandbox layer.');
    }

    return () => {
      if (ws) ws.close();
    };
  }, [connection]);

  // Save states to local storage
  useEffect(() => {
    localStorage.setItem('ic_connection', connection);
    localStorage.setItem('ic_inventory', JSON.stringify(inventory));
    localStorage.setItem('ic_ledger', JSON.stringify(ledger));
    localStorage.setItem('ic_sync_queue', JSON.stringify(syncQueue));
    localStorage.setItem('ic_profile_steps', JSON.stringify(profileSteps));
    localStorage.setItem('ic_family_config', JSON.stringify(familyConfig));
    localStorage.setItem('ic_edit_count', editCount.toString());
    localStorage.setItem('ic_reviews', JSON.stringify(reviews));
    localStorage.setItem('ic_audit_log', JSON.stringify(auditLog));
    localStorage.setItem('ic_subscribed', hasSubscription ? 'true' : 'false');
  }, [connection, inventory, ledger, syncQueue, profileSteps, familyConfig, editCount, reviews, auditLog, hasSubscription]);

  // Gamification triggers: completion percentages calculate automatically
  useEffect(() => {
    // Step 3 completeness check (Modifications count reaches 5)
    if (editCount >= 5) {
      updateProfileStep('step_3', true);
    }
    // Step 4 completeness check (UPI QR seen)
    if (merchantTab === 'qr' || buyerTab === 'ledger') {
      updateProfileStep('step_4', true);
    }
    // Step 5 completeness check (Family interaction made)
    if (buyerTab === 'ledger' || ledger.length > INITIAL_LEDGER.length) {
      updateProfileStep('step_5', true);
    }
  }, [editCount, merchantTab, buyerTab, ledger.length]);

  const updateProfileStep = (id: string, completed: boolean) => {
    setProfileSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, completed } : step))
    );
  };

  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 30, 80]);
    }
  };

  const getProfileCompletedCount = () => {
    return profileSteps.filter((st) => st.completed).length;
  };

  const profilePercent = Math.round((getProfileCompletedCount() / profileSteps.length) * 100);

  // Handlers to Push updates to backend socket or fallback to fetch
  const pushLocalUpdateToServer = (type: string, data: any) => {
    if (connection === 'online') {
      try {
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${wsProtocol}//${window.location.host}`);
        ws.onopen = () => {
          ws.send(JSON.stringify({ type, data }));
          setTimeout(() => ws.close(), 120);
        };
      } catch (e) {
        console.warn('Websocket transmission failed; falling back to memory sync.', e);
      }
    }
  };

  // Connection Simulator
  const handleToggleConnection = () => {
    if (connection === 'online') {
      setConnection('offline');
    } else {
      setConnection('online');
      triggerCloudSync(); // Auto sync queued verbal inputs on restoration
    }
  };

  // Automated synchronization flow
  const triggerCloudSync = () => {
    if (syncQueue.length === 0) return;
    setIsSyncing(true);

    // Call server POST endpoint to sync commands offline
    fetch('/api/inventory/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commands: syncQueue }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setInventory(data.synced);
          setEditCount(prev => prev + syncQueue.length);
          setSyncQueue([]);
        }
        setIsSyncing(false);
        speakSentence('Internet Restored. Sync completed successfully.');
      })
      .catch(() => {
        // Fallback offline merge if endpoint offline
        setTimeout(() => {
          let updatedInventory = [...inventory];
          let updatedEditCount = editCount;

          syncQueue.forEach((q) => {
            const lowerCmd = q.command.toLowerCase();
            let targetItemName = '';
            if (lowerCmd.includes('sugar')) targetItemName = 'Refined White Sugar';
            else if (lowerCmd.includes('rice')) targetItemName = 'Premium Basmati Rice';
            else if (lowerCmd.includes('salt')) targetItemName = 'Iodized Tata Salt';
            else if (lowerCmd.includes('atta') || lowerCmd.includes('flour')) targetItemName = 'Aashirvaad Shudh Chakki Atta';
            else if (lowerCmd.includes('tea')) targetItemName = 'Tata Tea Premium 1kg';
            else if (lowerCmd.includes('butter')) targetItemName = 'Amul Butter 500g';
            else if (lowerCmd.includes('mustard') || lowerCmd.includes('oil')) targetItemName = 'Mustard Oil (Kachi Ghani) 1L';

            const numMatches = lowerCmd.match(/\d+/);
            const parsedVal = numMatches ? parseInt(numMatches[0]) : 40;
            const isQuantity = lowerCmd.includes('quantity') || lowerCmd.includes('kg') || lowerCmd.includes('stock');

            if (targetItemName) {
              updatedInventory = updatedInventory.map((item) => {
                if (item.name === targetItemName) {
                  updatedEditCount += 1;
                  return {
                    ...item,
                    price: !isQuantity ? parsedVal : item.price,
                    quantity: isQuantity ? parsedVal : item.quantity,
                    lastUpdated: new Date().toISOString(),
                  };
                }
                return item;
              });
            }
          });

          setInventory(updatedInventory);
          setEditCount(updatedEditCount);
          setSyncQueue([]);
          setIsSyncing(false);
          speakSentence('Offline updates merged securely.');
        }, 1200);
      });
  };

  // Voice Speech Synthesis Helper
  const speakSentence = (text: string) => {
    if ('speechSynthesis' in window && !whisperMode) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Voice updates confirm handler
  const handleConfirmInventoryUpdate = (itemName: string, field: 'price' | 'quantity', value: number) => {
    const target = inventory.find(it => it.name.toLowerCase().includes(itemName.toLowerCase()) || it.category.toLowerCase() === itemName.toLowerCase());
    if (target) {
      const updatedItem = { ...target, [field]: value };
      setInventory((prev) => prev.map((it) => (it.id === target.id ? updatedItem : it)));
      setEditCount((count) => count + 1);
      pushLocalUpdateToServer('update_product', updatedItem);
    }
  };

  // Add items directly to voice queue when offline
  const handleAddQueueItem = (command: string) => {
    const newItem: SyncQueueItem = {
      id: `CMD-${Math.floor(1000 + Math.random() * 9000)}`,
      command,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    setSyncQueue((prev) => [...prev, newItem]);
  };

  // Quick Barcode Scanning simulator implementation
  const handleBarcodeScan = (code: string) => {
    if (!code.trim()) return;

    // Matches simple code inputs (e.g., "89010", "12345")
    let matchedName = 'Refined White Sugar';
    if (code.includes('890') || code.includes('oil')) matchedName = 'Mustard Oil (Kachi Ghani) 1L';
    else if (code.includes('777') || code.includes('tea')) matchedName = 'Tata Tea Premium 1kg';
    else if (code.includes('555') || code.includes('butter')) matchedName = 'Amul Butter 500g';

    // Lookup existing item
    const existing = inventory.find(item => item.name === matchedName);
    
    // Default to existing price if available, otherwise use simulatedVoicePrice or 45
    const parsedPrice = existing ? existing.price : (parseInt(simulatedVoicePrice) || 45);

    if (existing) {
      const updatedProduct = {
        ...existing,
        price: parsedPrice,
        quantity: existing.quantity + 20, // Add 20kg bulk stock to item
        lastUpdated: new Date().toISOString()
      };
      setInventory(prev => prev.map(item => item.id === existing.id ? updatedProduct : item));
      setEditCount(count => count + 1);
      pushLocalUpdateToServer('update_product', updatedProduct);

      setBarcodeNotification(`Barcode [${code}] verified! Boosted 20 bags of "${matchedName}" at rate ₹${parsedPrice}.`);
      speakSentence(`Barcode scanned. Confirmed ${matchedName} stock addition.`);

      // Shake frame for haptic confirmation
      triggerHapticFeedback();
    } else {
      // Add as new
      const newItem: InventoryItem = {
        id: `INV-${Date.now()}`,
        name: `Barcode Scan Product (${code})`,
        price: parsedPrice,
        quantity: 30,
        category: 'Grains',
        lastUpdated: new Date().toISOString()
      };
      setInventory(prev => [newItem, ...prev]);
      setEditCount(count => count + 1);
      pushLocalUpdateToServer('add_product', newItem);
      setBarcodeNotification(`Scanned code unregistered. Saved draft "${newItem.name}" at ₹${parsedPrice}.`);
    }

    setBarcodeInput('');
    setSimulatedVoicePrice('');
    setTimeout(() => setBarcodeNotification(''), 4500);
  };

  const handleBarcodeSubmitSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    handleBarcodeScan(barcodeInput);
  };

  // Inventory operations
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pVal = parseFloat(newProduct.price);
    const qVal = parseFloat(newProduct.quantity);

    if (!newProduct.name || isNaN(pVal) || isNaN(qVal)) return;

    const added: InventoryItem = {
      id: `INV-${Date.now()}`,
      name: newProduct.name,
      nativeName: newProduct.nativeName || undefined,
      price: pVal,
      quantity: qVal,
      category: newProduct.category,
      lastUpdated: new Date().toISOString(),
    };

    setInventory((prev) => [added, ...prev]);
    setEditCount((prev) => prev + 1);
    pushLocalUpdateToServer('add_product', added);
    setShowAddProduct(false);
    setNewProduct({ name: '', nativeName: '', price: '', quantity: '', category: 'Grains' });
  };

  const handleDeleteProduct = (id: string) => {
    setInventory((prev) => prev.filter((it) => it.id !== id));
    pushLocalUpdateToServer('delete_product', id);
  };

  const handleUpdatePrice = (id: string, price: number) => {
    const item = inventory.find(it => it.id === id);
    if (item) {
      const updated = { ...item, price, lastUpdated: new Date().toISOString() };
      setInventory((prev) => prev.map((it) => (it.id === id ? updated : it)));
      setEditCount((count) => count + 1);
      pushLocalUpdateToServer('update_product', updated);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const item = inventory.find(it => it.id === id);
    if (item) {
      const updated = { ...item, quantity, lastUpdated: new Date().toISOString() };
      setInventory((prev) => prev.map((it) => (it.id === id ? updated : it)));
      setEditCount((count) => count + 1);
      pushLocalUpdateToServer('update_product', updated);
    }
  };

  // Family Ledger actions
  const handleUpdateRole = (role: Role) => {
    setFamilyConfig((prev) => ({
      ...prev,
      role,
      currentUser: role === 'parent' ? 'Rajiv (Parent)' : 'Aarav (Child)',
    }));
  };

  const handleUpdateLimit = (limit: number) => {
    setFamilyConfig((prev) => ({ ...prev, spendingLimit: limit }));
    logSecurityAudit('adjust_limit', `Adjusted monthly family limit to ₹${limit.toLocaleString('en-IN')}`);
  };

  const handleApproveItem = (id: string) => {
    const item = ledger.find(it => it.id === id);
    if (item) {
      const updatedLedgerItem = {
        ...item,
        status: 'approved' as const,
        approvedBy: familyConfig.currentUser,
        approvedAt: new Date().toISOString()
      };
      setLedger((prev) => prev.map((it) => (it.id === id ? updatedLedgerItem : it)));
      logSecurityAudit('approve', `Approved item: "${item.description}" for ₹${item.amount}`);
      pushLocalUpdateToServer('update_ledger', updatedLedgerItem);
    }
  };

  const handleRejectItem = (id: string) => {
    const item = ledger.find(it => it.id === id);
    if (item) {
      const updatedLedgerItem = { ...item, status: 'rejected' as const };
      setLedger((prev) => prev.map((it) => (it.id === id ? updatedLedgerItem : it)));
      logSecurityAudit('reject', `Rejected item: "${item.description}"`);
      pushLocalUpdateToServer('update_ledger', updatedLedgerItem);
    }
  };

  const handleCreateLedgerItem = (description: string, amount: number, category: string) => {
    const newItem: LedgerItem = {
      id: `L-${Date.now()}`,
      description,
      amount,
      requestedBy: familyConfig.currentUser,
      requestedAt: new Date().toISOString(),
      category,
      status: familyConfig.role === 'parent' ? 'approved' : 'pending',
      approvedBy: familyConfig.role === 'parent' ? familyConfig.currentUser : undefined,
      approvedAt: familyConfig.role === 'parent' ? new Date().toISOString() : undefined,
    };
    setLedger((prev) => [newItem, ...prev]);
    logSecurityAudit('create', `Logged request "${description}" for ₹${amount}`);
    pushLocalUpdateToServer('add_ledger', newItem);
  };

  // Log Security adjustments with digital audit hashes
  const logSecurityAudit = (action: 'create' | 'approve' | 'reject' | 'adjust_limit', details: string) => {
    const randomHex = Math.random().toString(16).substring(2, 8);
    const newLog: SecurityAuditToken = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      actor: familyConfig.currentUser,
      action,
      details,
      fingerprint: `sha256-${randomHex}${Date.now().toString().slice(-4)}`
    };
    setAuditLog(prev => [newLog, ...prev]);
  };

  // Rating & review posting
  const handlePostReview = (rating: number, text: string) => {
    const newRev: ReviewItem = {
      id: `R-${Date.now()}`,
      rating,
      author: familyConfig.role === 'parent' ? 'Rajiv (Parent)' : 'Aarav (Son)',
      text,
      verified: true,
      date: new Date().toISOString()
    };
    setReviews(prev => [newRev, ...prev]);
    pushLocalUpdateToServer('add_review', newRev);
    speakSentence('Review successfully logged. Thank you!');
  };

  const handlePostResponse = (reviewId: string, response: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, response } : r));
    pushLocalUpdateToServer('respond_review', { id: reviewId, response });
    speakSentence('Response published to verified buyer.');
  };

  const categories = ['All', 'Grains', 'Sweeteners', 'Spices', 'Flours', 'Dairy', 'Beverages', 'Oils'];

  // FILTER PRODUCTS IN INVENTORY TAB
  const filteredProducts = inventory.filter((it) => {
    const matchSearch =
      it.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (it.nativeName && it.nativeName.includes(searchQuery));
    const matchCat = selectedCategory === 'All' || it.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // Calculate dynamic responsive frame wrapper classes
  let deviceFrameStyles = {};
  let frameBorderClasses = 'w-full';
  if (selectedDevice === 'mobile_portrait') {
    deviceFrameStyles = { width: '390px', height: '820px', borderRadius: '40px' };
    frameBorderClasses = 'border-8 border-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] mx-auto overflow-y-auto bg-white/95 backdrop-blur-xl max-h-[820px]';
  } else if (selectedDevice === 'mobile_landscape') {
    deviceFrameStyles = { width: '840px', height: '420px', borderRadius: '40px' };
    frameBorderClasses = 'border-8 border-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] mx-auto overflow-y-auto bg-white/95 backdrop-blur-xl max-h-[420px]';
  } else if (selectedDevice === 'laptop') {
    deviceFrameStyles = { maxWidth: '1150px' };
    frameBorderClasses = 'border-4 border-slate-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] mx-auto rounded-2xl bg-white/85 backdrop-blur-2xl';
  } else if (selectedDevice === 'smartboard') {
    deviceFrameStyles = { maxWidth: '1680px' };
    frameBorderClasses = 'border-6 border-slate-950 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] mx-auto rounded-3xl bg-neutral-900/95 backdrop-blur-3xl text-slate-100 font-bold p-2.5';
  }

  if (showLandingPage) {
    return <LandingPage onEnterApp={() => setShowLandingPage(false)} language={appLanguage} />;
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans relative ${
      selectedDevice === 'smartboard' ? 'bg-neutral-950 text-slate-200' : ''
    }`} style={{ filter: appTheme === 'dark' ? 'invert(0.92) hue-rotate(180deg)' : 'none' }}>
      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} language={appLanguage} setLanguage={setAppLanguage} theme={appTheme} setTheme={setAppTheme} />
        )}
      </AnimatePresence>
      
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-emerald-300/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-amber-300/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-70"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-teal-200/40 rounded-full mix-blend-multiply filter blur-[150px] opacity-60"
        />
      </div>

      {/* PERSISTENT MULTI-DEVICE SIMULATION & PERSONA SELECTOR TOP RULER (Top of Page) */}
      <div className="bg-white/80 backdrop-blur-md text-slate-800 border-b border-white/40 shadow-[0_1px_3px_rgba(0,0,0,0.02)] z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Logo & Pin Bridge layout */}
          <div 
            onClick={() => setShowLandingPage(true)}
            className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-transform cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl flex items-center justify-center text-white font-extrabold relative shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-lg font-display drop-shadow-md">ic</span>
              <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[9px] text-amber-950 font-black shadow-sm">
                📍
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-emerald-800 font-extrabold text-[9px] uppercase tracking-wider leading-none bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                  INSIGHTCART INC.
                </span>
                <span className="font-mono text-[8px] bg-slate-100 text-slate-500 border border-slate-200 rounded px-1">v1.4</span>
              </div>
              <h1 className="text-[17px] font-display font-black tracking-tight text-slate-900 leading-none">
                InsightCart <span className="text-xs font-semibold text-slate-500">Local Shop</span>
              </h1>
            </div>
          </div>

          {/* ACTIVE DEVICE SELECTION SCREEN RATIOS */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-1.5 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" /> Screen Ratios Tester:
            </span>
            <div className="inline-flex bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setSelectedDevice('universal')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                  selectedDevice === 'universal' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Monitor className="w-3 h-3" /> Universal Screen
              </button>
              <button
                onClick={() => setSelectedDevice('laptop')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                  selectedDevice === 'laptop' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Laptop
              </button>
              <button
                onClick={() => setSelectedDevice('smartboard')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                  selectedDevice === 'smartboard' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Tv className="w-3 h-3" /> Smartboard
              </button>
              <button
                onClick={() => setSelectedDevice('mobile_portrait')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                  selectedDevice === 'mobile_portrait' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Portrait Phone
              </button>
              <button
                onClick={() => setSelectedDevice('mobile_landscape')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all ${
                  selectedDevice === 'mobile_landscape' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Landscape Phone
              </button>
            </div>
          </div>

          {/* CORE SYSTEM PERSONA SWITCHER */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-500">View Persona:</span>
            <div className="inline-flex bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-sm">
              <button
                onClick={() => {
                  setPersona('merchant');
                  triggerHapticFeedback();
                }}
                className={`px-3 py-1.5 rounded-lg text-[10.5px] font-black transition-all ${
                  persona === 'merchant' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.merchantMode}
              </button>
              <button
                onClick={() => {
                  setPersona('buyer');
                  triggerHapticFeedback();
                }}
                className={`px-3 py-1.5 rounded-lg text-[10.5px] font-black transition-all ${
                  persona === 'buyer' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.buyerMode}
              </button>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 ml-1 bg-white text-slate-600 hover:text-emerald-600 border border-slate-200 rounded-xl shadow-sm transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* DYNAMIC RATIO SIMULATOR OUTER CONTAINER */}
      <div className="flex-1 p-2.5 sm:p-5 flex items-center justify-center w-full">
        <div
          style={deviceFrameStyles}
          className={`${frameBorderClasses} transition-all duration-300 w-full flex flex-col h-full max-w-7xl overflow-hidden`}
        >
          
          {/* INSIDE MOCK DEVICE APP CANVAS */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              {/* Profile setup completion badge */}
              <div className="flex items-center gap-3">
                <div className="p-2 ml-[2px] rounded-xl bg-emerald-600 text-white shadow-xs text-center flex items-center justify-center">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-base font-display font-bold text-slate-900 leading-none">
                      {persona === 'merchant' ? "Rajiv's Kirana" : "Sharma Household Feed"}
                    </h2>
                    <span className="bg-slate-100 text-[9px] font-bold tracking-wider rounded-full px-2 py-0.5 text-slate-500 uppercase">
                      {connection === 'online' ? 'Online Sync' : 'Offline Cache'}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    {persona === 'merchant' ? 'Proximity Geo-Hash: Opp. Village School' : 'Role-based family budget access control'}
                  </p>
                </div>
              </div>

              {/* Status and Whisper Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                
                {/* Whisper Mode Button */}
                {persona === 'merchant' && (
                  <button
                    onClick={() => {
                      setWhisperMode(!whisperMode);
                      triggerHapticFeedback();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      whisperMode ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Whisper Mode for crowded, high-noise markets hides sound readout confirmations"
                  >
                    {whisperMode ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                    <span className="text-[10.5px]">{whisperMode ? 'Whisper (Quiet)' : 'Voice Audio Read'}</span>
                  </button>
                )}

                {/* Connection switch */}
                <button
                  onClick={handleToggleConnection}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    connection === 'online'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-150 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {connection === 'online' ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                  <span className="text-[11px] font-extrabold uppercase">{connection === 'online' ? 'Online' : 'Offline'}</span>
                </button>
              </div>

            </div>
          </header>

          {/* SYSTEM OFFLINE BANNER */}
          {connection === 'offline' && (
            <div className="bg-amber-500 text-white font-bold text-xs py-2 px-4 shadow-inner flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Off-grid Database (IndexedDB-Safe). Synchronizes changes upon reconnection.
            </div>
          )}

          {/* MAIN PAGE CANVAS VIEW (Scrollable inside Phone limits) */}
          <div className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-6">
            
            {/* PERSONA 1: MERCHANT CONTAINER */}
            {persona === 'merchant' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                
                {/* Aesthetic Hero Banner */}
                <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-sm group">
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
                    alt="Fresh Local Produce" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-display font-black text-xl tracking-tight">{t.morning}</h3>
                    <p className="text-xs text-slate-200 font-medium">{t.visible}</p>
                  </div>
                </div>

                {/* Onboarding progress with micro bounce checks */}
                <OnboardingProgressBar steps={profileSteps} onToggleStep={(id) => updateProfileStep(id, !profileSteps.find(st => st.id === id)?.completed)} language={appLanguage} />

                {/* Secondary Pulse trending monitor widget */}
                <PulseCard trends={demandTrends} onTrendSelect={(kw) => setSearchQuery(kw)} language={appLanguage} />

                {/* Merchant Menu */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 flex-wrap">
                  <button
                    onClick={() => setMerchantTab('inventory')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                      merchantTab === 'inventory' ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" /> {t.stockTab}
                  </button>
                  <button
                    onClick={() => setMerchantTab('voice')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                      merchantTab === 'voice' ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.voiceTab}
                  </button>
                  <button
                    onClick={() => setMerchantTab('qr')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                      merchantTab === 'qr' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.qrTab}
                  </button>
                  <button
                    onClick={() => setMerchantTab('boost')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                      merchantTab === 'boost' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                    }`}
                  >
                    {t.boostTab}
                  </button>
                </div>

                {/* TAB 1.1: MERCHANT STOCK AND PRICE SLIDERS */}
                {merchantTab === 'inventory' && (
                  <div className="space-y-6">
                    
                    {/* Barcode entries & quick sliders block */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Barcode visual input and scanner simulation */}
                      <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-150 space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                          <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                            <Barcode className="w-4 h-4" />
                          </span>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-800">
                              Barcode Scanner
                            </h4>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Quickly scan product barcodes to restock</span>
                          </div>
                        </div>

                        {barcodeNotification && (
                          <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-emerald-150 animate-pulse">
                            <ShieldCheck className="w-4 h-4" /> {barcodeNotification}
                          </div>
                        )}

                        <BarcodeScannerViewer onScanComplete={handleBarcodeScan} />
                      </div>

                      {/* Shop Boost subscriptions */}
                      <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-150 flex flex-col justify-between relative overflow-hidden group">
                        
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                                <Zap className="w-4 h-4 animate-bounce" />
                              </span>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                                  Store Promos
                                </h4>
                                <span className="text-[10px] text-slate-400 block">Get more customers from your neighborhood</span>
                              </div>
                            </div>

                            <span className={`text-[9px] font-extrabold uppercase py-0.5 px-2 rounded-full ${
                              hasSubscription ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-150 text-slate-500'
                            }`}>
                              {hasSubscription ? '★ Active VIP Merchant' : 'DORMANT SUITE'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 mt-2.5">
                            Show your store to 5,000 households nearby. Put your daily discounts at the very top of buyer's apps so they visit you instead of the supermarket.
                          </p>

                          <div className="grid grid-cols-3 gap-3.5 my-3.5">
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                              <span className="text-[9px] text-slate-400 block font-bold">DISCOVERY LIST</span>
                              <strong className="text-slate-800 text-sm block mt-0.5">₹1,450/mo value</strong>
                              <span className="text-[8px] text-emerald-600 block mt-0.5">● Free for Rajiv</span>
                            </div>
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                              <span className="text-[9px] text-slate-400 block font-bold">GEOPATH RANK</span>
                              <strong className="text-slate-800 text-sm block mt-0.5">#1 in 2.5km</strong>
                              <span className="text-[8px] text-slate-500 block mt-0.5">Top of buyer feed</span>
                            </div>
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                              <span className="text-[9px] text-slate-400 block font-bold">DIGITAL BADGE</span>
                              <strong className="text-slate-800 text-sm block mt-0.5">Verifiable Key</strong>
                              <span className="text-[8px] text-slate-500 block mt-0.5">Trust guaranteed</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                          <span className="text-[10.5px] text-slate-600">
                            <strong>Status:</strong> VIP branding unlocks instant settlements sync.
                          </span>

                          <button
                            onClick={() => {
                              setHasSubscription(!hasSubscription);
                              triggerHapticFeedback();
                            }}
                            className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all ${
                              hasSubscription ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-emerald-600 text-white'
                            }`}
                          >
                            {hasSubscription ? 'Cancel Subscription Boost' : 'Activate 100% Free VIP Boost'}
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Core Stocks database table drawer */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-3">
                        <div className="space-y-1">
                          <h4 className="text-base font-display font-bold text-slate-800 flex items-center gap-1.5">
                            <Grid className="w-5 h-5 text-emerald-600" /> Stock rates & sliders grid
                          </h4>
                          <span className="text-xs text-slate-500 mt-1 block">Drag or tap rates to modify values instantly. Updates reflect live in buyer feeds.</span>
                        </div>
                        
                        <div className="flex gap-2 w-full sm:w-auto">
                          <div className="relative flex-1 sm:max-w-xs">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Filter grains/sugar/ताजा..."
                              className="w-full bg-slate-50 pl-9 pr-3 py-2 text-xs border border-slate-150 rounded-xl focus:outline-hidden focus:border-emerald-500"
                            />
                          </div>

                          <button
                            onClick={() => setShowAddProduct(!showAddProduct)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold px-4 py-2 shrink-0 flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Stock Item
                          </button>
                        </div>
                      </div>

                      {/* Add stock expand panel */}
                      {showAddProduct && (
                        <form onSubmit={handleAddProductSubmit} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Item Name (e.g. Flour)"
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                              className="bg-white border text-xs p-2 rounded focus:border-emerald-500"
                            />
                            <input
                              type="text"
                              placeholder="Hindi Translation (e.g. आटा)"
                              value={newProduct.nativeName}
                              onChange={(e) => setNewProduct({ ...newProduct, nativeName: e.target.value })}
                              className="bg-white border text-xs p-2 rounded focus:border-emerald-500"
                            />
                            <input
                              type="number"
                              required
                              placeholder="Price (₹)"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                              className="bg-white border text-xs p-2 rounded focus:border-emerald-500"
                            />
                            <select
                              value={newProduct.category}
                              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                              className="bg-white border text-xs p-2 rounded focus:border-emerald-500"
                            >
                              <option value="Grains">Grains Wholesales</option>
                              <option value="Dairy">Dairy Products</option>
                              <option value="Sweeteners">Sweeteners</option>
                            </select>
                          </div>
                          <button type="submit" className="px-5 py-1.5 bg-emerald-600 text-white rounded text-xs font-extrabold">
                            Save Item Draft
                          </button>
                        </form>
                      )}

                      {/* Stocks card lists */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((p) => (
                          <InventorySliderCard
                            key={p.id}
                            item={p}
                            onUpdatePrice={handleUpdatePrice}
                            onUpdateQuantity={handleUpdateQuantity}
                            onDelete={handleDeleteProduct}
                            language={appLanguage}
                          />
                        ))}
                      </div>

                    </div>

                  </div>
                )}

                {/* TAB 1.2: VOICE PANE */}
                {merchantTab === 'voice' && (
                  <VoicePanel
                    connection={connection}
                    syncQueue={syncQueue}
                    onAddQueueItem={handleAddQueueItem}
                    onConfirmInventoryUpdate={handleConfirmInventoryUpdate}
                    isVoiceActive={isVoiceActive}
                    setIsVoiceActive={setIsVoiceActive}
                  />
                )}

                {/* TAB 1.3: MERCHANT QR */}
                {merchantTab === 'qr' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-5">
                      <QrGenerator />
                    </div>
                    <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-150 space-y-4">
                      <h4 className="text-base font-display font-bold text-slate-800">
                        Unified BHIM QR Settlements
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        To encourage digital micro-transactions, our unified system generates static codes with rotating salt references directly matching UPI interoperability standards. Fraud attempts are validation-logged instantly.
                      </p>

                      <div className="p-4 rounded-xl bg-slate-50 space-y-2 text-xs border border-slate-100">
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Auto settlements:</span>
                          <strong className="text-slate-800">M-PESA / Paytm Gateway Corp</strong>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Account Address:</span>
                          <strong className="text-slate-800">rajiv.kirana@okaxis</strong>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Verification mode:</span>
                          <strong className="text-emerald-700">GPS Geo-fenced Clearance</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 1.4: BOOST PACKS */}
                {merchantTab === 'boost' && (
                  <BoostPacks />
                )}
              </motion.div>
            )}

            {/* PERSONA 2: BUYER CONTAINER */}
            {persona === 'buyer' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                
                {/* Aesthetic Hero Banner */}
                <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-sm group">
                  <img 
                    src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200" 
                    alt="Family Shopping Produce" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-display font-black text-xl tracking-tight">Fresh Local Deals</h3>
                    <p className="text-xs text-slate-200 font-medium">Discover trusted, high-quality groceries verified by your neighbors.</p>
                  </div>
                </div>

                {/* Secondary navigation bar for Buyers persona */}
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2">
                  <button
                    onClick={() => setBuyerTab('discovery')}
                    className={`pb-1 px-3 text-[11px] font-bold transition-all border-b-2 ${
                      buyerTab === 'discovery' ? 'border-emerald-600 text-emerald-800 font-extrabold' : 'border-transparent text-slate-450 hover:text-slate-800 text-slate-400'
                    }`}
                  >
                    {t.discoveryTab}
                  </button>
                  <button
                    onClick={() => setBuyerTab('ledger')}
                    className={`pb-1 px-3 text-[11px] font-bold transition-all border-b-2 ${
                      buyerTab === 'ledger' ? 'border-emerald-600 text-emerald-800 font-extrabold' : 'border-transparent text-slate-450 hover:text-slate-800 text-slate-400'
                    }`}
                  >
                    {t.ledgerTab}
                  </button>
                  <button
                    onClick={() => setBuyerTab('reviews')}
                    className={`pb-1 px-3 text-[11px] font-bold transition-all border-b-2 ${
                      buyerTab === 'reviews' ? 'border-emerald-600 text-emerald-800 font-extrabold' : 'border-transparent text-slate-450 hover:text-slate-800 text-slate-400'
                    }`}
                  >
                    {t.reviewTab}
                  </button>
                  <button
                    onClick={() => setBuyerTab('referral')}
                    className={`pb-1 px-3 text-[11px] font-bold transition-all border-b-2 ${
                      buyerTab === 'referral' ? 'border-emerald-600 text-emerald-800 font-extrabold' : 'border-transparent text-slate-450 hover:text-slate-800 text-slate-400'
                    }`}
                  >
                    {t.referTab}
                  </button>
                </div>

                {/* TAB 2.1: INTERACTIVE SHOP LOCAL DISCOVERY */}
                {buyerTab === 'discovery' && (
                  <LocalDiscovery
                    inventory={inventory}
                    trends={demandTrends}
                    onSelectItem={(item) => speakSentence(`Inspecting ${item.name}. Priced at ${item.price} rupees.`)}
                    onAddToCart={(item) => {
                      speakSentence(`Added ${item.name} to cart.`);
                      setIsCheckoutMode(true);
                      triggerHapticFeedback();
                    }}
                    language={appLanguage}
                  />
                )}

                {/* TAB 2.2: LEDGER AND APPROVAL GUARDIAN */}
                {buyerTab === 'ledger' && (
                  <BudgetGuardian
                    ledger={ledger}
                    config={familyConfig}
                    auditTrail={auditLog}
                    onUpdateLimit={handleUpdateLimit}
                    onUpdateRole={handleUpdateRole}
                    onApproveItem={handleApproveItem}
                    onRejectItem={handleRejectItem}
                    onAddItem={handleCreateLedgerItem}
                    language={appLanguage}
                  />
                )}

                {/* TAB 2.3: RATINGS AND COMPLAINTS PROCESSOR */}
                {buyerTab === 'reviews' && (
                  <ReviewSystem
                    reviews={reviews}
                    currentUser={familyConfig.currentUser}
                    isShopkeeper={familyConfig.role === 'parent'}
                    onPostReview={handlePostReview}
                    onPostResponse={handlePostResponse}
                  />
                )}

                {/* TAB 2.4: REFERRAL AND REWARDS */}
                {buyerTab === 'referral' && (
                  <ReferralSystem />
                )}

              </motion.div>
            )}

            {/* INTERACTIVE COMPREHENSIVE OUTSIDE BANNER FOR LANDING CLUTTER */}
            {isCheckoutMode && (
              <div className="p-4 bg-slate-900 border border-slate-800 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-xl">
                <div>
                  <span className="inline-block bg-emerald-500/15 text-emerald-400 text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-sm">
                    {t.checkoutBanner}
                  </span>
                  <h5 className="font-display font-black text-white mt-1">
                    {t.checkoutTitle}
                  </h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Hiding extraneous tabs for full merchant focus. Confirms instant delivery limits checks.
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIsCheckoutMode(false);
                      speakSentence('Sale cleared. Thank you for shopping local!');
                      logSecurityAudit('approve', 'Cleared local counter sale checkout transaction');
                      triggerHapticFeedback();
                    }}
                    className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 font-extrabold text-[11px] rounded-lg text-white"
                  >
                    Verify & Settle Cart ₹
                  </button>
                  <button
                    onClick={() => setIsCheckoutMode(false)}
                    className="py-1.5 px-3 text-[11px] font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* DYNAMIC ADAPTIVE PERSONA NAVIGATION TAB BAR */}
          {(!isCheckoutMode && !isVoiceActive) ? (
            <div className="bg-slate-900 text-slate-450 text-slate-400 py-2 px-4 shadow-xl border-t border-slate-800 flex items-center justify-between z-30 flex-wrap shrink-0">
              <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">
                Active Persona: {persona === 'merchant' ? 'RAJIV (Kirana Node)' : '👪 SHARMA HOUSEHOLD'}
              </span>

              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 font-bold px-2 py-0.5 rounded">
                ⚡ WS sync active with fallback memory cache
              </span>
            </div>
          ) : (
            <div className="bg-slate-950 text-white py-2.5 px-4 flex items-center justify-between text-[10px] uppercase font-mono border-t border-slate-900 z-30 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <strong>🛡️ Adaptive Focus Shield: Navigation Disabled</strong>
              </span>
              <button
                onClick={() => {
                  setIsCheckoutMode(false);
                  setIsVoiceActive(false);
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-1 px-3 rounded uppercase text-[9.5px]"
              >
                Restore View Navigation
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Global Application Footer */}
      <footer className="w-full max-w-7xl mx-auto py-6 px-4 text-center text-xs text-slate-500 font-medium">
        <p>InsightCart &copy; 2026. Empowering local economies.</p>
        <div className="mt-2 text-[10px]">
          By continuing to use this local application, you agree to the{' '}
          <button 
            onClick={() => setShowTerms(true)}
            className="text-emerald-600 hover:text-emerald-700 underline font-bold transition-colors"
          >
            Terms and Conditions
          </button>.
        </div>
      </footer>

      {/* Full Screen Modals */}
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} language={appLanguage} />}
    </div>
  );
}
