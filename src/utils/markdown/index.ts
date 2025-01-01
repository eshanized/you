import { GitHubUser, Repository, LanguageStats } from '../../types/github';
import { generateProfileBadges } from './badges';
import { generateSocialSection } from './social';
import { generateGitHubStats } from './stats';

export function generateUserProfileMarkdown(user: GitHubUser): string {
  const sections = [
    `# ${user.name || user.login}`,
    user.bio,
    generateProfileBadges(user),
    generateSocialSection(user),
    generateGitHubStats(user)
  ].filter(Boolean);

  return sections.join('\n\n');
}

export function generateRepositoryMarkdown(repo: Repository): string {
  const badges = [
    repo.language && `![${repo.language}](https://img.shields.io/badge/${encodeURIComponent(repo.language)}-featured-blue?style=for-the-badge)`,
    `![Stars](https://img.shields.io/github/stars/${repo.full_name}?style=for-the-badge)`,
    `![Forks](https://img.shields.io/github/forks/${repo.full_name}?style=for-the-badge)`
  ].filter(Boolean);

  return `## [${repo.name}](${repo.html_url})
${repo.description || ''}

${badges.join(' ')}`;
}

export function generateLanguageStatsMarkdown(stats: LanguageStats[]): string {
  const languageSection = stats.slice(0, 5).map(stat => 
    `- ![${stat.language}](https://img.shields.io/badge/${encodeURIComponent(stat.language)}-${stat.percentage.toFixed(1)}%25-${stat.color.replace('#', '')}?style=flat-square&logo=${encodeURIComponent(stat.language)})`
  ).join('\n');

  return `### Programming Languages\n\n${languageSection}`;
}

export { copyToClipboard } from '../clipboard';