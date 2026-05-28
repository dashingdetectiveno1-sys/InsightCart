/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InventoryItem, LedgerItem, ProfileStep, ReviewItem, DemandTrend, SecurityAuditToken } from './types';

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Premium Basmati Rice', nativeName: 'बासमती चावल', price: 110, quantity: 45, category: 'Grains', lastUpdated: '2026-05-28T04:20:00Z', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300' },
  { id: '2', name: 'Refined White Sugar', nativeName: 'चीनी', price: 42, quantity: 80, category: 'Sweeteners', lastUpdated: '2026-05-28T05:00:00Z', imageUrl: 'https://images.unsplash.com/photo-1581428982868-e410dd147a90?auto=format&fit=crop&q=80&w=300' },
  { id: '3', name: 'Iodized Tata Salt', nativeName: 'नमक', price: 24, quantity: 150, category: 'Spices', lastUpdated: '2026-05-28T01:30:00Z', imageUrl: 'https://images.unsplash.com/photo-1627484747065-9ba447781b49?auto=format&fit=crop&q=80&w=300' },
  { id: '4', name: 'Aashirvaad Shudh Chakki Atta', nativeName: 'आटा', price: 45, quantity: 60, category: 'Flours', lastUpdated: '2026-05-28T03:45:00Z', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300' },
  { id: '5', name: 'Pure Ghee 500g', nativeName: 'घी', price: 275, quantity: 20, category: 'Dairy', lastUpdated: '2026-05-28T05:12:00Z', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80&w=300' },
  { id: '6', name: 'Tata Tea Premium 1kg', nativeName: 'चाय पत्ती', price: 320, quantity: 35, category: 'Beverages', lastUpdated: '2026-05-28T02:10:00Z', imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=300' },
  { id: '7', name: 'Mustard Oil (Kachi Ghani) 1L', nativeName: 'सरसों का तेल', price: 175, quantity: 40, category: 'Oils', lastUpdated: '2026-05-28T05:08:00Z', imageUrl: 'https://images.unsplash.com/photo-1474128525656-78ceefaf5430?auto=format&fit=crop&q=80&w=300' }
];

export const INITIAL_LEDGER: LedgerItem[] = [
  { id: 'L1', description: 'Weekly Groceries & Oil Refill', amount: 1450, requestedBy: 'Aarav (Son)', requestedAt: '2026-05-27T10:00:00Z', approvedBy: 'Rajiv (Parent)', approvedAt: '2026-05-27T12:00:00Z', status: 'approved', category: 'Kitchen Essentials' },
  { id: 'L2', description: 'School Stationery & Geometry Box', amount: 350, requestedBy: 'Ananya (Daughter)', requestedAt: '2026-05-28T03:00:00Z', approvedBy: 'Rajiv (Parent)', approvedAt: '2026-05-28T04:30:00Z', status: 'approved', category: 'Education' },
  { id: 'L3', description: 'Amul Dairy Paneer & Ghee pack', amount: 820, requestedBy: 'Ananya (Daughter)', requestedAt: '2026-05-28T05:10:00Z', status: 'pending', category: 'Dairy Products' },
  { id: 'L4', description: 'Local Wholesale Wheat Sack (25kg)', amount: 1125, requestedBy: 'Aarav (Son)', requestedAt: '2026-05-28T05:45:00Z', status: 'pending', category: 'Grains Wholesale' }
];

export const PROFILE_STEPS: ProfileStep[] = [
  { id: 'step_1', label: 'Verify GSTIN Registration', description: 'Verify registration details for rural merchant scheme.', completed: true },
  { id: 'step_2', label: 'Proximity Delivery Limits', description: 'Set home-delivery coverage radius (e.g., 5km pin points).', completed: true },
  { id: 'step_3', label: 'Audit 5 Core Stock Items', description: 'Log weights, stock levels, and local descriptions.', completed: false },
  { id: 'step_4', label: 'Dynamic QR Settlement code', description: 'Connect BHIM UPI addressing payload.', completed: false },
  { id: 'step_5', label: 'Secure Family Ledger Link', description: 'Establish ledger approvals for household members.', completed: false }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  { id: 'r1', rating: 5, author: 'Shyam Sundar', text: 'Fresh Chakki Atta and prompt support! Great to verify stock instantly through PWA.', response: 'Dhanyawad Shyam ji, our stock refreshes daily!', verified: true, date: '2026-05-28T01:10:00Z' },
  { id: 'r2', rating: 4, author: 'Pooja Sharma', text: 'Sugar prices are identical to wholesale, but delivery was delayed by 15 mins.', verified: true, date: '2026-05-28T03:05:00Z' },
  { id: 'r3', rating: 3, author: 'Ramesh Singh', text: 'Fair prices, but wish Mustard Oil had 2 liter packs in stock.', response: 'Yes Ramesh ji, importing larger packs soon!', verified: false, date: '2026-05-28T05:22:00Z' }
];

export const DEMAND_TRENDS: DemandTrend[] = [
  { id: 'trend_1', keyword: 'Mustard Oil Refill', growth: '+340% demand spike', searches: 240, interest: 'high', category: 'Oils' },
  { id: 'trend_2', keyword: 'Amul Ghee Packets', growth: '+180% local searches', searches: 135, interest: 'high', category: 'Dairy' },
  { id: 'trend_3', keyword: 'Premium Atta Sack (25k)', growth: '+85% high volume', searches: 92, interest: 'medium', category: 'Flours' },
  { id: 'trend_4', keyword: 'White Sugar (Bulk)', growth: '+12% steady rate', searches: 48, interest: 'moderate', category: 'Sweeteners' }
];

export const INITIAL_AUDIT_LOG: SecurityAuditToken[] = [
  { id: 'tx-2401', timestamp: '2026-05-27T12:00:00Z', actor: 'Rajiv (Parent)', action: 'approve', details: 'Approved request: Weekly Groceries for ₹1,450', fingerprint: 'sha256-a94f8e3c121e90' },
  { id: 'tx-2402', timestamp: '2026-05-28T04:30:00Z', actor: 'Rajiv (Parent)', action: 'approve', details: 'Approved request: School Stationery for ₹350', fingerprint: 'sha256-b08e7c10d48fef' },
  { id: 'tx-2403', timestamp: '2026-05-28T05:45:00Z', actor: 'Aarav (Son)', action: 'create', details: 'Created pending item: Local Wholesale Wheat Sack for ₹1,125', fingerprint: 'sha256-df08a1c900fe831' }
];
