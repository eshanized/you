import React from 'react';
import { Calendar } from 'lucide-react';
import { ContributionDay } from '../../types/github';

interface ActivityGraphProps {
  data: ContributionDay[];
}

export function ActivityGraph({ data }: ActivityGraphProps) {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Create a map of date strings to contribution counts
  const contributionMap = new Map(
    data.map(day => [day.date, day])
  );

  // Generate all dates for the past year
  const allDates: ContributionDay[] = [];
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const contribution = contributionMap.get(dateStr);
    allDates.push(contribution || {
      date: dateStr,
      count: 0,
      level: 0
    });
  }

  // Group by weeks
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }

  const getColor = (level: 0 | 1 | 2 | 3 | 4) => {
    const colors = {
      0: 'bg-slate-800/50',
      1: 'bg-indigo-900/50',
      2: 'bg-indigo-700/50',
      3: 'bg-indigo-500/50',
      4: 'bg-indigo-400'
    };
    return colors[level];
  };

  return (
    <div className="glass-card p-6 w-full hover-glow">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-indigo-400" />
        <h3 className="text-lg font-semibold">Contribution Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-grid grid-cols-[repeat(53,1fr)] gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm ${getColor(day.level)} transition-colors duration-200 hover:ring-1 hover:ring-indigo-400/50`}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}