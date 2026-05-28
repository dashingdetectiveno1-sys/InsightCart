/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import express from 'express';
import path from 'path';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Shared State (Persisted across client real-time sessions!)
let inventory = [
  { id: '1', name: 'Premium Basmati Rice', nativeName: 'बासमती चावल', price: 110, quantity: 45, category: 'Grains', lastUpdated: new Date().toISOString() },
  { id: '2', name: 'Refined White Sugar', nativeName: 'चीनी', price: 42, quantity: 80, category: 'Sweeteners', lastUpdated: new Date().toISOString() },
  { id: '3', name: 'Iodized Tata Salt', nativeName: 'नमक', price: 24, quantity: 150, category: 'Spices', lastUpdated: new Date().toISOString() },
  { id: '4', name: 'Aashirvaad Shudh Chakki Atta', nativeName: 'आटा', price: 45, quantity: 60, category: 'Flours', lastUpdated: new Date().toISOString() },
  { id: '5', name: 'Amul Butter 500g', nativeName: 'मक्खन', price: 275, quantity: 20, category: 'Dairy', lastUpdated: new Date().toISOString() },
  { id: '6', name: 'Tata Tea Premium 1kg', nativeName: 'चाय पत्ती', price: 320, quantity: 35, category: 'Beverages', lastUpdated: new Date().toISOString() },
  { id: '7', name: 'Mustard Oil (Kachi Ghani) 1L', nativeName: 'सरसों का तेल', price: 175, quantity: 40, category: 'Oils', lastUpdated: new Date().toISOString() }
];

let ledger = [
  { id: 'L1', description: 'Weekly Groceries & Oil Refill', amount: 1450, requestedBy: 'Aarav (Son)', requestedAt: '2026-05-27T10:00:00Z', approvedBy: 'Rajiv (Parent)', approvedAt: '2026-05-27T12:00:00Z', status: 'approved', category: 'Kitchen Essentials' },
  { id: 'L2', description: 'School Stationery & Geometry Box', amount: 350, requestedBy: 'Ananya (Daughter)', requestedAt: '2026-05-28T03:00:00Z', approvedBy: 'Rajiv (Parent)', approvedAt: '2026-05-28T04:30:00Z', status: 'approved', category: 'Education' },
  { id: 'L3', description: 'Amul Dairy Paneer & Ghee pack', amount: 820, requestedBy: 'Ananya (Daughter)', requestedAt: '2026-05-28T05:10:00Z', status: 'pending', category: 'Dairy Products' },
  { id: 'L4', description: 'Local Wholesale Wheat Sack (25kg)', amount: 1125, requestedBy: 'Aarav (Son)', requestedAt: '2026-05-28T05:45:00Z', status: 'pending', category: 'Grains Wholesale' }
];

let reviews = [
  { id: 'r1', rating: 5, author: 'Shyam Sundar', text: 'Excellent fresh basmati rice! The shopkeeper Rajiv is very polite.', response: 'Thank you Shyam ji, we appreciate your support!', verified: true, date: '2026-05-27T08:00:00Z' },
  { id: 'r2', rating: 4, author: 'Devendra Patel', text: 'Good quality grains, prices are wholesale rate.', response: '', verified: true, date: '2026-05-28T02:00:00Z' }
];

// WebSocket handling
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

// Handle upgrade manually to hook transparently alongside Vite development pipelines
server.on('upgrade', (request, socket, head) => {
  const pathname = new URL(request.url || '', `http://${request.headers.host}`).pathname;
  // Let Vite handle its HMR socket connection transparently
  if (pathname === '/@vite' || pathname.includes('vite')) {
    return;
  }
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

const clients = new Set<WebSocket>();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`WebSocket client connected. Total pool: ${clients.size}`);

  // Send initial load to new client
  ws.send(JSON.stringify({
    type: 'init',
    data: { inventory, ledger, reviews }
  }));

  ws.on('message', (message) => {
    try {
      const payload = JSON.parse(message.toString());
      console.log('Received WebSocket Action:', payload.type);

      if (payload.type === 'update_product') {
        const product = payload.data;
        inventory = inventory.map(item => item.id === product.id ? { ...item, ...product, lastUpdated: new Date().toISOString() } : item);
        broadcast({ type: 'inventory_updated', data: inventory });
      }

      if (payload.type === 'add_product') {
        const product = payload.data;
        product.id = `INV-${Date.now()}`;
        product.lastUpdated = new Date().toISOString();
        inventory.unshift(product);
        broadcast({ type: 'inventory_updated', data: inventory });
      }

      if (payload.type === 'delete_product') {
        const id = payload.data;
        inventory = inventory.filter(item => item.id !== id);
        broadcast({ type: 'inventory_updated', data: inventory });
      }

      if (payload.type === 'update_ledger') {
        const ledgerItem = payload.data;
        ledger = ledger.map(item => item.id === ledgerItem.id ? { ...item, ...ledgerItem } : item);
        broadcast({ type: 'ledger_updated', data: ledger });
      }

      if (payload.type === 'add_ledger') {
        const ledgerItem = payload.data;
        ledgerItem.id = `L-${Date.now()}`;
        ledgerItem.requestedAt = new Date().toISOString();
        ledger.unshift(ledgerItem);
        broadcast({ type: 'ledger_updated', data: ledger });
      }

      if (payload.type === 'add_review') {
        const review = payload.data;
        review.id = `R-${Date.now()}`;
        review.date = new Date().toISOString();
        reviews.unshift(review);
        broadcast({ type: 'reviews_updated', data: reviews });
      }

      if (payload.type === 'respond_review') {
        const { id, response } = payload.data;
        reviews = reviews.map(r => r.id === id ? { ...r, response } : r);
        broadcast({ type: 'reviews_updated', data: reviews });
      }
    } catch (err) {
      console.error('Error handling websocket payload:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('WebSocket client offline.');
  });
});

function broadcast(payload: any) {
  const serialized = JSON.stringify(payload);
  clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(serialized);
    }
  });
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Sync endpoint for offline queue syncs
app.post('/api/inventory/sync', (req, res) => {
  const { commands } = req.body;
  if (!Array.isArray(commands)) {
    return res.status(400).json({ error: 'commands array required' });
  }

  // Parse commands and simulate synching with current server inventory state
  commands.forEach((cmd: any) => {
    const lowerCmd = cmd.command.toLowerCase();
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
    const isQuantity = lowerCmd.includes('quantity') || lowerCmd.includes('kg') || lowerCmd.includes('stock') || lowerCmd.includes('units');

    if (targetItemName) {
      inventory = inventory.map(item => {
        if (item.name === targetItemName) {
          return {
            ...item,
            price: !isQuantity ? parsedVal : item.price,
            quantity: isQuantity ? parsedVal : item.quantity,
            lastUpdated: new Date().toISOString()
          };
        }
        return item;
      });
    }
  });

  broadcast({ type: 'inventory_updated', data: inventory });
  res.json({ success: true, count: commands.length, synced: inventory });
});

// Vite Middleware orchestration
async function mountViteMiddleware() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

mountViteMiddleware().then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`KinLocal / InsightCart host live on http://localhost:${PORT}`);
  });
});
