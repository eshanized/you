import { Repository } from '../../types/github';
import { fetchFromGitHub } from './api';

export async function fetchRepositories(username: string) {
  const response = await fetchFromGitHub<Repository[]>(
    `/users/${username}/repos?sort=updated&per_page=100&type=owner`
  );
  if (response.error) throw new Error(response.error.message);
  return response.data!;
}

export async function fetchContributedRepositories(username: string) {
  const response = await fetchFromGitHub<Repository[]>(
    `/users/${username}/subscriptions?per_page=100`
  );
  if (response.error) throw new Error(response.error.message);
  return response.data!;
}

export async function fetchCommits(username: string, repo: string) {
  const response = await fetchFromGitHub<Repository[]>(
    `/repos/${username}/${repo}/commits?per_page=100`
  );
  if (response.error) return [];
  return response.data!;
}