import React from 'react';
import { Clock } from 'lucide-react';

interface RateLimitInfoProps {
  remaining: number;
  limit: number;
  reset: number;
}

export function RateLimitInfo({ remaining, limit, reset }: RateLimitInfoProps) {
  const resetTime = new Date(reset * 1000).toLocaleTimeString();
  
  return (
    <div className="w-full max-w-2xl mt-2">
      <div className="glass px-4 py-2 rounded-lg text-sm text-slate-400 flex items-center gap-2">
        <Clock size={14} />
        <span>
          API Rate Limit: {remaining}/{limit} requests remaining
        </span>
        <span className="text-slate-500">•</span>
        <span>Resets at {resetTime}</span>
      </div>
    </div>
  );
}