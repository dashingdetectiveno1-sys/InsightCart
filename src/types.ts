/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InventoryItem {
  id: string;
  name: string;
  nativeName?: string;
  price: number;
  quantity: number;
  category: string;
  lastUpdated: string;
  imageUrl?: string;
}

export interface SyncQueueItem {
  id: string;
  command: string;
  timestamp: string;
  status: 'pending' | 'synced' | 'failed';
  feedbackMessage?: string;
}

export interface LedgerItem {
  id: string;
  description: string;
  amount: number;
  requestedBy: string; // Name of the family member
  requestedAt: string;
  approvedBy?: string; // Approver name (if parent)
  approvedAt?: string;
  status: 'pending' | 'approved' | 'rejected';
  category: string;
}

export interface ProfileStep {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}

export type Role = 'parent' | 'child';

export interface FamilyConfig {
  spendingLimit: number;
  role: Role;
  currentUser: string;
}

// User rating and reviews tied to verified purchases
export interface ReviewItem {
  id: string;
  rating: number; // 1-5 scale
  author: string;
  text: string;
  response?: string; // Shopkeeper's reply
  verified: boolean;
  date: string;
}

// Popular items and trend metrics ("Pulse" card)
export interface DemandTrend {
  id: string;
  keyword: string;
  growth: string; // E.g., "+320% this week"
  searches: number; // Search count nearby
  interest: 'high' | 'medium' | 'moderate';
  category: string;
}

// Security Audit trail logging changes in Family Ledger entries
export interface SecurityAuditToken {
  id: string;
  timestamp: string;
  actor: string;
  action: 'create' | 'approve' | 'reject' | 'adjust_limit';
  details: string;
  fingerprint: string; // SHA-like validation token
}
