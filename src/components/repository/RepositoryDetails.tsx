import React from 'react';
import { Calendar, GitFork, Star, Eye, Scale, Lock, Unlock, FileCode } from 'lucide-react';
import { Repository } from '../../types/github';
import { format } from 'date-fns';

interface RepositoryDetailsProps {
  repository: Repository;
}

export function RepositoryDetails({ repository }: RepositoryDetailsProps) {
  const stats = [
    {
      icon: <Star className="text-yellow-400" size={20} />,
      label: 'Stars',
      value: repository.stargazers_count
    },
    {
      icon: <GitFork className="text-green-400" size={20} />,
      label: 'Forks',
      value: repository.forks_count
    },
    {
      icon: <Eye className="text-blue-400" size={20} />,
      label: 'Watchers',
      value: repository.watchers_count
    },
    {
      icon: <Scale className="text-purple-400" size={20} />,
      label: 'Size',
      value: `${(repository.size / 1024).toFixed(1)} MB`
    }
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon, label, value }) => (
          <div
            key={label}
            className="glass p-4 rounded-lg flex items-center gap-3 hover:scale-105 transition-all duration-300"
          >
            <div className="p-2 rounded-full bg-slate-700/50">{icon}</div>
            <div>
              <div className="text-sm text-slate-400">{label}</div>
              <div className="font-semibold text-slate-100">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Metadata Section */}
      <div className="flex flex-wrap gap-4">
        {/* Privacy Status */}
        <div
          className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2.5 hover:bg-slate-700/50 transition-colors duration-300"
        >
          {repository.private ? (
            <Lock size={16} className="text-red-400" />
          ) : (
            <Unlock size={16} className="text-green-400" />
          )}
          <span className="text-slate-300">
            {repository.private ? 'Private' : 'Public'}
          </span>
        </div>

        {/* Programming Language */}
        {repository.language && (
          <div
            className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2.5 hover:bg-slate-700/50 transition-colors duration-300"
          >
            <FileCode size={16} className="text-indigo-400" />
            <span className="text-slate-300">{repository.language}</span>
          </div>
        )}

        {/* Last Updated */}
        <div
          className="glass px-4 py-2 rounded-full text-sm flex items-center gap-2.5 hover:bg-slate-700/50 transition-colors duration-300"
        >
          <Calendar size={16} className="text-purple-400" />
          <span className="text-slate-300">
            Updated {format(new Date(repository.updated_at), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
    </div>
  );
}
