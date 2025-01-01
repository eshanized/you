import { GitHubUser } from '../../types/github';

export function generateGitHubStats(user: GitHubUser): string {
  return `### GitHub Stats

[![GitHub stats](https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=tokyonight)](https://github.com/${user.login})

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=tokyonight)](https://github.com/${user.login})`;
}