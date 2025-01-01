import { GitHubUser, Repository, ContributionDay, Commit } from '../../types/github';

export interface GitHubError {
  message: string;
  documentation_url?: string;
}

export interface GitHubResponse<T> {
  data?: T;
  error?: GitHubError;
}