import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchBar } from './components/SearchBar';
import { RateLimitInfo } from './components/RateLimitInfo';
import { UserProfile } from './components/UserProfile';
import { StatsContainer } from './components/stats/StatsContainer';
import { Achievements } from './components/features/Achievements';
import { RepositoryList } from './components/repository/RepositoryList';
import { ComparisonSection } from './components/comparison/ComparisonSection';
import { 
  fetchUserData, 
  fetchRepositories, 
  fetchContributions, 
  fetchCommits,
  fetchContributedRepositories,
  fetchRateLimit
} from './utils/githubApi';
import { GitHubUser, Repository, ContributionDay, Commit } from './types/github';

interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export function App() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [contributedRepositories, setContributedRepositories] = useState<Repository[]>([]);
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);

  const fetchGitHubData = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [user, repos, contributedRepos, contributions, rateLimitData] = await Promise.all([
        fetchUserData(username),
        fetchRepositories(username),
        fetchContributedRepositories(username),
        fetchContributions(username),
        fetchRateLimit()
      ]);

      const recentCommits = await Promise.all(
        repos.slice(0, 5).map(repo => fetchCommits(username, repo.name))
      );

      setUserData(user);
      setRepositories(repos);
      setContributedRepositories(contributedRepos);
      setContributionData(contributions);
      setCommits(recentCommits.flat());
      setRateLimit(rateLimitData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-12">
          <div className="w-full flex flex-col items-center space-y-8">
            <SearchBar onSearch={fetchGitHubData} isLoading={isLoading} />
            {rateLimit && <RateLimitInfo {...rateLimit} />}
            
            {error && (
              <div className="glass-card p-4 text-red-400 w-full max-w-2xl">
                {error}
              </div>
            )}

            {userData && (
              <div className="flex flex-col items-center space-y-8 w-full">
                <UserProfile user={userData} />
                <Achievements 
                  repositories={repositories}
                  followers={userData.followers}
                />
                <StatsContainer 
                  repositories={repositories}
                  contributedRepositories={contributedRepositories}
                  contributionData={contributionData}
                  commits={commits}
                />
                <RepositoryList repositories={repositories} />
              </div>
            )}
          </div>

          <ComparisonSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}