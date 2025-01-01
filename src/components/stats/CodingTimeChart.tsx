import React from 'react';
import { TimeStats } from '../../types/github';
import { Clock } from 'lucide-react';

interface CodingTimeChartProps {
  stats: TimeStats;
}

export function CodingTimeChart({ stats }: CodingTimeChartProps) {
  const timeSlots = [
    { label: 'Morning (6-12)', value: stats.morning },
    { label: 'Afternoon (12-18)', value: stats.afternoon },
    { label: 'Evening (18-24)', value: stats.evening },
    { label: 'Night (0-6)', value: stats.night }
  ];

  const maxValue = Math.max(...timeSlots.map(slot => slot.value));

  return (
    <div className="glass-card p-6 hover-glow">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="text-indigo-400" />
        <h3 className="text-lg font-semibold">Coding Time Distribution</h3>
      </div>
      <div className="space-y-4">
        {timeSlots.map(slot => (
          <div key={slot.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">{slot.label}</span>
              <span className="text-indigo-400">
                {((slot.value / stats.total) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill bg-indigo-500"
                style={{
                  width: `${(slot.value / maxValue) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}