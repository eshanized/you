import { GitHubUser } from '../../types/github';

export function generateProfileBadges(user: GitHubUser): string {
  const badges = [
    `![GitHub followers](https://img.shields.io/github/followers/${user.login}?style=for-the-badge&logo=github)`,
    `![GitHub User's stars](https://img.shields.io/github/stars/${user.login}?style=for-the-badge&logo=github)`,
    `![GitHub repos](https://img.shields.io/badge/Repos-${user.public_repos}-blue?style=for-the-badge&logo=github)`
  ];

  return badges.join(' ');
}