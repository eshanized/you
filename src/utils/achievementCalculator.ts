import { Repository, Achievement } from '../types/github';

export function calculateAchievements(repositories: Repository[], followers: number): Achievement[] {
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);

  return [
    {
      name: 'Star Collector',
      description: `Earned ${totalStars} stars across repositories`,
      icon: 'star',
      level: getStarLevel(totalStars),
      progress: calculateProgress(totalStars, getStarThreshold(totalStars))
    },
    {
      name: 'Community Builder',
      description: `Projects forked ${totalForks} times`,
      icon: 'fork',
      level: getForkLevel(totalForks),
      progress: calculateProgress(totalForks, getForkThreshold(totalForks))
    },
    {
      name: 'Popular Developer',
      description: `Followed by ${followers} developers`,
      icon: 'users',
      level: getFollowerLevel(followers),
      progress: calculateProgress(followers, getFollowerThreshold(followers))
    }
  ];
}

function calculateProgress(value: number, threshold: number): number {
  return Math.min(100, (value / threshold) * 100);
}

function getStarLevel(stars: number): Achievement['level'] {
  if (stars >= 1000) return 'gold';
  if (stars >= 100) return 'silver';
  return 'bronze';
}

function getForkLevel(forks: number): Achievement['level'] {
  if (forks >= 500) return 'gold';
  if (forks >= 50) return 'silver';
  return 'bronze';
}

function getFollowerLevel(followers: number): Achievement['level'] {
  if (followers >= 1000) return 'gold';
  if (followers >= 100) return 'silver';
  return 'bronze';
}

function getStarThreshold(stars: number): number {
  if (stars >= 1000) return 5000;
  if (stars >= 100) return 1000;
  return 100;
}

function getForkThreshold(forks: number): number {
  if (forks >= 500) return 2000;
  if (forks >= 50) return 500;
  return 50;
}

function getFollowerThreshold(followers: number): number {
  if (followers >= 1000) return 5000;
  if (followers >= 100) return 1000;
  return 100;
}