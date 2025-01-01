import React from 'react';
import { Repository } from '../../types/github';
import { RepositoryDetails } from './RepositoryDetails';
import { CopyMarkdownButton } from '../CopyMarkdownButton';
import { generateRepositoryMarkdown } from '../../utils/markdown';

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="glass-card p-6 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 rounded-lg border border-slate-700/50">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Repository Name and Copy Button */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-indigo-500 hover:text-indigo-400 transition-colors flex-1"
          >
            {repository.name}
          </a>

          <CopyMarkdownButton getMarkdown={() => generateRepositoryMarkdown(repository)} />
        </div>

        {/* Repository Description */}
        {repository.description && (
          <p className="mt-4 text-slate-300 text-sm md:text-base">{repository.description}</p>
        )}
      </div>

      {/* Repository Details */}
      <RepositoryDetails repository={repository} />

      {/* Spacing and Visual Appeal */}
      <div className="mt-4 border-t border-slate-700/30 pt-4"></div>
    </div>
  );
}
