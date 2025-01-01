import React from 'react';
import { Code } from 'lucide-react';
import { LanguageStats } from '../../types/github';
import { CopyMarkdownButton } from '../CopyMarkdownButton';
import { generateLanguageStatsMarkdown } from '../../utils/markdown';

interface LanguageGraphProps {
  ownedStats: LanguageStats[];
  contributedStats: LanguageStats[];
}

export function LanguageGraph({ ownedStats, contributedStats }: LanguageGraphProps) {
  return (
    <div className="glass-card p-6 hover-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Code className="text-indigo-400" />
          <h3 className="text-lg font-semibold">Programming Languages</h3>
        </div>
        <CopyMarkdownButton getMarkdown={() => generateLanguageStatsMarkdown(ownedStats)} />
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-4">Owned Repositories</h4>
          <div className="space-y-4">
            {ownedStats.slice(0, 5).map(({ language, percentage, color }) => (
              <div key={language}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">{language}</span>
                  <span className="text-indigo-400">{percentage.toFixed(1)}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-4">Contributed Repositories</h4>
          <div className="space-y-4">
            {contributedStats.length > 0 ? (
              contributedStats.slice(0, 5).map(({ language, percentage, color }) => (
                <div key={language}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">{language}</span>
                    <span className="text-indigo-400">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: color
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No contributed repositories found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}