import { ContributionDay } from '../../types/github';
import { fetchFromGitHub } from './api';

interface GitHubEvent {
  type: string;
  created_at: string;
}

export async function fetchContributions(username: string): Promise<ContributionDay[]> {
  try {
    // Fetch user's events using REST API
    const response = await fetchFromGitHub<GitHubEvent[]>(`/users/${username}/events/public`);
    if (response.error) throw new Error(response.error.message);
    
    const events = response.data!;
    const contributionMap = new Map<string, number>();
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Initialize all dates in the past year with 0 contributions
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      contributionMap.set(d.toISOString().split('T')[0], 0);
    }

    // Count contributions from events
    events.forEach(event => {
      const date = event.created_at.split('T')[0];
      if (contributionMap.has(date)) {
        contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
      }
    });

    // Convert to ContributionDay array
    return Array.from(contributionMap.entries())
      .map(([date, count]) => ({
        date,
        count,
        level: getContributionLevel(count)
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

  } catch (error) {
    console.error('Error fetching contributions:', error);
    return [];
  }
}

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}