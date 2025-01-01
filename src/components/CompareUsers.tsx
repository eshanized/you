import React, { useState } from 'react';
import { UserStats } from './UserStats';
import { GitHubUser, Repository } from '../types/github';
import { fetchUserData, fetchRepositories } from '../utils/githubApi';
import { UsersIcon } from 'lucide-react';

export function CompareUsers() {
  const [users, setUsers] = useState<Array<{ user: GitHubUser; repos: Repository[] }>>([]);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      const user = await fetchUserData(username);
      const repos = await fetchRepositories(username);
      setUsers(prev => [...prev, { user, repos }]);
      setUsername('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 w-full max-w-2xl">
      <div className="flex items-center mb-6">
        <UsersIcon className="mr-2" />
        <h2 className="text-xl font-semibold">Compare Users</h2>
      </div>

      <form onSubmit={addUser} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="glass-input flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="glass px-4 py-2 rounded-lg hover:bg-white/20 disabled:opacity-50"
          >
            Add User
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map(({ user, repos }) => (
          <UserStats key={user.login} user={user} repositories={repos} />
        ))}
      </div>
    </div>
  );
}