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
    <div className="glass-card p-6 w-full">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-400" />
        <h2 className="text-xl font-semibold">Achievements</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div key={achievement.name} className="glass p-4 rounded-lg hover-glow">
            <div className="flex items-center gap-3 mb-2">
              {getAchievementIcon(achievement)}
              <div>
                <h3 className="font-medium">{achievement.name}</h3>
                <p className="text-sm text-slate-400">{achievement.description}</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="progress-bar">
                <div
                  className={`progress-bar-fill ${getProgressColor(achievement.level)}`}
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getAchievementIcon(achievement: Achievement) {
  const iconProps = {
    size: 24,
    className: getIconColor(achievement.level),
  };

  switch (achievement.icon) {
    case 'star': return <Star {...iconProps} />;
    case 'fork': return <GitFork {...iconProps} />;
    case 'code': return <Code {...iconProps} />;
    case 'users': return <Users {...iconProps} />;
    default: return <Trophy {...iconProps} />;
  }
}

function getIconColor(level: Achievement['level']) {
  switch (level) {
    case 'bronze': return 'text-orange-400';
    case 'silver': return 'text-slate-300';
    case 'gold': return 'text-yellow-400';
  }
}

function getProgressColor(level: Achievement['level']) {
  switch (level) {
    case 'bronze': return 'bg-orange-400';
    case 'silver': return 'bg-slate-300';
    case 'gold': return 'bg-yellow-400';
  }
}