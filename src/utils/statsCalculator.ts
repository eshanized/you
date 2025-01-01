import { Repository, LanguageStats, TimeStats, Commit } from '../types/github';

export function calculateLanguageStats(repositories: Repository[]): LanguageStats[] {
  const stats = new Map<string, { size: number; color: string }>();
  let totalSize = 0;

  repositories.forEach(repo => {
    if (repo.language) {
      const current = stats.get(repo.language) || { size: 0, color: getLanguageColor(repo.language) };
      current.size += repo.size || 0;
      totalSize += repo.size || 0;
      stats.set(repo.language, current);
    }
  });

  return Array.from(stats.entries())
    .map(([language, { size, color }]) => ({
      language,
      size,
      color,
      percentage: (size / totalSize) * 100
    }))
    .sort((a, b) => b.size - a.size);
}

export function calculateTimeStats(commits: Commit[]): TimeStats {
  const stats = {
    morning: 0,   // 6-12
    afternoon: 0, // 12-18
    evening: 0,   // 18-24
    night: 0,     // 0-6
    total: 0
  };

  commits.forEach(commit => {
    const hour = new Date(commit.commit.author.date).getHours();
    
    if (hour >= 6 && hour < 12) stats.morning++;
    else if (hour >= 12 && hour < 18) stats.afternoon++;
    else if (hour >= 18 && hour < 24) stats.evening++;
    else stats.night++;
    
    stats.total++;
  });

  return stats;
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Vue: '#41b883',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB'
  };
  
  return colors[language] || '#6e7681';
}