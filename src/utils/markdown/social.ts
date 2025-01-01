import { GitHubUser } from '../../types/github';

export function generateSocialSection(user: GitHubUser): string {
  const socialLinks = [
    user.twitter_username && `[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/${user.twitter_username})`,
    user.blog && `[![Website](https://img.shields.io/badge/Website-4A4A4A?style=for-the-badge&logo=About.me&logoColor=white)](${user.blog})`,
    user.email && `[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${user.email})`
  ].filter(Boolean);

  return socialLinks.length ? `### Connect with me\n\n${socialLinks.join(' ')}` : '';
}