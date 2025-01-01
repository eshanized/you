import { GitHubResponse } from './types';

const BASE_URL = 'https://api.github.com';

export async function fetchFromGitHub<T>(endpoint: string): Promise<GitHubResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Profile-Viewer'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { error };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { 
      error: { 
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      }
    };
  }
}