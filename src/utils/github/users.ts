import { GitHubUser } from '../../types/github';
import { fetchFromGitHub } from './api';

export async function fetchUserData(username: string) {
  const response = await fetchFromGitHub<GitHubUser>(`/users/${username}`);
  if (response.error) throw new Error(response.error.message);
  return response.data!;
}