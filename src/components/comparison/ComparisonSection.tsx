import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { ComparisonSearch } from './ComparisonSearch';
import { ComparisonCard } from './ComparisonCard';
import { GitHubUser, Repository } from '../../types/github';
import { fetchUserData, fetchRepositories } from '../../utils/githubApi';

export function ComparisonSection() {
  const [users, setUsers] = useState<Array<{ user: GitHubUser; repos: Repository[] }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [user, repos] = await Promise.all([
        fetchUserData(username),
        fetchRepositories(username)
      ]);
      setUsers(prev => [...prev.slice(0, 1), { user, repos }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="flex items-center gap-2">
        <Users className="text-indigo-400" />
        <h2 className="text-xl font-semibold">Compare Users</h2>
      </div>

      <ComparisonSearch 
        onSearch={handleAddUser}
        isLoading={isLoading}
        disabled={users.length >= 2}
      />

      {error && (
        <div className="glass-card p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(({ user, repos }) => (
          <ComparisonCard
            key={user.login}
            user={user}
            repositories={repos}
            onRemove={() => setUsers(prev => prev.filter(u => u.user.login !== user.login))}
          />
        ))}
        {users.length === 0 && (
          <div className="glass-card p-8 text-center col-span-2">
            <p className="text-slate-400">Add GitHub users to compare their profiles</p>
          </div>
        )}
      </div>
    </div>
  );
}