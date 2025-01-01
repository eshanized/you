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
      icon: <Star className="text-yellow-400" size={16} />,
      label: 'Stars',
      value: repository.stargazers_count
    },
    {
      icon: <GitFork className="text-green-400" size={16} />,
      label: 'Forks',
      value: repository.forks_count
    },
    {
      icon: <Eye className="text-blue-400" size={16} />,
      label: 'Watchers',
      value: repository.watchers_count
    },
    {
      icon: <Scale className="text-purple-400" size={16} />,
      label: 'Size',
      value: `${(repository.size / 1024).toFixed(1)} MB`
    }
  ];

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon, label, value }) => (
          <div key={label} className="glass p-3 rounded-lg flex items-center gap-2">
            {icon}
            <div>
              <div className="text-sm text-slate-400">{label}</div>
              <div className="font-medium">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="glass px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5">
          {repository.private ? (
            <Lock size={14} className="text-red-400" />
          ) : (
            <Unlock size={14} className="text-green-400" />
          )}
          <span className="text-slate-300">
            {repository.private ? 'Private' : 'Public'}
          </span>
        </div>

        {repository.language && (
          <div className="glass px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5">
            <FileCode size={14} className="text-indigo-400" />
            <span className="text-slate-300">{repository.language}</span>
          </div>
        )}

        <div className="glass px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5">
          <Calendar size={14} className="text-purple-400" />
          <span className="text-slate-300">
            Updated {format(new Date(repository.updated_at), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
    </div>
  );
}