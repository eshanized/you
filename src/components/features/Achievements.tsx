import React from 'react';
import { Trophy, Star, GitFork, Code, Users } from 'lucide-react';
import { Achievement } from '../../types/github';
import { calculateAchievements } from '../../utils/achievementCalculator';
import { Repository } from '../../types/github';

interface AchievementsProps {
  repositories: Repository[];
  followers: number;
}

export function Achievements({ repositories, followers }: AchievementsProps) {
  const achievements = calculateAchievements(repositories, followers);

  return (
    <div className="glass-card p-6 w-full rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="text-yellow-400 w-8 h-8" />
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.name}
            className="glass p-5 rounded-lg hover-glow transition-transform transform hover:scale-105 hover:shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              {getAchievementIcon(achievement)}
              <div>
                <h3 className="font-semibold text-lg text-white">
                  {achievement.name}
                </h3>
                <p className="text-sm text-white">
                  {achievement.description}
                </p>
              </div>
            </div>
            <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${getProgressColor(achievement.level)} transition-all`}
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
            <p className="text-xs mt-2 text-right text-white">
              {achievement.progress}% completed
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getAchievementIcon(achievement: Achievement) {
  const iconProps = {
    size: 28,
    className: `${getIconColor(achievement.level)} w-7 h-7`,
  };

  switch (achievement.icon) {
    case 'star':
      return <Star {...iconProps} />;
    case 'fork':
      return <GitFork {...iconProps} />;
    case 'code':
      return <Code {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    default:
      return <Trophy {...iconProps} />;
  }
}

function getIconColor(level: Achievement['level']) {
  switch (level) {
    case 'bronze':
      return 'text-orange-400';
    case 'silver':
      return 'text-slate-300';
    case 'gold':
      return 'text-yellow-400';
    default:
      return 'text-slate-400';
  }
}

function getProgressColor(level: Achievement['level']) {
  switch (level) {
    case 'bronze':
      return 'bg-orange-400';
    case 'silver':
      return 'bg-slate-300';
    case 'gold':
      return 'bg-yellow-400';
    default:
      return 'bg-slate-200';
  }
}
