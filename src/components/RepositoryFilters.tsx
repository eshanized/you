import React from 'react';
import { Filter } from 'lucide-react';

interface RepositoryFiltersProps {
  onSortChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  languages: string[];
}

export function RepositoryFilters({ onSortChange, onLanguageChange, languages }: RepositoryFiltersProps) {
  return (
    <div className="glass-card p-4 mb-6 flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Filter size={18} />
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="glass-input py-1"
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Most Stars</option>
          <option value="forks">Most Forks</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <select
          onChange={(e) => onLanguageChange(e.target.value)}
          className="glass-input py-1"
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
    </div>
  );
}