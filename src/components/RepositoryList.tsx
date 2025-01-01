import React from 'react';
import { Repository } from '../types/github';
import { Star, GitFork, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface RepositoryListProps {
  repositories: Repository[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-4">Recent Repositories</h2>
      <div className="space-y-4">
        {repositories.map((repo) => (
          <div key={repo.id} className="glass-card p-6 hover:scale-[1.02] transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-400 hover:text-blue-300"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="mt-2 text-white/70">{repo.description}</p>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              {repo.language && (
                <span className="glass px-3 py-1 rounded-full text-sm text-white/80">
                  {repo.language}
                </span>
              )}
              <span className="glass px-3 py-1 rounded-full text-sm text-white/80 flex items-center">
                <Star size={14} className="mr-1" />
                {repo.stargazers_count}
              </span>
              <span className="glass px-3 py-1 rounded-full text-sm text-white/80 flex items-center">
                <GitFork size={14} className="mr-1" />
                {repo.forks_count}
              </span>
              <span className="glass px-3 py-1 rounded-full text-sm text-white/80 flex items-center">
                <Clock size={14} className="mr-1" />
                {format(new Date(repo.updated_at), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}