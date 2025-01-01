import React, { useState, useMemo } from 'react';
import { Repository } from '../../types/github';
import { RepositoryCard } from './RepositoryCard';
import { RepositoryFilters } from './RepositoryFilters';
import { Book } from 'lucide-react';

interface RepositoryListProps {
  repositories: Repository[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  const [sortBy, setSortBy] = useState('updated');
  const [language, setLanguage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const languages = useMemo(() => {
    const langs = new Set(repositories.map(repo => repo.language).filter(Boolean));
    return Array.from(langs).sort();
  }, [repositories]);

  const filteredAndSortedRepos = useMemo(() => {
    return repositories
      .filter(repo => {
        const matchesLanguage = !language || repo.language === language;
        const matchesSearch = !searchTerm || 
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesLanguage && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'stars':
            return b.stargazers_count - a.stargazers_count;
          case 'forks':
            return b.forks_count - a.forks_count;
          case 'size':
            return b.size - a.size;
          default:
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
      });
  }, [repositories, sortBy, language, searchTerm]);

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="flex items-center gap-2">
        <Book className="text-indigo-400" />
        <h2 className="text-xl font-semibold">Repositories</h2>
        <span className="glass px-2 py-0.5 rounded-full text-sm text-slate-400">
          {filteredAndSortedRepos.length}
        </span>
      </div>

      <RepositoryFilters
        onSortChange={setSortBy}
        onLanguageChange={setLanguage}
        onSearchChange={setSearchTerm}
        languages={languages}
        searchTerm={searchTerm}
      />

      <div className="space-y-4">
        {filteredAndSortedRepos.length > 0 ? (
          filteredAndSortedRepos.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))
        ) : (
          <div className="glass-card p-8 text-center">
            <p className="text-slate-400">
              No repositories found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
