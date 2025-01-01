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
    <div className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {repository.name}
            </a>
            <CopyMarkdownButton getMarkdown={() => generateRepositoryMarkdown(repository)} />
          </div>
          {repository.description && (
            <p className="mt-2 text-slate-300 text-sm">{repository.description}</p>
          )}
        </div>
      </div>
      
      <RepositoryDetails repository={repository} />
    </div>
  );
}