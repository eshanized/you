import { Repository, GitHubUser, LanguageStats } from '../types/github';

export function generateUserProfileMarkdown(user: GitHubUser): string {
  const social = [
    user.twitter_username && `[Twitter](https://twitter.com/${user.twitter_username})`,
    user.blog && `[Website](${user.blog})`,
    user.email && `[Email](mailto:${user.email})`
  ].filter(Boolean).join(' | ');

  return `## ${user.name}
${user.bio || ''}

${social ? `### Connect with me:\n${social}\n\n` : ''}
![GitHub followers](https://img.shields.io/github/followers/${user.login}?style=social)
`;
}

export function generateRepositoryMarkdown(repo: Repository): string {
  return `### [${repo.name}](${repo.html_url})
${repo.description || ''}

${repo.language ? `\`${repo.language}\`` : ''} ${
  repo.stargazers_count > 0 ? `⭐ ${repo.stargazers_count}` : ''
} ${repo.forks_count > 0 ? `🔄 ${repo.forks_count}` : ''}
`;
}

export function generateLanguageStatsMarkdown(stats: LanguageStats[]): string {
  return `### Top Languages
${stats.slice(0, 5).map(stat => 
  `- ${stat.language}: ${stat.percentage.toFixed(1)}%`
).join('\n')}
`;
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}