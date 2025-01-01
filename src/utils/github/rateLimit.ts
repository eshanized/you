import { fetchFromGitHub } from './api';

interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

interface RateLimitResponse {
  resources: {
    core: RateLimit;
  };
  rate: RateLimit;
}

export async function fetchRateLimit() {
  const response = await fetchFromGitHub<RateLimitResponse>('/rate_limit');
  if (response.error) throw new Error(response.error.message);
  return response.data!.rate;
}