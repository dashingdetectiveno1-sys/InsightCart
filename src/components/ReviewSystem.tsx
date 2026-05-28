/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { Star, MessageSquare, Reply, CheckCircle2, StarHalf, PlusCircle } from 'lucide-react';

interface ReviewSystemProps {
  reviews: ReviewItem[];
  currentUser: string;
  isShopkeeper: boolean;
  onPostReview: (rating: number, text: string) => void;
  onPostResponse: (reviewId: string, responseText: string) => void;
}

export default function ReviewSystem({
  reviews,
  currentUser,
  isShopkeeper,
  onPostReview,
  onPostResponse,
}: ReviewSystemProps) {
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [replyTextId, setReplyTextId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Math helper for averages
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? parseFloat((reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1))
    : 0;

  // Rating distribution counts
  const distribution = [0, 0, 0, 0, 0]; // Index 0 = 1 star, etc.
  reviews.forEach(r => {
    const idx = Math.min(Math.max(r.rating - 1, 0), 4);
    distribution[idx]++;
  });

  const handlePostReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    onPostReview(newRating, newText);
    setNewText('');
    setIsFormOpen(false);
  };

  const handlePostResponseSubmit = (reviewId: string) => {
    if (!replyInput.trim()) return;
    onPostResponse(reviewId, replyInput);
    setReplyInput('');
    setReplyTextId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-3">
        <div>
          <h4 className="text-base font-display font-black text-slate-800 flex items-center gap-1.5">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Verified Customer Reviews
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Only verified household purchases are cleared to contribute feedback to ensure anti-fraud reputation.
          </p>
        </div>
        {!isShopkeeper && (
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="text-xs font-bold bg-slate-900 border border-slate-200 text-white hover:bg-slate-800 py-1.5 px-3.5 rounded-xl transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Rate Shop
          </button>
        )}
      </div>

      {/* Aggregate Score Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-slate-100 items-center">
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl">
          <span className="text-4xl font-display font-black text-slate-900">{averageRating || 'N/A'}</span>
          <div className="flex items-center gap-0.5 text-amber-500 mt-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const starVal = i + 1;
              if (averageRating >= starVal) {
                return <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />;
              }
              if (averageRating > starVal - 1 && averageRating < starVal) {
                return <StarHalf key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />;
              }
              return <Star key={i} className="w-4 h-4 text-slate-300" />;
            })}
          </div>
          <span className="text-xs font-semibold text-slate-400 mt-2">{totalReviews} Verified Ratings</span>
        </div>

        {/* Rating Breakdown Bar lines */}
        <div className="md:col-span-8 space-y-2">
          {Array.from({ length: 5 }).map((_, offset) => {
            const stars = 5 - offset;
            const count = distribution[stars - 1] || 0;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs text-slate-600">
                <span className="w-3 font-mono font-bold text-right">{stars}</span>
                <Star className="w-3 h-3 text-slate-400 fill-slate-400 grow-0 shrink-0" />
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="w-6 font-mono font-medium text-slate-400 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Write a review expansion panel */}
      {isFormOpen && (
        <form onSubmit={handlePostReviewSubmit} className="my-5 p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
          <h5 className="text-xs font-extrabold uppercase text-slate-600 tracking-wider">
            Log New Verified Rating
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Select Stars:</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setNewRating(num)}
                  className={`p-1 rounded hover:scale-110 transition-transform ${
                    newRating >= num ? 'text-amber-500' : 'text-slate-300'
                  }`}
                >
                  <Star className={`w-6 h-6 ${newRating >= num ? 'fill-amber-500' : ''}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Provide written testimony</label>
            <textarea
              required
              rows={3}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="E.g., Stock was completely updated and ready for pickup. Great family ledger synchronization."
              className="w-full bg-white rounded-xl border border-slate-200 text-xs p-3 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-1.5 text-xs text-slate-500 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 text-xs bg-emerald-600 text-white rounded-xl font-bold shadow-xs hover:bg-emerald-700"
            >
              Post Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews Render Grid */}
      <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto pr-1">
        {reviews.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No reviews verified yet on this Kirana mode.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="py-5 first:pt-3 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-slate-800">{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-100/50">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                    {new Date(rev.date).toLocaleDateString()} at {new Date(rev.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex gap-0.5 text-amber-400 bg-amber-50/45 px-2 py-1 rounded-lg">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 italic">"{rev.text}"</p>

              {/* Response Block */}
              {rev.response ? (
                <div className="mx-4 my-2 p-3 rounded-xl bg-slate-50 border-l-4 border-emerald-500 space-y-1">
                  <div className="flex items-center gap-1">
                    <Reply className="w-3.5 h-3.5 text-emerald-600 shrink-0 transform scale-x-[-1]" />
                    <span className="text-[10px] uppercase font-extrabold text-emerald-800 tracking-wider">
                      Shopkeeper Response
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">"{rev.response}"</p>
                </div>
              ) : (
                isShopkeeper && replyTextId !== rev.id && (
                  <button
                    onClick={() => {
                      setReplyTextId(rev.id);
                      setReplyInput('');
                    }}
                    className="ml-4 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                  >
                    <Reply className="w-3 h-3 transform scale-x-[-1]" /> Respond to Shyam/Pooja
                  </button>
                )
              )}

              {/* Respond inline input (Only available for shopkeepers!) */}
              {isShopkeeper && replyTextId === rev.id && (
                <div className="ml-4 mt-2 p-3 bg-slate-50 rounded-xl space-y-2.5 border border-slate-150">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Draft response to {rev.author}
                  </span>
                  <input
                    type="text"
                    required
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="E.g., Thank you ji, your feedback is valuable..."
                    className="w-full bg-white rounded-lg border border-slate-200 text-xs p-2 focus:outline-hidden focus:border-emerald-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePostResponseSubmit(rev.id)}
                      className="px-4 py-1.5 bg-emerald-600 text-white font-bold text-[11px] rounded-lg hover:bg-emerald-700 shadow-xs transition-colors"
                    >
                      Publish Reply
                    </button>
                    <button
                      onClick={() => setReplyTextId(null)}
                      className="px-3 py-1.5 text-xs text-slate-500 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
