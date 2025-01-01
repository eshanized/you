import React from 'react';
import { GitHubUser, Repository } from '../types/github';
import { calculateLanguageStats } from '../utils/statsCalculator';

interface UserStatsProps {
  user: GitHubUser;
  repositories: Repository[];
}

export function UserStats({ user, repositories }: UserStatsProps) {
  const languageStats = calculateLanguageStats(repositories);
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  return (
    <div className="glass p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <a href={user.html_url} className="text-sm text-blue-400 hover:text-blue-300">
            @{user.login}
          </a>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Repositories:</span>
          <span>{repositories.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total Stars:</span>
          <span>{totalStars}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Top Language:</span>
          <span>{languageStats[0]?.language || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}