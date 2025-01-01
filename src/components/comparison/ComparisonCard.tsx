import React from 'react';
import { GitHubUser, Repository } from '../../types/github';
import { Star, GitFork, Code, X } from 'lucide-react';
import { calculateLanguageStats } from '../../utils/statsCalculator';

interface ComparisonCardProps {
  user: GitHubUser;
  repositories: Repository[];
  onRemove: () => void;
}

export function ComparisonCard({ user, repositories, onRemove }: ComparisonCardProps) {
  const stats = {
    stars: repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    forks: repositories.reduce((sum, repo) => sum + repo.forks_count, 0),
    languages: calculateLanguageStats(repositories).slice(0, 3)
  };

  return (
    <div className="glass-card p-6 relative group">
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 p-1 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
      >
        <X size={16} className="text-red-400" />
      </button>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-full ring-2 ring-slate-700/50"
        />
        <div>
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 text-sm"
          >
            @{user.login}
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="glass p-3 rounded-lg text-center">
            <div className="text-xl font-semibold">{repositories.length}</div>
            <div className="text-sm text-slate-400">Repositories</div>
          </div>
          <div className="glass p-3 rounded-lg text-center">
            <div className="text-xl font-semibold">{user.followers}</div>
            <div className="text-sm text-slate-400">Followers</div>
          </div>
          <div className="glass p-3 rounded-lg text-center">
            <div className="text-xl font-semibold">{stats.stars}</div>
            <div className="text-sm text-slate-400">Stars</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300">Top Languages</h4>
          <div className="flex flex-wrap gap-2">
            {stats.languages.map(lang => (
              <span
                key={lang.language}
                className="glass px-3 py-1 rounded-full text-sm flex items-center gap-1.5"
              >
                <Code size={14} style={{ color: lang.color }} />
                <span>{lang.language}</span>
                <span className="text-slate-400">
                  {lang.percentage.toFixed(1)}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}