import React from 'react';
import { LanguageGraph } from './LanguageGraph';
import { ActivityGraph } from './ActivityGraph';
import { CodingTimeChart } from './CodingTimeChart';
import { Repository, ContributionDay, Commit } from '../../types/github';
import { calculateLanguageStats, calculateTimeStats } from '../../utils/statsCalculator';

interface StatsContainerProps {
  repositories: Repository[];
  contributedRepositories: Repository[];
  contributionData: ContributionDay[];
  commits: Commit[];
}

export function StatsContainer({ 
  repositories, 
  contributedRepositories,
  contributionData, 
  commits 
}: StatsContainerProps) {
  const ownedLanguageStats = calculateLanguageStats(repositories);
  const contributedLanguageStats = calculateLanguageStats(contributedRepositories);
  const timeStats = calculateTimeStats(commits);

  return (
    <div className="max-w-2xl w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LanguageGraph 
          ownedStats={ownedLanguageStats} 
          contributedStats={contributedLanguageStats} 
        />
        <CodingTimeChart stats={timeStats} />
      </div>
      <ActivityGraph data={contributionData} />
    </div>
  );
}